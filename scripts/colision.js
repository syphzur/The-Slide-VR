
//Sets colision event on player
var player = document.getElementById('player');
    player.addEventListener('collide',handleCollision)

function handleCollision(collision){
    var collidedElementId = String(collision.detail.body.el.id);
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
    var element = document.getElementById(elementId);
    element.remove();
    updateScore();
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