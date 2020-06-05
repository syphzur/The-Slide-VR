//Sets collision event on player

AFRAME.registerComponent("collision-detector", {
    init: function () {
        const player = this.el;
        startScoreIncrement();
        player.addEventListener('collide', handleCollision);
    }
})

function handleCollision(collision) {
    const elem = collision.detail.body;
    console.log("colided with: ", elem);

    if (elem.el.className === 'bonus') {
        removeElementAndUpdateScore(elem.el);
    }
    if (elem.el.className === "obstacle") {
        endGame();
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
    window.location.replace('/index.html');
}

//Score handling
var score = 0;

const TEXT_VALUE_BEFORE_SCORE = "value: Your score: ";
const TEXT_VALUE_AFTER_SCORE = "; side: front; align: center; color: #941414";
const SCORE_DISTANCE_UPDATE_INTERVAL = 300;

const scoreUpdateValue = {
    SCORE_BONUS_UPDATE: 250,
    SCORE_DISTANCE_UPDATE: 1
};

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