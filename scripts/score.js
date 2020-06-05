let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
        checkIfReloadedAfterGameEnd();
        clearInterval(stateCheck);
    }
}, 100);

function checkIfReloadedAfterGameEnd() {
    const result = localStorage.getItem('score');
    if (result !== 'null') {
        document.getElementById('gameOver').innerHTML = '<h2>GAME OVER!</h2>' +
            '<h4>Your result: ' + result + '</h4>';
        localStorage.setItem('score', null);
    }
}