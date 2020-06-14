let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
        checkIfReloadedAfterGameEnd();
        clearInterval(stateCheck);
    }
}, 100);

function checkIfReloadedAfterGameEnd() {
    if (localStorage.getItem('score')) {
        document.getElementById('gameOver').innerHTML = '<h1>GAME OVER!</h1>' +
            '<h2>Your result: ' + localStorage.getItem('score') + '</h2>';
        localStorage.removeItem('score');
        playGameOverSound();
    }
}

function playGameOverSound() {
    const muted = sessionStorage.getItem('muted');
    if (muted != null && muted == true) {
        return;
    }
    const sound = document.getElementById('gameoverSound');
    sound.play();
    console.log('played')
}