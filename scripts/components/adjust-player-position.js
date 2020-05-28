AFRAME.registerComponent("adjust-player-position", {
  tick: function (time, timeDelta) {
    const track1 = document.querySelector("#track1");
    const track2 = document.querySelector("#track2");
    const slidePart1 = document.querySelector("#slidePart1");
    const slidePart2 = document.querySelector("#slidePart1");
    const playerPos = this.el.object3D.position;
    const nextPosOffset = 2;
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
        Array.from(track2.querySelectorAll("a-curve-point")).map(function (point) {
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

    const curvePointsArray = curve.getSpacedPoints(10000);
    let nearestPoint;
    let distance = Number.MAX_SAFE_INTEGER;
    curvePointsArray.forEach((element) => {
      let tmp = calculateXDistance(element, nextPlayerPos);
      if (distance > tmp) {
        distance = tmp;
        nearestPoint = element;
      }
    });
    //console.log(nearestPoint, this.el.object3D.position)
    const nextY = calculateYDistance(nearestPoint, nextPlayerPos);
    const currY = calculateYDistance(nearestPoint, playerPos);
    const step = 0.03;
    //adjusting height
    if (currY > 1.5) {
      playerPos.setY(playerPos.y - 3 * step);
    } else if (currY < 0.3) {
      playerPos.setY(playerPos.y + 3 * step);
    } else if (nextY > 1) {
      playerPos.setY(playerPos.y - step);
    } else if (nextY < 0.5) {
      playerPos.setY(playerPos.y + step);
    }
  },
});

function calculateYDistance(point1, point2) {
  return Math.abs(point2.y - point1.y);
}

function calculateXDistance(point1, point2) {
  return Math.abs(point2.x - point1.x);
}
