AFRAME.registerComponent("wasd-player-controls", {
    init: function() {
      const player = document.querySelector("#player");
      window.addEventListener("keydown", (e) => {
      const posVec = player.body.position;
        switch (e.keyCode) {
          case 38:
              player.body.position.set(posVec.x - 0.05, posVec.y, posVec.z);
              break;
          case 37:
              player.body.position.set(posVec.x, posVec.y, posVec.z + 0.05);
              break;
          case 39:
              player.body.position.set(posVec.x, posVec.y, posVec.z - 0.05);
              break;
          case 40:
              player.body.position.set(posVec.x + 0.05, posVec.y, posVec.z);
              break;
        }
      });
    }
  })
