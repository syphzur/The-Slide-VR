//Sets collision event on player

AFRAME.registerComponent("collision-detector", {
    init: function () {
        const player = this.el;
        startScoreIncrement();
        player.addEventListener('collide', handleCollision);
    }
})

let lastObstacleId = '';
function handleCollision(collision) {
    const elem = collision.detail.body;
    console.log("colided with: ", elem);

    if (elem.el.className === 'bonus') {
        playBonusSound();
        removeElementAndUpdateScore(elem.el);
    }
    if (elem.el.className === "obstacle") {
        playCollisionSound();
        if (lastObstacleId !== elem.el.id) {
            removeLive()
            if (lives < 1) {
                endGame();
            }
            lastObstacleId = elem.el.id;
            setTimeout(() => lastObstacleId = '', 500);
        }
    }
    const playerCollider = document.querySelector("#player-collision").body;
    const player = document.querySelector("#player").body;
    const pos = player.position;
    clearForces(playerCollider);
    //! THIS SETS COLLIDER POSITION
    //! DESPITE DEBUG WIREFRAME SAYING OTHERWISE
    playerCollider.position.set(pos.x, pos.y, pos.z);
}

// Removes element
function removeElementAndUpdateScore(element) {
    // hide or move the element
    // otherwise during deletion game crashes
    element.setAttribute("visible", "false");
    updateScore(scoreUpdateValue.SCORE_BONUS_UPDATE);
}

function endGame() {
    localStorage.setItem('score', score);
    window.location = location.protocol + "//" + location.hostname + ':' + location.port + "/index.html";
}

//Score handling
let score = 0;
let lives = 3;
const TEXT_VALUE_BEFORE_SCORE = "value: Your score: ";
const TEXT_VALUE_AFTER_SCORE = "; side: front; align: center; color: #941414";
const SCORE_DISTANCE_UPDATE_INTERVAL = 1500;

const scoreUpdateValue = {
    SCORE_BONUS_UPDATE: 250,
    SCORE_DISTANCE_UPDATE: 1
};

function removeLive() {
    if (lives === 3) {
        document.getElementById('heart3').remove();
    }
    else if (lives === 2) {
        document.getElementById('heart2').remove();
    }
    else if (lives === 1) {
        document.getElementById('heart1').remove();
    }
    lives--;
}


function startScoreIncrement() {
    setInterval(() => updateScore(scoreUpdateValue.SCORE_DISTANCE_UPDATE), SCORE_DISTANCE_UPDATE_INTERVAL);
}

function updateScoreAfterBonusCollision() {
    updateScore(scoreUpdateValue.SCORE_BONUS_UPDATE);
}

function updateScore(scoreUpdateValue) {
    var scoreElement = document.querySelector("#score");
    score += scoreUpdateValue;
    scoreElement.setAttribute("text", TEXT_VALUE_BEFORE_SCORE + score + TEXT_VALUE_AFTER_SCORE);
}

function playBonusSound() {
    const sound = document.getElementById('bonusSound');
    const volume = localStorage.getItem('volume');
    if (volume != null) {
        sound.volume = volume;
    }
    sound.play();
}

function playCollisionSound() {
    const sound = document.getElementById('collisionSound');
    const volume = localStorage.getItem('volume');
    if (volume != null) {
        sound.volume = volume;
    }
    sound.pause(); 
    sound.currentTime = 0;
    sound.play();
}