AFRAME.registerComponent("adjust-player-position", {
  init: function () {
    const player = this.el;
    player.addEventListener('body-loaded', function () {
      player.body.angularDamping = 0;
    })
  },

  tick: function (time, timeDelta) {
    const track1 = document.querySelector("#track1");
    const track2 = document.querySelector("#track2");
    const slidePart1 = document.querySelector("#slidePart1");
    const slidePart2 = document.querySelector("#slidePart1");
    const playerPos = this.el.object3D.position;
    const nextPosOffset = 3;
    const nextPlayerPos = new THREE.Vector3(
      playerPos.x - nextPosOffset,
      playerPos.y,
      playerPos.y
    );
    const pointsArray = Array.from(track1.querySelectorAll("a-curve-point"))
      .map(function (point) {
        const pos = point.object3D.position;
        const offset = slidePart1.object3D.position.x;
        const adjustedPos = new THREE.Vector3(pos.x + offset, pos.y, pos.z);
        return adjustedPos;
      })
      .concat(
        Array.from(track2.querySelectorAll("a-curve-point")).map(function (
          point
        ) {
          const pos = point.object3D.position;
          const offset = Math.abs(-40 - slidePart2.object3D.position.x);
          const adjustedPos = new THREE.Vector3(pos.x + offset, pos.y, pos.z);
          return adjustedPos;
        })
      );
    if (pointsArray.length != 10) {
      throw new Error("There should be 10 points.");
    }
    const curve = new THREE.CatmullRomCurve3(pointsArray);

    const curvePointsArray = curve.getSpacedPoints(10000); // ca. 0.002 between points
    let nearestPoint;
    let distance = Number.MAX_SAFE_INTEGER;
    curvePointsArray.forEach((element) => {
      let tmp = calculateXDistance(element, nextPlayerPos);
      if (distance > tmp) {
        distance = tmp;
        nearestPoint = element;
      }
    });
    const currY = calculateYDistance(nearestPoint, playerPos);
    //adjusting height
    //gravity is turned off so we need to apply impulses in both directions
    if (currY < 0.3) {
      this.el.body.applyImpulse(
        new CANNON.Vec3(0, 0.5, 0),
        new CANNON.Vec3().copy(playerPos)
      );
    } else if (currY > 1.2) {
      this.el.body.applyImpulse(
        new CANNON.Vec3(0, -0.3, 0),
        new CANNON.Vec3().copy(playerPos)
      );
    } else if (currY > 0.6 && currY < 0.7) {
      const velY =
        this.el.body.velocity.y - 0.01 > 0 ? this.el.body.velocity.y - 0.01 : 0;
      this.el.body.velocity.set(0, velY, 0);
    }
  },
});

function calculateYDistance(point1, point2) {
  return Math.abs(point2.y - point1.y);
}

function calculateXDistance(point1, point2) {
  return Math.abs(point2.x - point1.x);
}
