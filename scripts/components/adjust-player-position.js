AFRAME.registerComponent("adjust-player-position", {
  tick: function (time, timeDelta) {
    const track1 = document.querySelector("#track1");
    const track2 = document.querySelector("#track2");
    const pointsArray = Array.from(track1.querySelectorAll("a-curve-point"))
      .map(function (point) {
        return point.object3D.position;
      })
      .concat(
        Array.from(track2.querySelectorAll("a-curve-point")).map(function (
          point
        ) {
          return point.object3D.position;
        })
      );
    if (pointsArray.length != 10) {
      throw new Error("There should be 10 points.");
    }
    const curve = new THREE.CatmullRomCurve3(pointsArray);

    const curvePointsArray = curve.getSpacedPoints(1000);
    let nearestPoint;
    let distance = Number.MAX_SAFE_INTEGER;
    curvePointsArray.forEach((element) => {
      let tmp = calculateXDistance(element, this.el.object3D.position);
      if (distance > tmp) {
        distance = tmp;
        nearestPoint = element;
      }
    });
    console.log(nearestPoint, this.el.object3D.position)
    const y = calculateYDistance(nearestPoint, this.el.object3D.position);
    const pos = this.el.object3D.position;
    if (y > 0.5) {
      pos.setY(pos.y - 0.05);
    } else if (y < 0.2) {
      pos.setY(pos.y + 0.05);
    }
  },
});

function calculateYDistance(point1, point2) {
  return Math.abs(point2.y - point1.y);
}

function calculateXDistance(point1, point2) {
  return Math.abs(point2.x - point1.x);
}
