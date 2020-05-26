AFRAME.registerComponent("rotation-player-controls", {
    tick: function (time, timeDelta) {
      const rotation = this.el.object3D.rotation;
      const player = document.querySelector("#player");
      player.object3D.rotation.set(rotation.x, rotation.y, rotation.z);
      const pos = player.object3D.position;
      player.object3D.position.set(pos.x , pos.y, rotation.y * 7);
    }
  })