let pc = new RTCPeerConnection();
let remoteVideo = document.getElementById('remoteVideo');

document.getElementById('share-screen').onclick = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  stream.getTracks().forEach(track => pc.addTrack(track, stream));
};

pc.ontrack = (event) => {
  remoteVideo.srcObject = event.streams[0];
};

document.getElementById('create-offer').onclick = async () => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  document.getElementById('offer').value = JSON.stringify(offer);
};

document.getElementById('create-answer').onclick = async () => {
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  document.getElementById('offer').value = JSON.stringify(answer);
};

document.getElementById('set-remote-desc').onclick = async () => {
  const desc = JSON.parse(document.getElementById('offer').value);
  await pc.setRemoteDescription(new RTCSessionDescription(desc));
};
