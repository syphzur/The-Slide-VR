//Sets collision event on entity having this component
AFRAME.registerComponent("collision-detector", {
    init: function () {
        const player = this.el;
        // Start adding points depending on time played
        startScoreIncrement();
        player.addEventListener('collide', handleCollision);
    }
})

// On collision detected
let lastObstacleId = '';
function handleCollision(collision) {
    // Get body of element with which we have collided
    const elem = collision.detail.body;
    console.log("colided with: ", elem);

    // Collided with bonus
    if (elem.el.className === 'bonus') {
        playBonusSound();
        removeElementAndUpdateScore(elem.el);
    }
    // Collided with obstacle
    if (elem.el.className === "obstacle") {
        playCollisionSound();
        // Workaround that allows player to pass through 
        // obstacles and not lose all health
        if (lastObstacleId !== elem.el.id) {
            removeLive() // Decrease health count
            if (lives < 1) {
                endGame();
            }
            lastObstacleId = elem.el.id;
            // Clear name of last hit obstacle
            setTimeout(() => lastObstacleId = '', 500);
        }
    }
    // Get player collision body
    const playerCollider = document.querySelector("#player-collision").body;
    // Get player body
    const player = document.querySelector("#player").body;
    // Get player pos
    const pos = player.position;
    // Clear collider forces
    clearForces(playerCollider);
    //! THIS SETS COLLIDER POSITION
    //! DESPITE DEBUG WIREFRAME SAYING OTHERWISE
    // Move collider to player position 
    playerCollider.position.set(pos.x, pos.y, pos.z);
}

// Removes element
function removeElementAndUpdateScore(element) {
    // hide or move the element
    // otherwise during deletion game crashes
    element.setAttribute("visible", "false");
    updateScore(scoreUpdateValue.SCORE_BONUS_UPDATE);
}

// Redirect player to end game page
function endGame() {
    localStorage.setItem('score', score); // Save score
    // Workaround for github pages
    let href = location.href.substr(0, location.href.lastIndexOf('/'));
    href += "/index.html"
    // Go to end game page
    location.href = href;
}

//Score handling
let score = 0;
let lives = 3;
const TEXT_VALUE_BEFORE_SCORE = "value: Your score: ";
const TEXT_VALUE_AFTER_SCORE = "; side: front; align: center; color: #941414";
const SCORE_DISTANCE_UPDATE_INTERVAL = 1500;
// Score constants
const scoreUpdateValue = {
    SCORE_BONUS_UPDATE: 250, // Amount of points added per bonus
    SCORE_DISTANCE_UPDATE: 1 // Amount of points added per single update
};

// Remove heart image 
function removeLive() {
    if (lives === 3) {
        document.getElementById('heart3').remove(); // Remove right heart
    }
    else if (lives === 2) {
        document.getElementById('heart2').remove(); // Remove middle heart
    }
    else if (lives === 1) {
        document.getElementById('heart1').remove(); // Remove left heart
    }
    lives--; // Decrement value of lives
}

// Update score depending on how long game is played
function startScoreIncrement() {
    setInterval(() => updateScore(scoreUpdateValue.SCORE_DISTANCE_UPDATE), SCORE_DISTANCE_UPDATE_INTERVAL);
}

// Update score after collision with bonus
function updateScoreAfterBonusCollision() {
    updateScore(scoreUpdateValue.SCORE_BONUS_UPDATE);
}

// Add points to score and update text
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