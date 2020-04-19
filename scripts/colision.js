
// Removes element
function removeElement(elementId) {
        var element = document.getElementById(elementId);
        element.remove();
}

//Sets colision event on player
var player = document.getElementById('player');
    player.addEventListener('collide',handleCollision)


function handleCollision(collision){
    var collidedElementId = String(collision.detail.body.el.id);
    const obstaclePrefix = 'obstacle';
        console.log('Player has collided. Element id:' + collidedElementId);
        if(collidedElementId.includes(obstaclePrefix))
        {
            removeElement(collidedElementId);
        }
}