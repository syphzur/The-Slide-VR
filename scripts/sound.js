function changeVolume() {
    const audio = document.getElementById("audio");
    const newVolumeValue = document.getElementById("volumeRange").value;
    audio.volume = newVolumeValue;
    localStorage.setItem('volume', newVolumeValue);
}

window.onload = () => {
    const audio = document.getElementById("audio");
    const volumeToSet = localStorage.getItem('volume');
    if (volumeToSet != null) {
        audio.volume = volumeToSet;
    }
    else {
        audio.volume = 0.5;
    }
}
