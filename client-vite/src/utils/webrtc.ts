const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ]
};

export class PeerConnection {
  private peerConnection: RTCPeerConnection;
  private remoteId: string;

  constructor(remoteId: string, onTrack: (stream: MediaStream) => void, onIceCandidate: (candidate: RTCIceCandidate) => void) {
    this.remoteId = remoteId;
    this.peerConnection = new RTCPeerConnection(ICE_SERVERS);

    this.peerConnection.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        onTrack(event.streams[0]);
      }
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        onIceCandidate(event.candidate);
      }
    };

    this.peerConnection.onconnectionstatechange = () => {
      console.log(`Connection state with ${remoteId}:`, this.peerConnection.connectionState);
    };
  }

  addStream(stream: MediaStream): void {
    stream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, stream);
    });
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void> {
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(description));
  }

  async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    try {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }

  close(): void {
    this.peerConnection.close();
  }

  getRemoteId(): string {
    return this.remoteId;
  }
}

export const getMediaStream = async (audio: boolean = true, video: boolean = true): Promise<MediaStream> => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: audio ? { echoCancellation: true, noiseSuppression: true } : false,
      video: video ? { width: { ideal: 1280 }, height: { ideal: 720 } } : false
    });
  } catch (error) {
    console.error('Error accessing media devices:', error);
    throw error;
  }
};

export const getScreenShareStream = async (): Promise<MediaStream> => {
  try {
    return await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });
  } catch (error) {
    console.error('Error accessing screen share:', error);
    throw error;
  }
};

