//component used for controlling entity with arrows
AFRAME.registerComponent("arrows-controls", {
    init: function() {
      window.addEventListener("keydown", (e) => {
        const posVec = this.el.object3D.position;
        switch (e.keyCode) {
          case 38: //arrow up
              this.el.object3D.position.set(posVec.x - 0.05, posVec.y, posVec.z);
              break;
          case 37: //arrow left
              this.el.object3D.position.set(posVec.x, posVec.y, posVec.z + 0.05);
              break;
          case 39: //arrow right
              this.el.object3D.position.set(posVec.x, posVec.y, posVec.z - 0.05);
              break;
          case 40: //arrow down
              this.el.object3D.position.set(posVec.x + 0.05, posVec.y, posVec.z);
              break;
        }
      });
    }
  })
