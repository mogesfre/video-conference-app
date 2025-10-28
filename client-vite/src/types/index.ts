export interface Participant {
  id: string;
  userName: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isHost: boolean;
  stream?: MediaStream;
}

export interface Message {
  message: string;
  userName: string;
  timestamp: Date;
  participantId: string;
}

export interface MeetingState {
  meetingId: string;
  isHost: boolean;
  participants: Map<string, Participant>;
  localStream: MediaStream | null;
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  screenShareStream: MediaStream | null;
  screenShareParticipantId: string | null;
}

