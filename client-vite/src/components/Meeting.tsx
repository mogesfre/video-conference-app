import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { socketService } from '../utils/socket';
import { PeerConnection, getMediaStream, getScreenShareStream } from '../utils/webrtc';
import type { Participant, Message } from '../types';
import VideoGrid from './VideoGrid';
import Controls from './Controls';
import Chat from './Chat';
import ParticipantsList from './ParticipantsList';

const Meeting: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, isHost } = location.state as { userName: string; isHost: boolean };

  const [socket, setSocket] = useState<any>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenShareStream, setScreenShareStream] = useState<MediaStream | null>(null);
  const [participants, setParticipants] = useState<Map<string, Participant>>(new Map());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [screenShareParticipantId, setScreenShareParticipantId] = useState<string | null>(null);

  const peerConnectionsRef = useRef<Map<string, PeerConnection>>(new Map());
  const screenSharePeerConnectionsRef = useRef<Map<string, PeerConnection>>(new Map());

  // Initialize media and socket
  useEffect(() => {
    const init = async () => {
      try {
        // Get local media stream
        const stream = await getMediaStream(true, true);
        setLocalStream(stream);

        // Connect to socket
        const socketConnection = socketService.connect();
        setSocket(socketConnection);

        // Join meeting
        socketConnection.emit('join-meeting', {
          meetingId,
          userName,
          isHost
        });

        // Setup socket listeners
        setupSocketListeners(socketConnection, stream);
      } catch (error) {
        console.error('Error initializing:', error);
        alert('Failed to access camera/microphone. Please check permissions.');
      }
    };

    init();

    return () => {
      // Cleanup
      const currentLocalStream = localStream;
      const currentScreenShareStream = screenShareStream;
      const currentPeerConnections = peerConnectionsRef.current;
      const currentScreenShareConnections = screenSharePeerConnectionsRef.current;
      
      if (currentLocalStream) {
        currentLocalStream.getTracks().forEach(track => track.stop());
      }
      if (currentScreenShareStream) {
        currentScreenShareStream.getTracks().forEach(track => track.stop());
      }
      currentPeerConnections.forEach(pc => pc.close());
      currentScreenShareConnections.forEach(pc => pc.close());
      socketService.disconnect();
    };
  }, [meetingId, userName, isHost]);

  const setupSocketListeners = (socketConnection: any, stream: MediaStream) => {
    // Participant joined
    socketConnection.on('participant-joined', async ({ participantId, userName: newUserName, isHost: newUserIsHost }: { participantId: string; userName: string; isHost: boolean }) => {
      console.log('Participant joined:', participantId);
      
      // Add participant to state
      setParticipants(prev => {
        const newParticipants = new Map(prev);
        newParticipants.set(participantId, {
          id: participantId,
          userName: newUserName,
          isMuted: false,
          isVideoOn: true,
          isHost: newUserIsHost
        });
        return newParticipants;
      });

      // Create peer connection and send offer
      const peerConnection = new PeerConnection(
        participantId,
        (remoteStream) => {
          setParticipants(prev => {
            const newParticipants = new Map(prev);
            const participant = newParticipants.get(participantId);
            if (participant) {
              participant.stream = remoteStream;
            }
            return newParticipants;
          });
        },
        (candidate) => {
          socketConnection.emit('ice-candidate', {
            meetingId,
            candidate,
            targetId: participantId
          });
        }
      );

      peerConnection.addStream(stream);
      peerConnectionsRef.current.set(participantId, peerConnection);

      const offer = await peerConnection.createOffer();
      socketConnection.emit('offer', {
        meetingId,
        offer,
        targetId: participantId
      });
    });

    // Receive offer
    socketConnection.on('offer', async ({ offer, from }: { offer: RTCSessionDescriptionInit; from: string }) => {
      console.log('Received offer from:', from);

      const peerConnection = new PeerConnection(
        from,
        (remoteStream) => {
          setParticipants(prev => {
            const newParticipants = new Map(prev);
            const participant = newParticipants.get(from);
            if (participant) {
              participant.stream = remoteStream;
            }
            return newParticipants;
          });
        },
        (candidate) => {
          socketConnection.emit('ice-candidate', {
            meetingId,
            candidate,
            targetId: from
          });
        }
      );

      peerConnection.addStream(stream);
      peerConnectionsRef.current.set(from, peerConnection);

      const answer = await peerConnection.createAnswer(offer);
      socketConnection.emit('answer', {
        meetingId,
        answer,
        targetId: from
      });
    });

    // Receive answer
    socketConnection.on('answer', async ({ answer, from }: { answer: RTCSessionDescriptionInit; from: string }) => {
      console.log('Received answer from:', from);
      const peerConnection = peerConnectionsRef.current.get(from);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(answer);
      }
    });

    // Receive ICE candidate
    socketConnection.on('ice-candidate', async ({ candidate, from }: { candidate: RTCIceCandidateInit; from: string }) => {
      const peerConnection = peerConnectionsRef.current.get(from);
      if (peerConnection) {
        await peerConnection.addIceCandidate(candidate);
      }
    });

    // Participant left
    socketConnection.on('participant-left', ({ participantId }: { participantId: string }) => {
      console.log('Participant left:', participantId);
      setParticipants(prev => {
        const newParticipants = new Map(prev);
        newParticipants.delete(participantId);
        return newParticipants;
      });

      const peerConnection = peerConnectionsRef.current.get(participantId);
      if (peerConnection) {
        peerConnection.close();
        peerConnectionsRef.current.delete(participantId);
      }
    });

    // Media control events
    socketConnection.on('participant-mute-changed', ({ participantId, isMuted }: { participantId: string; isMuted: boolean }) => {
      setParticipants(prev => {
        const newParticipants = new Map(prev);
        const participant = newParticipants.get(participantId);
        if (participant) {
          participant.isMuted = isMuted;
        }
        return newParticipants;
      });
    });

    socketConnection.on('participant-video-changed', ({ participantId, isVideoOn }: { participantId: string; isVideoOn: boolean }) => {
      setParticipants(prev => {
        const newParticipants = new Map(prev);
        const participant = newParticipants.get(participantId);
        if (participant) {
          participant.isVideoOn = isVideoOn;
        }
        return newParticipants;
      });
    });

    // Screen sharing events
    socketConnection.on('screen-share-started', ({ participantId }: { participantId: string }) => {
      setScreenShareParticipantId(participantId);
    });

    socketConnection.on('screen-share-stopped', () => {
      setScreenShareParticipantId(null);
    });

    // Chat events
    socketConnection.on('message-received', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    // Mute all
    socketConnection.on('mute-all-requested', () => {
      handleToggleMute(true);
    });
  };

  const handleToggleMute = useCallback((forceMute?: boolean) => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        const newMutedState = forceMute !== undefined ? forceMute : !isMuted;
        audioTrack.enabled = !newMutedState;
        setIsMuted(newMutedState);
        socket?.emit('toggle-mute', { meetingId, isMuted: newMutedState });
      }
    }
  }, [localStream, isMuted, socket, meetingId]);

  const handleToggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        const newVideoState = !isVideoOn;
        videoTrack.enabled = newVideoState;
        setIsVideoOn(newVideoState);
        socket?.emit('toggle-video', { meetingId, isVideoOn: newVideoState });
      }
    }
  }, [localStream, isVideoOn, socket, meetingId]);

  const handleToggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      // Stop screen sharing
      if (screenShareStream) {
        screenShareStream.getTracks().forEach(track => track.stop());
        setScreenShareStream(null);
        setIsScreenSharing(false);
        setScreenShareParticipantId(null);
        socket?.emit('stop-screen-share', { meetingId });
      }
    } else {
      // Start screen sharing
      try {
        const stream = await getScreenShareStream();
        setScreenShareStream(stream);
        setIsScreenSharing(true);
        setScreenShareParticipantId(null);
        socket?.emit('start-screen-share', { meetingId });

        // Handle screen share ending
        stream.getVideoTracks()[0].onended = () => {
          handleToggleScreenShare();
        };
      } catch (error) {
        console.error('Error starting screen share:', error);
      }
    }
  }, [isScreenSharing, screenShareStream, socket, meetingId]);

  const handleSendMessage = useCallback((message: string) => {
    const newMessage: Message = {
      message,
      userName,
      timestamp: new Date(),
      participantId: socket?.id || ''
    };
    setMessages(prev => [...prev, newMessage]);
    socket?.emit('send-message', { meetingId, message, userName });
  }, [socket, meetingId, userName]);

  const handleMuteAll = useCallback(() => {
    socket?.emit('mute-all', { meetingId });
  }, [socket, meetingId]);

  const handleLeaveMeeting = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (!socket || !localStream) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Joining meeting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="flex-1 flex overflow-hidden">
        <VideoGrid
          localStream={localStream}
          participants={participants}
          currentUserName={userName}
          screenShareStream={screenShareStream}
          screenShareParticipantId={screenShareParticipantId}
        />
        {isChatOpen && (
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        )}
        {isParticipantsOpen && (
          <ParticipantsList
            participants={participants}
            currentUserName={userName}
            isHost={isHost}
            onMuteAll={handleMuteAll}
            isOpen={isParticipantsOpen}
            onClose={() => setIsParticipantsOpen(false)}
          />
        )}
      </div>
      <Controls
        isMuted={isMuted}
        isVideoOn={isVideoOn}
        isScreenSharing={isScreenSharing}
        onToggleMute={() => handleToggleMute()}
        onToggleVideo={handleToggleVideo}
        onToggleScreenShare={handleToggleScreenShare}
        onLeaveMeeting={handleLeaveMeeting}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onToggleParticipants={() => setIsParticipantsOpen(!isParticipantsOpen)}
        meetingId={meetingId || ''}
      />
    </div>
  );
};

export default Meeting;

