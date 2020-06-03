AFRAME.registerComponent("slide-part1-animation", {
  tick: function (time, timeDelta) {
    const position = this.el.object3D.position;
    animateSlidePart(position, "#track1", "#random-point1", true);
  },
});

AFRAME.registerComponent("slide-part2-animation", {
  tick: function (time, timeDelta) {
    const position = this.el.object3D.position;
    animateSlidePart(position, "#track2", "#random-point2", false);
  },
});

function getRandomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

function animateSlidePart(position, trackSelector, randomPointSelector, generateBonus) {
  let newPosX = position.x + 0.1;
  if (position.x > 40) {
    //move track to the beginning
    newPosX = -40;
    //generate new curve point
    const randomPoint = document.querySelector(randomPointSelector);
    let y = getRandomFromRange(3, 7);
    let z = getRandomFromRange(-2, 2);
    //object3d.position.set doesn't work
    randomPoint.setAttribute(
      "position",
      "0 " + y + " " + z
    );
    //generate new obstacle position
    const obstacle1 = document.querySelector(trackSelector + "Obstacle1");
    const obstacle2 = document.querySelector(trackSelector + "Obstacle2");
    const track1 = document.querySelector(trackSelector);
    const offset = position.x;
    const pointsArray = Array.from(track1.querySelectorAll("a-curve-point"))
    .map(function (point) {
      const pos = point.object3D.position;
      const adjustedPos = new THREE.Vector3(pos.x + offset, pos.y, pos.z);
      return adjustedPos;
    });
    const curve = new THREE.CatmullRomCurve3(pointsArray);
    const curvePointsArray = curve.getSpacedPoints(24); //gets 25 points
    const randomPointPos1 = curvePointsArray.randomItem();
    obstacle1.object3D.position.set(randomPointPos1.x - offset, randomPointPos1.y + 1, randomPointPos1.z + getRandomFromRange(-3, 3));
    const randomPointPos2 = curvePointsArray.randomItem();
    const d = Math.abs(randomPointPos2.x - randomPointPos1.x);
    //if obstacles are too close on x axis
    if (d < 1.5) {
      randomPointPos2.setX(randomPointPos2.x + 1.5);
    }
    obstacle2.object3D.position.set(randomPointPos2.x - offset, randomPointPos2.y + 1, randomPointPos2.z + getRandomFromRange(-3, 3));
    if (generateBonus) {
      const bonus = document.querySelector(trackSelector + "Bonus");
      const randomPointPos3 = curvePointsArray.randomItem();
      const d1 = Math.abs(randomPointPos3.x - randomPointPos1.x);
      const d2 = Math.abs(randomPointPos3.x - randomPointPos2.x);
      if (d1 > 1 && d2 > 1) {
        bonus.object3D.position.set(randomPointPos3.x - offset, randomPointPos3.y + 1, randomPointPos3.z + getRandomFromRange(-3, 3));
      }
    }
  }
  position.setX(newPosX);

}

Array.prototype.randomItem = function () {
  return this[Math.floor((Math.random() * this.length))];
}