//Script is responsible for showing result and playing sound after end of game.
//Every 0.1 second check if site loading is complete. Remove interval after document is ready.
let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
        showResult();
        clearInterval(stateCheck);
    }
}, 100);
//Function injects html code which will show result and play game over sound.
function showResult() {
    if (localStorage.getItem('score')) {
        document.getElementById('gameOver').innerHTML = '<h1>GAME OVER!</h1>' +
            '<h2>Your result: ' + localStorage.getItem('score') + '</h2>';
        localStorage.removeItem('score');
        playGameOverSound();
    }
}
//Function plays "game over" music if not muted.
function playGameOverSound() {
    const sound = document.getElementById('gameoverSound');
    const volume = localStorage.getItem('volume');
    if (volume != null) {
        sound.volume = volume;
    }
    sound.play();
}