AFRAME.registerComponent("rotation-player-controls", {
    tick: function (time, timeDelta) {
      //this = camera object
      const rot = this.el.object3D.rotation;
      const player = document.querySelector("#player");
      const mesh = player.getObject3D('mesh');
      mesh?.rotation.set(rot.x, rot.y + Math.PI / 2, rot.z); // change y value to adjust model rotation
      const pos = player.body?.position;
      player.body?.position.set(pos.x, pos.y, pos.z + 0.1 * rot.y);

      
    }
  })