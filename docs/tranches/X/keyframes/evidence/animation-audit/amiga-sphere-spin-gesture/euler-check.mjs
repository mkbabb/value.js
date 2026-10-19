// Numerical witness of AmigaScene.vue's compose (qGesture(Euler XYZ ox,oy) · qSpin): where does the
// front-facing surface point go when a horizontal drag adds +0.05 rad to oy, at several pitches ox?
import * as THREE from "/Users/mkbabb/Programming/keyframes.js/node_modules/three/build/three.module.js";
const q = (ox, oy) => new THREE.Quaternion().setFromEuler(new THREE.Euler(ox, oy, 0, "XYZ"));
for (const ox of [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI]) {
  const front = new THREE.Vector3(0, 0, 1); // the world point facing the camera
  const body = front.clone().applyQuaternion(q(ox, 0).invert()); // body-frame coords of that surface point
  const moved = body.clone().applyQuaternion(q(ox, 0.05)); // where it goes after +0.05 yaw
  const axis = new THREE.Vector3(0, 1, 0).applyQuaternion(q(ox, 0)); // the yaw axis in world
  console.log(`ox=${(ox * 180 / Math.PI).toFixed(0)}°  front point dx=${(moved.x).toFixed(4)} dy=${(moved.y).toFixed(4)}  yaw axis(world)=(${axis.x.toFixed(2)},${axis.y.toFixed(2)},${axis.z.toFixed(2)})`);
}
