AFRAME.registerComponent("random-curve-point", {
  tick: function() {
      const slidePart = document.querySelector("#slidePart1");
      if (slidePart.object3D.position.x === 40) {
        const randomPoint = document.querySelector("#random-point");
        let y = getRandomFromRange(3, 7);
        let z = getRandomFromRange(-2, 2);
        //object3d.position.set doesnt work
        randomPoint.setAttribute('position', "0 " + y.toString() + " " + z.toString());
      }
  }

});

function getRandomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}
