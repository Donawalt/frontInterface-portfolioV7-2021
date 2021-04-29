<script>
	import { onMount, onDestroy} from 'svelte';
	import  { goto } from "@sapper/app"
	import * as THREE from "three"
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
	import gsap from "gsap";
	import SplitType from 'split-type'
	
	let stopAnimation = false;
	let videos ;
	onMount(()=>{
		// let dat = require('dat.gui');
		//const gui = new dat.GUI();
		let canvas = document.querySelector("canvas.webgl");
		let scene = new THREE.Scene();
		let animatable = false;

		videos = {
			video1: document.createElement("video"),
			video2: document.createElement("video"),
			video3: document.createElement("video"),
		}

		let videosTextures = {
			texture1: new THREE.VideoTexture(videos.video1),
			texture2: new THREE.VideoTexture(videos.video2),
			texture3: new THREE.VideoTexture(videos.video3),
  		};

		let cursor = {
			x:0,
			y:0
		}

		let points = [];

		const gltfLoader = new GLTFLoader();

		let teles = {
			body: [],
			screen: [],
			parameters: {
			rotation: -0.25,
			distance: 4,
			},
		};

		let Lights = [];
		const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0000ff, 2);
		const directionalLight = new THREE.DirectionalLight(0x00fffc, 2);
		const directionalLight1 = new THREE.DirectionalLight(0xfffffc, 2);
		const light = new THREE.PointLight( 0xffffff, 2, 100 );
		light.position.set( 1, -3, 0 );
/* 		gui.add(light.position, 'x').min(-50).max(50)
		gui.add(light.position, 'y').min(-50).max(50)
		gui.add(light.position, 'z').min(-50).max(50) */
		gsap.fromTo(light.position, {z: -50}, {z: 50, duration: 4, repeat: -1, yoyo:true});
		const floor = new THREE.Mesh(
			new THREE.PlaneGeometry(20, 20),
			new THREE.MeshStandardMaterial({ color: "#000000", roughness: 0.2, metalness: 0.89 })
		);

		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		const camera = new THREE.PerspectiveCamera(
			75,
			sizes.width / sizes.height,
			0.1,
			100
		);

		const renderer = new THREE.WebGLRenderer({
			canvas: canvas,
		});

		const clock = new THREE.Clock();

		const initScene = ()=> {
			videos.video1.width = 1920;
			videos.video1.height = 1080;
			videos.video1.src = "/textures/video.mp4";
			videos.video1.muted = true;
			videos.video1.loop = true;
			videos.video1.load();
			videos.video1.play();

			videosTextures.texture1.repeat.y = 3.64;
			videosTextures.texture1.repeat.x = 0.82;
			videosTextures.texture1.rotation = 4.72;

			videosTextures.texture1.wrapS = THREE.ClampToEdgeWrapping;
			videosTextures.texture1.wrapT = THREE.RepeatWrapping;

			//
			videos.video2.width = 1920;
			videos.video2.height = 1080;
			videos.video2.src = "/textures/video.mp4";
			videos.video2.muted = true;
			videos.video2.loop = true;
			videos.video2.load();
			videos.video2.play();

			videosTextures.texture2.repeat.y = 3.64;
			videosTextures.texture2.repeat.x = 0.82;
			videosTextures.texture2.rotation = 4.72;

			videosTextures.texture2.wrapS = THREE.ClampToEdgeWrapping;
			videosTextures.texture2.wrapT = THREE.RepeatWrapping;

			//
			videos.video3.width = 1920;
			videos.video3.height = 1080;
			videos.video3.src = "/textures/video.mp4";
			videos.video3.muted = true;
			videos.video3.loop = true;
			videos.video3.load();
			videos.video3.play();

			videosTextures.texture3.repeat.y = 3.64;
			videosTextures.texture3.repeat.x = 0.82;
			videosTextures.texture3.rotation = 4.72;

			videosTextures.texture3.wrapS = THREE.ClampToEdgeWrapping;
			videosTextures.texture3.wrapT = THREE.RepeatWrapping;

			window.addEventListener("mousemove", (event) => {
				cursor.x = event.clientX / sizes.width - 0.5;
				cursor.y = event.clientY / sizes.height - 0.5;

				console.log(cursor.x, cursor.y);
			});

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
						
						let tl = gsap.timeline();
						tl.fromTo('h1', {opacity: 1}, {opacity: 0})
						tl.to(camera.position, {
						x: mesh.position.x - 2,
						y: mesh.position.y + 1,
						z: mesh.position.z,
						duration: 0.8,
						onComplete: () => {
							//camera.lookAt(mesh.position);
						},
						});

						tl.to(canvas, {opacity: 0, duration: 0.5, onComplete: ()=>{
							goto(ind === 0 ? '/development' : (ind === 1 ? '/photography': '/design') )
						}});

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

				scene.add(hemisphereLight);
				scene.add(directionalLight);
				scene.add(directionalLight1);
				scene.add( light );

				floor.rotation.x = -Math.PI * 0.5;
 				floor.position.y = 0;
				scene.add(floor);

				window.addEventListener("resize", () => {
					// Update sizes
					sizes.width = window.innerWidth;
					sizes.height = window.innerHeight;

					// Update camera
					camera.aspect = sizes.width / sizes.height;
					camera.updateProjectionMatrix();

					setTimeout(() => {
						let xValuer = window.innerWidth > 425 ? -8 : -15;
						let camPositions = { x: xValue, y: 4, z: 0 };
						camera.position.x = camPositions.x;
						camera.position.y = camPositions.y;
						camera.position.z = camPositions.z;
						camera.rotation.y = Math.PI * -0.5;
						console.log('alert');
					}, 500);

					// Update renderer
					renderer.setSize(sizes.width, sizes.height);
					renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
				});
				
				let xValue = window.innerWidth > 425 ? -8 : -15;
				let camPositions = { x: xValue, y: 4, z: 0 };
				camera.position.x = camPositions.x;
				camera.position.y = camPositions.y;
				camera.position.z = camPositions.z;
				camera.rotation.y = Math.PI * -0.5;

				scene.add(camera);

				renderer.setSize(sizes.width, sizes.height);
  				renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
				
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
					if(stopAnimation === true){
					}else{
						window.requestAnimationFrame(tick);
					}
				};

				tick();
		}

		initScene();
		initTitle();
	})

	onDestroy(()=>{
		stopAnimation = true;
		if(videos){
			videos.video1.pause();
			console.log(videos);
		}
	})

	function initTitle(){
		let creativeSplit = new SplitType("#creative", {type: "chars"})
		let developperSplit = new SplitType("#developper", {type: "chars"})
		
		gsap.set('#creative', {opacity: 1})
		gsap.set('#developper', {opacity: 1})
		let tl = gsap.timeline()
		tl.fromTo(creativeSplit.chars, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y:0,
            duration: 1,
            stagger: { // wrap advanced options in an object
                each: 0.05, 
                from: "center"
            }
        })

		tl.fromTo(developperSplit.chars, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y:0,
            duration: 1,
			delay: -0.5,
            stagger: { // wrap advanced options in an object
                each: 0.05, 
                from: "center"
            }
        })

		tl.fromTo('#and', {opacity: 0}, {opacity: 1, delay: -0.25})
		tl.fromTo('.layer-gl', {opacity: 0, scale: 1.1}, {opacity: 1, scale: 1, duration: 0.6})
	}
</script>

<style lang="scss">
	

.webgl-wrapper{
	width: 100%;
	height:100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
}
	#creative, #developper, #and{
		opacity: 0;
	}
	#webgl-index-layer{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;		
		width: 100%;
		z-index: 10;
		.option
		{
			position: absolute;
			top: 50%;
			left: 50%;

			.label
				{
					position: absolute;
					top: 30px;
					left: -20px;
					cursor: pointer;
					@media screen and (max-width: 425px){
						transform: scale(0.5);
					}
					opacity: 0.8;
					transition-duration: 300ms;
					&:hover{
						transform: scale(1.1);
					}
				}
				&:hover .label{
						transition-duration: 300ms;
						opacity: 1;
					}

				.text{
					opacity: 0;
					position: absolute;
					top: -80px;
					left: -120px;
					width: 200px;
					padding: 20px;
					border-radius: 4px;
					background: #00000077;
					border: 1px solid #ffffff77;
					color: #ffffff;
					line-height: 1.3em;
					font-family: Helvetica, Arial, sans-serif;
					font-weight: 100;
					font-size: 14px;
					transition-duration: 300ms;
				}

				&:hover .text{
					opacity: 1;
				}
				
		}
	}

	.layer-gl{
		opacity: 0;
	}
	h1{
		margin-top: 12vh;
		color: white;
		text-align: center;
		text-transform: uppercase;
		font-feature-settings: 'ordn' on, 'swsh' on, 'ornm' on;
		span{
			display: block;
			overflow: hidden;
		}
		.line-1{
			font-size: 80px;
		}
		.line-2{
			font-size: 110px;
		}
		.line-3{
			font-size: 35px;
			color: rgba(255, 255, 255, 0.7);
			text-transform:initial;
			font-feature-settings: 'ordn' on;
		}
		@media screen and (max-width: 425px){
			.line-1{
				font-size: 20px;
			}
			.line-2{
				font-size: 30px;
			}
			.line-3{
				font-size: 12px;
			}
		}
	}
	h2{
		text-align: center;
		font-size: 30px;
		margin: 0;
		padding: 0;
	}
	footer{
		position: absolute;
		bottom: 32px;
		color: white;
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		a{
			text-decoration:none;
		}
		ul{
			display: flex;
			list-style: none;
			padding: 0px;
			margin: 0px;
			margin-left: 32px;
			span{
				margin-left: 8px;
				margin-right: 8px;
			}
			li{
				text-decoration: none;
			}
		}
		.contact{
			text-align: right;
			margin-right: 32px;
		}
		@media screen and (max-width: 425px){
			grid-template-rows: auto auto;
			grid-template-columns: initial;
			.contact, ul{
				justify-content:center;
				align-items:center;
				text-align: center;
				margin: 0;
			}
		}
	}
</style>


<svelte:head>
	<title>Portfolio Donaël Walter | Creative Development, Photography, Design</title>
	<meta name="Description" content="Portfolio of Donaël WALTER, Creative Developper, Interactive Designer, Hobbyist Photographer ">
</svelte:head>

<section class='webgl-wrapper  layer-gl'>
	<canvas class="webgl"></canvas>
<section id="webgl-index-layer">
	<div class="option option-0">
		<div class="text"><h2>Development</h2></div>
		<div class="label"><svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
			<path opacity="0.5" d="M24 47.5C36.9787 47.5 47.5 36.9787 47.5 24C47.5 11.0213 36.9787 0.5 24 0.5C11.0213 0.5 0.5 11.0213 0.5 24C0.5 36.9787 11.0213 47.5 24 47.5Z" fill="black" stroke="white" stroke-miterlimit="10"/>
			<path d="M39.6 24C31 23.9 23.9 31 24 39.6V39.2C23.9 30.7 17 23.9 8.5 24H8.6C17.1 23.9 23.9 17 24 8.6V8.5C24 17.1 31 24 39.6 24Z" fill="white"/>
			</svg></div>
	</div>
	<div class="option option-1">
		<div class="text"><h2>Photography</h2></div>
		<div class="label"><svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
			<path opacity="0.5" d="M24 47.5C36.9787 47.5 47.5 36.9787 47.5 24C47.5 11.0213 36.9787 0.5 24 0.5C11.0213 0.5 0.5 11.0213 0.5 24C0.5 36.9787 11.0213 47.5 24 47.5Z" fill="black" stroke="white" stroke-miterlimit="10"/>
			<path d="M39.6 24C31 23.9 23.9 31 24 39.6V39.2C23.9 30.7 17 23.9 8.5 24H8.6C17.1 23.9 23.9 17 24 8.6V8.5C24 17.1 31 24 39.6 24Z" fill="white"/>
			</svg></div>
	</div>
	<div class="option option-2">
		<div class="text"><h2>Design</h2></div>
		<div class="label"><svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
			<path opacity="0.5" d="M24 47.5C36.9787 47.5 47.5 36.9787 47.5 24C47.5 11.0213 36.9787 0.5 24 0.5C11.0213 0.5 0.5 11.0213 0.5 24C0.5 36.9787 11.0213 47.5 24 47.5Z" fill="black" stroke="white" stroke-miterlimit="10"/>
			<path d="M39.6 24C31 23.9 23.9 31 24 39.6V39.2C23.9 30.7 17 23.9 8.5 24H8.6C17.1 23.9 23.9 17 24 8.6V8.5C24 17.1 31 24 39.6 24Z" fill="white"/>
			</svg></div>
	</div>
</section>
</section>	
<h1>
	<span class="line-1" id="creative">Creative</span>
	<span class="line-2" id="developper">Developper</span>
	<span class="line-3" id="and">& Enthusiast Designer</span>
</h1>

<footer>
	<ul>
		<li>
			<a href="https://www.instagram.com/walt_dona/" target="_blank">Instagram</a>
		</li>
		<span>⁕</span>
		<li>
			<a href="https://github.com/Donawalt/" target="_blank">Github</a>
		</li>
		<span>⁕</span>
		<li>
			<a href="https://dribbble.com/donaelwalter" target="_blank">Dribble</a>
		</li>
	</ul>
	<a href="mailto:contact@donaelwalter.com" target="_blank" class="contact">contact@donaelwalter.com</a>
</footer>