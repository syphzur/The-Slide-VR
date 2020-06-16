//component for scaling model 
AFRAME.registerComponent('adjust-model', {
    init: function () {
      this.scale();
      this.el.addEventListener('object3dset', () => this.scale());
    },
    scale: function () {
      const span = 1.5; // change this number to adjust scale
      const mesh = this.el.getObject3D('mesh');

      if (!mesh) return;
      
      const bbox = new THREE.Box3().setFromObject(mesh);

      //normalize scale
      const scale = span / bbox.getSize().length();
      mesh.scale.set(scale, scale, scale);

      //recenter
      const offset = bbox.getCenter().multiplyScalar(scale);
      mesh.position.sub(offset);
      
      //set rotation
      mesh.rotation.set(0, Math.PI / 2, 0); // change y value to adjust model rotation
    }
  });