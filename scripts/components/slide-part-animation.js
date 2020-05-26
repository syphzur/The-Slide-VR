AFRAME.registerComponent("slide-part1-animation", {
  tick: function (time, timeDelta) {
    const position = this.el.object3D.position;
    let newPosX = position.x + 0.1;
    if (position.x > 40) {
      newPosX = -40;
      const randomPoint = document.querySelector("#random-point1");
      let y = getRandomFromRange(3, 7);
      let z = getRandomFromRange(-2, 2);
      //object3d.position.set doesnt work
      randomPoint.setAttribute(
        "position",
        "0 " + y.toString() + " " + z.toString()
      );
    }
    this.el.object3D.position.setX(newPosX);
  },
});

AFRAME.registerComponent("slide-part2-animation", {
  tick: function (time, timeDelta) {
    const position = this.el.object3D.position;
    let newPosX = position.x + 0.1;
    if (position.x > 40) {
      newPosX = -40;
      const randomPoint = document.querySelector("#random-point2");
      let y = getRandomFromRange(3, 7);
      let z = getRandomFromRange(-2, 2);
      //object3d.position.set doesnt work
      randomPoint.setAttribute(
        "position",
        "0 " + y.toString() + " " + z.toString()
      );
    }
    this.el.object3D.position.setX(newPosX);
  },
});

function getRandomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}
