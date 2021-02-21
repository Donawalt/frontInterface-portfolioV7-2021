import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//import * as dat from "dat.gui";
import gsap from "gsap";

if (typeof window !== 'undefined') {
  // let gui = new dat.GUI();
  /**
   * Base
   */
  // Canvas
  const canvas = document.querySelector("canvas.webgl");
  let animatable = false;
  // Scene
  const scene = new THREE.Scene();

  // Videos
  const videos = {
    video1: document.createElement("video"),
    video2: document.createElement("video"),
    video3: document.createElement("video"),
  };

  videos.video1.width = 1920;
  videos.video1.height = 1080;
  videos.video1.src = "/textures/video.mp4";
  videos.video1.muted = true;
  videos.video1.loop = true;
  videos.video1.load();
  videos.video1.play();
  videos.video1.muted = false;

  // Video Textures
  const videosTextures = {
    texture1: new THREE.VideoTexture(videos.video1),
    texture2: new THREE.VideoTexture(videos.video2),
    texture3: new THREE.VideoTexture(videos.video3),
  };

  videosTextures.texture1.repeat.y = 3.64;
  videosTextures.texture1.repeat.x = 0.82;
  videosTextures.texture1.rotation = 4.72;

  /**gui.add(videosTextures.texture1.repeat, "y").min(0).step(0.01).max(20);
gui.add(videosTextures.texture1.repeat, "x").min(0).step(0.01).max(20);
videosTextures.texture1.center = new THREE.Vector2(0.5, 0.5);
gui
  .add(videosTextures.texture1, "rotation")
  .min(Math.PI * 0)
  .step(0.01)
  .max(Math.PI * 4);
  **/

  videosTextures.texture1.wrapS = THREE.ClampToEdgeWrapping;
  videosTextures.texture1.wrapT = THREE.RepeatWrapping;

  // Cursor
  const cursor = {
    x: 0,
    y: 0,
  };

  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;

    console.log(cursor.x, cursor.y);
  });

  // Objects
  /**
   * Points
   */
  const points = [];

  /**
   * Models
   */
  const gltfLoader = new GLTFLoader();

  let teles = {
    body: [],
    screen: [],
    parameters: {
      rotation: -0.25,
      distance: 4,
    },
  };

  /**gui.add(teles.parameters, "rotation").min(0).max(360);
gui.add(teles.parameters, "distance").min(0).max(10);
**/
  gltfLoader.load("/models/télé-test6.glb", (gltf) => {
    console.log(gltf);

    let tele1 = gltf.scene;
    teles.body.push(tele1);

    let tele2 = teles.body[0].clone();
    teles.body.push(tele2);

    let tele3 = teles.body[0].clone();
    teles.body.push(tele3);

    console.log(teles);
    teles.body[0].scale.set(1, 1, 1);
    teles.body[1].scale.set(1, 1, 1);
    teles.body[2].scale.set(1, 1, 1);
    teles.body[1].position.z = 0;
    teles.body[0].position.z = -teles.parameters.distance;
    teles.body[0].rotation.y = -(Math.PI * teles.parameters.rotation);
    teles.body[2].position.z = teles.parameters.distance;
    teles.body[2].rotation.y = Math.PI * teles.parameters.rotation;

    teles.body.forEach((mesh, ind) => {
      let point = {
        positions: mesh.position,
        element: document.querySelector(`.option-${ind}`),
      };

      points.push(point);

      point.element.querySelector(".label").addEventListener("click", () => {
        animatable = true;
        console.log("click on label", camera);
        console.log("mesh position Y", points[ind].positions.y);
        console.log("mesh position x", points[ind].positions.x);

        gsap.to(camera.position, {
          x: mesh.position.x - 2,
          y: mesh.position.y + 1,
          z: mesh.position.z,
          duration: 0.5,
          onComplete: () => {
            camera.lookAt(mesh.position);
          },
        });
      });

      var object = mesh.getObjectByName("Screen");
      object.material = new THREE.MeshStandardMaterial();
      object.material.map =
        ind === 1
          ? videosTextures.texture2
          : ind > 1
          ? videosTextures.texture3
          : videosTextures.texture1;
      object.material.lightMapIntensity = 16;
      object.material.emissiveIntensity = 20;
      object.material.needsUpdate = true;
    });
    console.log(points);
    scene.add(teles.body[0], teles.body[1], teles.body[2]);
  });
  /**
   * Lights
   */
  let Lights = [];
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0000ff, 1);
  scene.add(hemisphereLight);

  /* gui.addColor(hemisphereLight, "color");
gui.addColor(hemisphereLight, "groundColor");
gui.add(hemisphereLight, "intensity"); */

  const directionalLight = new THREE.DirectionalLight(0x00fffc, 2);
  scene.add(directionalLight);

  console.log(directionalLight);
  /* gui.addColor(directionalLight, "color").name("Directional Light Color : ");
gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(10)
  .name("Directional Light Intensity : ");
gui
  .add(directionalLight.position, "x")
  .min(0)
  .max(10)
  .name("Directional Light X : ");
gui
  .add(directionalLight.position, "y")
  .min(0)
  .max(10)
  .name("Directional Light Y : ");
gui
  .add(directionalLight.position, "z")
  .min(0)
  .max(10)
  .name("Directional Light Z : "); */

  const directionalLight1 = new THREE.DirectionalLight(0xfffffc, 2);
  scene.add(directionalLight1);

  console.log(directionalLight1);
  /* gui.addColor(directionalLight1, "color").name("Directional Light 1 Color : ");
gui
  .add(directionalLight1, "intensity")
  .min(0)
  .max(10)
  .name("Directional Light 1 Intensity : ");
gui
  .add(directionalLight1.position, "x")
  .min(0)
  .max(10)
  .name("Directional Light 1 X : ");
gui
  .add(directionalLight1.position, "y")
  .min(0)
  .max(10)
  .name("Directional Light 1 Y : ");
gui
  .add(directionalLight1.position, "z")
  .min(0)
  .max(10)
  .name("Directional Light 1 Z : "); */

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: "#111111" })
  );
  floor.rotation.x = -Math.PI * 0.5;
  floor.position.y = 0;
  scene.add(floor);
  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  const camPositions = { x: -8, y: 4, z: 0 };
  camera.position.x = camPositions.x;
  camera.position.y = camPositions.y;
  camera.position.z = camPositions.z;
  camera.rotation.y = Math.PI * -0.5;
  /* gui.add(camera.position, "x").name("camera x").min(-10).max(20);
gui.add(camera.position, "y").name("camera y").min(-10).max(20);
gui.add(camera.position, "z").name("camera z").min(-10).max(20).step(0.0001)
gui.add(camera.rotation, "y").name("camera y rotation").min(-3.14).max(3.14) */
  scene.add(camera);

  // Controls
  //const controls = new OrbitControls(camera, canvas);
  //controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    //controls.update();

    // Go through each point
    console.log(points);
    for (const point of points) {
      console.log(point);
      const screenPosition = point.positions.clone();
      screenPosition.project(camera);
      const translateX = screenPosition.x * sizes.width * 0.5;
      const translateY = -screenPosition.y * sizes.height * 0.5;
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
      console.log("Projection point:", translateX);
    }

    if (animatable === false) {
      // Update camera
      camera.position.x = camPositions.x + cursor.x * 1.5;
      camera.position.y = camPositions.y + -cursor.y * 1.5;
    }
    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
}
