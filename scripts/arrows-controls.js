AFRAME.registerComponent("arrows-controls", {
    init: function() {
      window.addEventListener("keydown", (e) => {
        const posVec = this.el.body.position;
        switch (e.keyCode) {
          case 38:
              this.el.body.position.set(posVec.x - 0.05, posVec.y, posVec.z);
              console.log(this.el.body.id);
              break;
          case 37:
              this.el.body.position.set(posVec.x, posVec.y, posVec.z + 0.05);
              console.log(this.el.body.id);
              break;
          case 39:
              this.el.body.position.set(posVec.x, posVec.y, posVec.z - 0.05);
              console.log(this.el.body.id);
              break;
          case 40:
              this.el.body.position.set(posVec.x + 0.05, posVec.y, posVec.z);
              console.log(this.el.body.id);
              break;
        }
      });
    }
  })
