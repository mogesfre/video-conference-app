import React, { useEffect, useRef } from 'react';
import type { Participant } from '../types';

interface VideoGridProps {
  localStream: MediaStream | null;
  participants: Map<string, Participant>;
  currentUserName: string;
  screenShareStream: MediaStream | null;
  screenShareParticipantId: string | null;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  localStream,
  participants,
  currentUserName,
  screenShareStream,
  screenShareParticipantId
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const getGridClass = () => {
    const totalParticipants = participants.size + 1;
    if (screenShareStream) return 'grid-cols-1';
    if (totalParticipants === 1) return 'grid-cols-1';
    if (totalParticipants === 2) return 'grid-cols-2';
    if (totalParticipants <= 4) return 'grid-cols-2';
    if (totalParticipants <= 9) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      {screenShareStream ? (
        <div className="h-full flex flex-col space-y-4">
          {/* Screen Share - Main View */}
          <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative">
            <ScreenShareVideo stream={screenShareStream} />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 px-3 py-2 rounded-lg">
              <span className="text-white text-sm">
                {screenShareParticipantId ? 
                  `${participants.get(screenShareParticipantId)?.userName || 'Unknown'}'s screen` : 
                  'Your screen'}
              </span>
            </div>
          </div>

          {/* Participant Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <VideoTile
              ref={localVideoRef}
              userName={currentUserName}
              isMuted={!localStream?.getAudioTracks()[0]?.enabled}
              isVideoOn={localStream?.getVideoTracks()[0]?.enabled || false}
              isLocal={true}
              isSmall={true}
            />
            {Array.from(participants.values()).map((participant) => (
              <RemoteVideoTile
                key={participant.id}
                participant={participant}
                isSmall={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={`grid ${getGridClass()} gap-4 h-full`}>
          <VideoTile
            ref={localVideoRef}
            userName={currentUserName}
            isMuted={!localStream?.getAudioTracks()[0]?.enabled}
            isVideoOn={localStream?.getVideoTracks()[0]?.enabled || false}
            isLocal={true}
          />
          {Array.from(participants.values()).map((participant) => (
            <RemoteVideoTile key={participant.id} participant={participant} />
          ))}
        </div>
      )}
    </div>
  );
};

interface VideoTileProps {
  userName: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isLocal: boolean;
  isSmall?: boolean;
}

const VideoTile = React.forwardRef<HTMLVideoElement, VideoTileProps>(({
  userName,
  isMuted,
  isVideoOn,
  isLocal,
  isSmall = false
}, ref) => {
  return (
    <div className={`relative bg-gray-800 rounded-lg overflow-hidden ${isSmall ? 'w-32 h-24 flex-shrink-0' : 'aspect-video'}`}>
      <video
        ref={ref}
        autoPlay
        playsInline
        muted={isLocal}
        className={`w-full h-full object-cover ${isVideoOn ? '' : 'hidden'}`}
      />
      {!isVideoOn && (
        <div className="w-full h-full flex items-center justify-center bg-gray-700">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded flex items-center space-x-2">
        <span className={`text-white ${isSmall ? 'text-xs' : 'text-sm'}`}>
          {userName} {isLocal && '(You)'}
        </span>
        {isMuted && (
          <svg className={`${isSmall ? 'w-3 h-3' : 'w-4 h-4'} text-red-500`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </div>
  );
});

interface RemoteVideoTileProps {
  participant: Participant;
  isSmall?: boolean;
}

const RemoteVideoTile: React.FC<RemoteVideoTileProps> = ({ participant, isSmall = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  return (
    <div className={`relative bg-gray-800 rounded-lg overflow-hidden ${isSmall ? 'w-32 h-24 flex-shrink-0' : 'aspect-video'}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full h-full object-cover ${participant.isVideoOn ? '' : 'hidden'}`}
      />
      {!participant.isVideoOn && (
        <div className="w-full h-full flex items-center justify-center bg-gray-700">
          <div className={`${isSmall ? 'w-12 h-12 text-lg' : 'w-16 h-16 text-2xl'} bg-blue-600 rounded-full flex items-center justify-center font-bold text-white`}>
            {participant.userName.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded flex items-center space-x-2">
        <span className={`text-white ${isSmall ? 'text-xs' : 'text-sm'}`}>{participant.userName}</span>
        {participant.isMuted && (
          <svg className={`${isSmall ? 'w-3 h-3' : 'w-4 h-4'} text-red-500`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </div>
  );
};

interface ScreenShareVideoProps {
  stream: MediaStream;
}

const ScreenShareVideo: React.FC<ScreenShareVideoProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-full h-full object-contain"
    />
  );
};

export default VideoGrid;

