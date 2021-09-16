export const getVideoChatRoomId = callerId => 'videochat' + callerId;

export class PeerConnection {
   _iceConfig = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
   };

   constructor({ isInitiator, stream, currentUser, socket }) {
      this.connection = new RTCPeerConnection(this._iceConfig);
      this.isInitiator = isInitiator || false;
      this.stream = stream;
      this.socket = socket;
      this.currentUser = currentUser;
      this.isConnected = false;
      this.init();
   }
}

export class JoiningPeer extends PeerConnection {
   constructor(params) {
      super(params);
   }

   handleVideoOffer = async offer => {
      await this.connection.setRemoteDescription(
         new RTCSessionDescription(offer)
      );
   };

   createAnswer = async caller => {
      const answer = await this.connection.createAnswer();
      await this.connection.setLocalDescription(answer);

      this.socket.emit('answer-call', { to: caller, answer });
   };
}

export const getUserMediaStream = function getUserMedia() {
   const getUserMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
   ).bind(window.navigator);

   return new Promise((resolve, reject) => {
      getUserMedia(
         { audio: true, video: true },
         stream => {
            // setLocalStream(stream);
            resolve(stream);
         },
         err => reject(err)
      );
   });
};
