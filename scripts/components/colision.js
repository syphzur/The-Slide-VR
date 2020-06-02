//Sets collision event on player
const player = document.getElementById('player-collision');
    player.addEventListener('collide',handleCollision)

function handleCollision(collision){
    const collidedElementId = String(collision.detail.body.el.id);
    const obstaclePrefix = 'obstacle';
    const bonusPrefix = 'bonus';
        console.log('Player has collided. Element id:' + collidedElementId);
        if(collidedElementId.includes(bonusPrefix))
        {
            removeElementAndUpdateScore(collidedElementId);
        }
        if(collidedElementId.includes(obstaclePrefix)){
            endGame();
        }
}

// Removes element
function removeElementAndUpdateScore(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.remove();
        updateScore();
    }
}


//Score handling
var score = 0;
const textValueBeforeScore="value: Your score: ";
const textValueAfterScore="; side: front; align: center; color: #941414";
function updateScore(){
    console.log('Score updated.');
    var scoreElement = document.getElementById("score")
    score++;
    scoreElement.setAttribute("text",textValueBeforeScore + score + textValueAfterScore);
}

function endGame(){
    window.location.pathname = '/index.html'
}