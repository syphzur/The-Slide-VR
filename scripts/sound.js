$(document).ready(function() {
    let audioVolume = localStorage.getItem("volume");
    
    if(!audioVolume) {
        audioVolume = 0.5;
        localStorage.setItem("volume",  audioVolume);
    }
    
    $("#volumeRange").val(audioVolume);

    const audioEl = document.createElement("AUDIO");
    document.body.appendChild(audioEl);
    audioEl.id = "audio";
    audioEl.src = "audio/mainmenu.mp3"
    audioEl.pause()
    audioEl.setAttribute("muted", "muted")
    document.body.addEventListener("mousemove", function(){
        const promise = audioEl.play();
        promise.then(_ => {
        }).catch(error => {
        })
    })

    

    const audio = document.getElementById("audio");
    const volumeToSet = localStorage.getItem('volume');
    
    if (volumeToSet != null) {
        audio.volume = volumeToSet;
    }
    else {
        audio.volume = 0.5;
    }

})

function changeVolume() {
    const audio = document.getElementById("audio");
    const newVolumeValue = document.getElementById("volumeRange").value;
    audio.volume = newVolumeValue;
    
    localStorage.setItem('volume', newVolumeValue);
}

window.onload = () => {
    
}
