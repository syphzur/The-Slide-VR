AFRAME.registerComponent("game-sound", {
    init: function () {
        const volumeToSet = sessionStorage.getItem('volume');
        const mutedToSet = sessionStorage.getItem('muted');
        let audioGame = new Audio('audio/ingame.mp3');
        audioGame.type = 'audio/mpeg';
        audioGame.autoplay = true;
        audioGame.loop = true;
        if (volumeToSet !== null) {
            audioGame.volume = volumeToSet;
        }
        else {
            audioGame.volume = 0.5;
        }
        if (mutedToSet !== null) {
            audioGame.muted = mutedToSet;
        }
        else {
            audioGame.muted = false;
        }
        audioGame.load();
        audioGame.play();
    }
})