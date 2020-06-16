// On document loaded
$(document).ready(function() {
    // Get saved volume
    let audioVolume = localStorage.getItem("volume");
    // If theres no saved volume
    if(!audioVolume) {
        // Set default
        audioVolume = 0.5;
        // Set value
        localStorage.setItem("volume",  audioVolume);
    }
    // Set slider value
    $("#volumeRange").val(audioVolume);
    // Create HTML audio tag
    const audioEl = document.createElement("AUDIO");
    // Append tag to <body>
    document.body.appendChild(audioEl);
    audioEl.id = "audio";               // Set id
    audioEl.src = "audio/mainmenu.mp3"  // Set src
    audioEl.volume = audioVolume;       // Set volume
    // Pause music for https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
    audioEl.pause() 
    audioEl.setAttribute("muted", "muted") 
    // Add listener for moving mouse and play background music
    document.body.addEventListener("mousemove", function(){
        // Need to use promise
        const promise = audioEl.play();
        promise.then(_ => {
        }).catch(error => {
        })
    })
})

// On slider movement
function changeVolume() {
    // Get audio tag
    const audio = document.getElementById("audio");
    // Change slider volume
    const newVolumeValue = document.getElementById("volumeRange").value;
    audio.volume = newVolumeValue; // Change volume
    // Save volume
    localStorage.setItem('volume', newVolumeValue);
}
