import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const [meetingId, setMeetingId] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const createMeeting = async () => {
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      navigate(`/meeting/${data.meetingId}`, { state: { userName, isHost: true } });
    } catch (error) {
      setError('Failed to create meeting');
    }
  };

  const joinMeeting = () => {
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!meetingId.trim()) {
      setError('Please enter a meeting ID');
      return;
    }
    navigate(`/meeting/${meetingId}`, { state: { userName, isHost: false } });
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="landing-title">VideoConference</h1>
          <p className="landing-subtitle">Connect with anyone, anywhere</p>
        </div>

        <div className="landing-form">
          <div className="form-group">
            <label htmlFor="userName" className="form-label">
              Your Name
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError('');
              }}
              placeholder="Enter your name"
              className="form-input"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            onClick={createMeeting}
            className="btn-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create New Meeting</span>
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="form-group">
            <label htmlFor="meetingId" className="form-label">
              Meeting ID
            </label>
            <input
              id="meetingId"
              type="text"
              value={meetingId}
              onChange={(e) => {
                setMeetingId(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="Enter meeting ID"
              className="form-input"
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          <button
            onClick={joinMeeting}
            className="btn-secondary"
          >
            Join Meeting
          </button>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>Free video conferencing for everyone</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;

