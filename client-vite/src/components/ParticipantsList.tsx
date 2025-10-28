import React from 'react';
import type { Participant } from '../types';

interface ParticipantsListProps {
  participants: Map<string, Participant>;
  currentUserName: string;
  isHost: boolean;
  onMuteAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  currentUserName,
  isHost,
  onMuteAll,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const totalParticipants = participants.size + 1;

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Participants ({totalParticipants})</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {isHost && (
          <button
            onClick={onMuteAll}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-semibold"
          >
            Mute All
          </button>
        )}
      </div>

      {/* Participants List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Current User */}
        <div className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {currentUserName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">{currentUserName} (You)</p>
              {isHost && (
                <span className="text-xs text-blue-400">Host</span>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Remote Participants */}
        {Array.from(participants.values()).map((participant) => (
          <div key={participant.id} className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {participant.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium">{participant.userName}</p>
                {participant.isHost && (
                  <span className="text-xs text-blue-400">Host</span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                participant.isMuted ? 'bg-red-600' : 'bg-gray-600'
              }`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {participant.isMuted ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" fillRule="evenodd" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  )}
                </svg>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                !participant.isVideoOn ? 'bg-red-600' : 'bg-gray-600'
              }`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList;

