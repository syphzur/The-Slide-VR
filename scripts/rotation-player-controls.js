AFRAME.registerComponent("rotation-player-controls", {
    tick: function (time, timeDelta) {
      const rotation = this.el.object3D.rotation;
      const player = document.querySelector("#player");
      const pos = player.body.position;
      player.body.position.set(pos.x , pos.y, rotation.y * 7);
    }
  })