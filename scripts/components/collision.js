//Sets collision event on player
AFRAME.registerComponent("collision-detector", {
    init: function () {
        const player = this.el;
        player.addEventListener('collide', handleCollision);
    }
})

function handleCollision(collision){
    const elem = collision.detail.body;
    console.log("colided with: ", elem);
    
    if(elem.el.className === 'bonus')
    {
        removeElementAndUpdateScore(elem.el);
    }
    if(elem.el.className === "obstacle"){
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
    updateScore();
}


//Score handling
var score = 0;
const textValueBeforeScore="value: Your score: ";
const textValueAfterScore="; side: front; align: center; color: #941414";
function updateScore(){
    console.log('Score updated.');
    var scoreElement = document.querySelector("#score");
    score++;
    scoreElement.setAttribute("text",textValueBeforeScore + score + textValueAfterScore);
}

function endGame(){
    window.location.pathname = '/index.html'
}