function mute() {
    const audio = document.getElementById("audio");
    audio.muted = !audio.muted;
    sessionStorage.setItem('muted', audio.muted)
}
function changeVolume() {
    const audio = document.getElementById("audio");
    const newVolumeValue = document.getElementById("volumeRange").value;
    audio.volume = newVolumeValue;
    sessionStorage.setItem('volume', newVolumeValue);
}

window.onload = () => {
    const audio = document.getElementById("audio");
    const volumeToSet = sessionStorage.getItem('volume');
    const mutedToSet = sessionStorage.getItem('muted');
    if (volumeToSet != null) {
        audio.volume = volumeToSet;
    }
    else {
        audio.volume = 0.5;
    }
    if (mutedToSet != null) {
        audio.muted = mutedToSet;
    }
    else {
        audio.muted = false;
    }
}
