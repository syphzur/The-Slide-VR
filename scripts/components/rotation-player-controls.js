AFRAME.registerComponent("rotation-player-controls", {
  tick: function (time, timeDelta) {
    //this = camera object
    const rot = this.el.object3D.rotation;
    const player = document.querySelector("#player");
    const playerCollider = document.querySelector("#player-collision");
    const mesh = player.getObject3D("mesh");
    // Don't allow player to make full turn
    if (rot.y > 0.4 * Math.PI) {
      rot.y = 0.4 * Math.PI;
    } else if (rot.y < -0.4 * Math.PI) {
      rot.y = -0.4 * Math.PI;
    }
    mesh?.rotation.set(0, rot.y + Math.PI / 2, rot.z); // change y value to adjust model rotation
    const pos = player.body?.position;

    const slidePart1 = document.querySelector("#slidePart1");
    const slidePart2 = document.querySelector("#slidePart2");

    //get current track 
    const track =
      slidePart1.object3D.position.x > slidePart2.object3D.position.x
        ? document.querySelector("#track1")
        : document.querySelector("#track2");

    //get current slide part
    const slide =
      slidePart1.object3D.position.x > slidePart2.object3D.position.x
        ? slidePart1
        : slidePart2;

    //get points from current track     
    const offset = slide.object3D.position.x; // offset from beginning position
    const pointsArray = Array.from(track.querySelectorAll("a-curve-point")).map(
      function (point) {
        const pos = point.object3D.position;
        const adjustedPos = new THREE.Vector3(pos.x + offset, pos.y, pos.z);
        return adjustedPos;
      }
    );

    //create curve based on points from track curve
    const curve = new THREE.CatmullRomCurve3(pointsArray);

    //get less spaced points array
    const curvePointsArray = curve.getSpacedPoints(10000); // ca. 0.002 between points

    //finding nearest point
    let nearestPoint;
    let distance = Number.MAX_SAFE_INTEGER;
    curvePointsArray.forEach((element) => {
      let tmp = calculateXDistance(element, player.body.position);
      if (distance > tmp) {
        distance = tmp;
        nearestPoint = element;
      }
    });

    //compute barrier position based on nearest point
    const leftBarrierPos = {
      x: nearestPoint.x,
      y: nearestPoint.y,
      z: nearestPoint.z - 4,
    };
    const rightBarrierPos = {
      x: nearestPoint.x,
      y: nearestPoint.y,
      z: nearestPoint.z + 4,
    };
    const dFromLeftBarrier = calculateZDistance(leftBarrierPos, pos);
    const dFromRightBarrier = calculateZDistance(rightBarrierPos, pos);

    //if player is far enough let him move
    if (dFromLeftBarrier > 0.2 && dFromRightBarrier > 0.2) {
      player.body?.position.set(pos.x, pos.y, pos.z + 0.1 * rot.y);
    } else { // move player away from barrier
      let step = 0;
      if (dFromLeftBarrier > 0.2 ) {
        step = -Math.abs(rot.y) * 1.5;
      } else if (dFromRightBarrier > 0.2 ) {
        step = Math.abs(rot.y) * 1.5;
      }
      player.body?.position.set(pos.x, pos.y, pos.z + step);
    }
    playerCollider.body?.position?.set(pos.x, pos.y, pos.z);
  },
});

function calculateXDistance(point1, point2) {
  return Math.abs(point2.x - point1.x);
}

function calculateZDistance(point1, point2) {
  return Math.abs(point2.z - point1.z);
}
