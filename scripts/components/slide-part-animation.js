AFRAME.registerComponent("slide-part1-animation", {
  tick: function (time, timeDelta) {
    const position = this.el.object3D.position;
    let newPosX = position.x + 0.1;
    if (position.x > 40) {
      //move track to the beginning
      newPosX = -40;
      //generate new curve point
      const randomPoint = document.querySelector("#random-point1");
      let y = getRandomFromRange(3, 7);
      let z = getRandomFromRange(-2, 2);
      //object3d.position.set doesnt work
      randomPoint.setAttribute(
        "position",
        "0 " + y.toString() + " " + z.toString()
      );
      //generate new obstacle position
      const obstacle1 = document.querySelector("#track1Obstacle1");
      const track1 = document.querySelector("#track1");
      const offset = position.x;
      const pointsArray = Array.from(track1.querySelectorAll("a-curve-point"))
      .map(function (point) {
        const pos = point.object3D.position;
        const adjustedPos = new THREE.Vector3(pos.x + offset, pos.y, pos.z);
        return adjustedPos;
      });
      const curve = new THREE.CatmullRomCurve3(pointsArray);
      const curvePointsArray = curve.getSpacedPoints(24); //gets 25 points
      const randomPointPos = curvePointsArray[Math.floor(Math.random() * curvePointsArray.length)];
      obstacle1.object3D.position.set(randomPointPos.x - offset, randomPointPos.y + 1, randomPointPos.z + getRandomFromRange(-3, 3));
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

