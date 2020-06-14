let audioVolume;
let muted;
function mute() {
    const audio = document.getElementById("audio");
    audio.muted = !audio.muted;
    muted = audio.muted;
}
function changeVolume() {
    const audio = document.getElementById("audio");
    const newVolumeValue = document.getElementById("volumeRange").value;
    audio.volume = newVolumeValue;
    audioVolume = audio.volume;
}