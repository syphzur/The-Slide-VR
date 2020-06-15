AFRAME.registerComponent("game-sound", {
    init: function () {
        const volumeToSet = localStorage.getItem('volume');
        let audioGame = new Audio('audio/ingame.mp3');
        audioGame.load();
        audioGame.type = 'audio/mpeg';
        audioGame.autoplay = true;
        audioGame.loop = true;
        if (volumeToSet !== null) {
            audioGame.volume = volumeToSet;
        }
        else {
            audioGame.volume = 0.5;
        }
        audioGame.play();
    }
})