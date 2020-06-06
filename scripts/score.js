let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
        checkIfReloadedAfterGameEnd();
        clearInterval(stateCheck);
    }
}, 100);

function checkIfReloadedAfterGameEnd() {
    const result = localStorage.getItem('score');
    if (result != 'null') {
        document.getElementById('gameOver').innerHTML = '<h1>GAME OVER!</h1>' +
            '<h2>Your result: ' + result + '</h2>';
        localStorage.setItem('score', null);
    }
}