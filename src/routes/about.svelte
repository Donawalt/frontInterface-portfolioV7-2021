<script>
	import Footer from '../components/Footer.svelte'
	import SplitType from 'split-type'
	import gsap from 'gsap';
	import { ScrollTrigger } from "gsap/ScrollTrigger";


	import { onMount } from 'svelte'
	
	onMount(async()=>{
		gsap.registerPlugin(ScrollTrigger)
		let blockTitle = document.querySelectorAll("h2");
		let blockText = document.querySelectorAll('[data-splitting="lines"]');
		let blockTable = document.querySelector('#awards-table')
		let blockExperience = document.querySelector('.illustration')
		let blockCv = document.querySelectorAll('.experience')
		
		let headeSplit = new SplitType("[data-splitting='header']", {type: "chars"})
		blockTitle.forEach(element => {
			console.log(element)
			element.number =  new SplitType(element.querySelector('.number'), { types: "chars"} )
			element.content = new SplitType(element.querySelector('.content'), { types: "chars"} )
			gsap.set(element.querySelectorAll('span'), {overflow: 'hidden'});
			gsap.set(element.querySelectorAll('.char'), {opacity: 0});
			let tl = gsap.timeline({
				scrollTrigger : {
					trigger: element,
					onEnter: ()=>{
						console.log('trigger')
					}
				}
			});

			tl.fromTo(element.number.chars,{ y: 10 }, {opacity: 1, y:0, duration: 0.3, stagger: 0.05})
			tl.fromTo(element.content.chars,{ y: 10 }, {opacity: 1, y:0, duration: 0.3, stagger: 0.1})
			console.log(element, "after Change");
		});

		blockText.forEach(el => {
			el.select = el;
			el.content = new SplitType(el, { types: "lines, words"} )
			gsap.set(el.content.lines, { overflow: 'hidden' });
			gsap.set(el.content.words, { opacity: 0});
			
			console.log(el, "this.is")
			ScrollTrigger.create({
				trigger: el.select,
				onEnter: ()=>{
					let tl1 = gsap.timeline();
					el.content.lines.forEach((element, index) => {
						tl1.fromTo(element.querySelectorAll('.word'),{y: 20}, {y: 0, opacity: 1, duration: 0.4, delay: (index === 0 ? 0 : -0.25)});
					});
				}
			})
			console.log(el)
		});

		ScrollTrigger.create({
			trigger: blockTable,
			onEnter: () =>{
				let tl = gsap.timeline();

				tl.fromTo(blockTable, {width: 0, opacity: 0}, {width: '100%', duration: 0.6, opacity: 1})
				blockTable.querySelectorAll('li').forEach(element => {
					tl.fromTo(element.querySelectorAll('.table-el'), {opacity:0, y:20}, {opacity: 1, y:0})
				});
			}
		})
		
		gsap.fromTo(blockCv, {opacity: 0, y: -10}, {opacity: 1, y:0, duration: 1, stagger: 0.3, scrollTrigger: "#previously" })
		
		gsap.to(blockExperience.querySelectorAll('.back'),{y: 5, scrollTrigger:{
			trigger: blockExperience,
			scrub: true
		}})
		gsap.to(blockExperience.querySelectorAll('.middle'),{ y: 50, x: -10, scrollTrigger:{
			trigger: blockExperience,
			scrub: true
		}})
		gsap.to(blockExperience.querySelectorAll('.front'), { y: -20, scrollTrigger:{
			trigger: blockExperience,
			scrub: true
		}})
		
		let tlH = gsap.timeline();

		tlH.fromTo('header h1', {opacity: 0}, {opacity: 1, duration: 1})
		document.querySelectorAll('[data-splitting="header"]').forEach(element => {
			tlH.fromTo(element.querySelectorAll('.char'), {opacity:0, y: 10}, {y: 0, opacity: 1, duration: 0.3, stagger: 0.1});
		});
		document.querySelectorAll('header picture').forEach(element => {
			gsap.set(element, {opacity: 0});
			tlH.to(element, {opacity: 1, width: '100%', duration: 1, delay: -1});
		});

		console.log(blockTitle);
		console.log(blockText, 'Show block de text')
	})

</script>
<style lang="scss">
	section{
		display:grid;
		grid-template-columns: repeat(8, 1fr);
		grid-gap: 16px;
		margin-left: 32px;
		margin-right: 32px;
		@media screen and (max-width: 425px){
			margin-left: 16px;
			margin-right: 16px;
		}
		font-weight: 300;
		h1{
			font-family: 'Jost*';
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 97%;

			text-transform: uppercase;

			color: #9B9999;
			@media screen and (max-width: 425px){
				font-size: 12px;
			}
		}
		h2{ 
        display: flex;
        .number{
            display: block;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            padding: 0px;
            margin-right: 8px;
            margin-top: 8px;
			@media screen and (max-width: 425px){
                font-size: 12px;
            }
        }
        .content{
            padding: 0px;
            font-style: normal;
            font-weight: normal;
            font-size: 50px;
            text-transform: uppercase;
			@media screen and (max-width: 425px){
                font-size: 25px;
            }
        }
    } 
	.word{
		opacity: 0;
	}
	header picture{
		opacity: 0;
		width: 0; 
	}
	header, #intro{
			grid-column: 2/8;
			@media screen and (max-width: 768px){
				grid-column: 1/9;
			}
		}
		
		#intro{
			display:grid;
			p{	
				z-index: 100;
			}
		}
		#text, #previously, #awards, #contact{
			grid-column: 1/9;
			margin-bottom: 200px;
			@media screen and (max-width: 425px){
				margin-bottom: 80px;
			}
		}
	}

	//
	header{
		margin-top: 130px;
		&>div{
			display: grid;
		grid-template-rows: auto auto;
		grid-gap: 16px;
		div{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 16px;
			picture{
				height: 100%;
				width: 100%;
				display: flex;
				border-radius: 16px;
				background-color: white;
				overflow: hidden;
				justify-content:center;
				align-items:center;
				img{
					height: 100%;
				}
			}
			@media screen and (max-width: 425px){
				grid-gap: 8px;
				height: 40px;
			}
			p{
			font-family: 'scillaregular';
			font-style: normal;
			font-weight: normal;
			font-size: 120px;
			line-height: 97%;
			/* or 116px */

			text-transform: uppercase;
			font-feature-settings: 'ordn' on, 'swsh' on, 'ornm' on;

			margin:0;
			padding: 0;
			@media screen and (max-width: 768px){
				font-size: 80px;
				margin-top:auto;
				margin-bottom: auto;
			}
			@media screen and (max-width: 425px){
				font-size: 30px;
			}
			span.word span.char {
				display: inline-block;
				color: blue;
			}
		}
		}
		}
		margin-bottom: 400px;
		@media screen and (max-width: 425px){
				margin-top: 70px;
				margin-bottom: 30px;
			}
	}
	#intro{
		p{
			font-family: 'Jost*';
			font-style: normal;
			font-weight: 200;
			font-size: 60px;
			line-height: 87px;
			@media screen and (max-width: 425px){
				font-size: 30px;
    line-height: 100%;
			}
		}
		margin-bottom: 200px;
		@media screen and(max-width: 425px){
		margin-bottom: 60px;
			}
	}
	.illustration{
		position: relative;
		picture{
			position: absolute;
			&:nth-child(1){
				top: 0;
				left: 0;
				transform: translateY(-50%);
			}
			&:nth-child(2){
				top: -25px;
				right: 20px;
			}
			&:nth-child(3){
				bottom: 0;
				left: 40px;
				transform: translateY(80%);
			}
			&:nth-child(4){
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			&:nth-child(5){
				right: 0;
				bottom: 0;
				transform: translateY(50%);
			}
		}
	}
	#text{
		display:grid;
		grid-template-columns: repeat(8, 1fr);
		grid-gap: 16px;
		.content{
			grid-column: 1/5;
		}
		.illustration{
			grid-column: 5/9;
		}
		@media screen and (max-width: 425px){
			display: block;
			position: relative;
			.illustration{
				position: absolute;
				top:0;
				z-index: -1;
				opacity: 0.2;
				height: 100%;
				width: 100%;
			}
		}
	}
	#previously, #awards{
		display:grid;
		grid-template-columns: repeat(8, 1fr);
		h2{
			grid-column: 1/9;
			margin-bottom: 60px;
			@media screen and (max-width: 425px){
				margin-bottom: 0px;
			}
		}
		div{
			grid-column: 2/8;
			display:grid;
			grid-template-columns: repeat(6, 1fr);
			p{
				grid-column: 2/6;
				margin-bottom: 60px;
				@media screen and (max-width: 425px){
				grid-column: 1/7;
				margin-bottom: 30px;
				}
			}
			ul{
				grid-column: 1/7;
				list-style: none;
			}
			@media screen and (max-width: 425px){
				grid-column: 1/9;
			}
		}
	}
	#previously{
		ul{
			display:flex;
			flex-direction: row;
			justify-content: space-around;
			padding: 0px;
			margin: 0px;
			li{
				display:flex;
				flex-direction: column;
				padding: 0px;
				margin: 0px;
				p{
					margin: 0;
					padding: 0;
					text-align:center;
					&:nth-child(2){
						font-weight: 500;
					}
				}
			}
			@media screen and (max-width: 425px){
					flex-direction: column;
					justify-content: initial;
					li{
						margin-bottom: 32px;
						img{
							width: 100%;
						}
					}
			}
		}
	}
	#awards{
		ul{
			border-top: 1px solid white;
			margin: 0; 
			padding: 0;
			li{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			border-bottom: 1px solid white;
			margin: 0; 
			padding: 0;
			padding-top: 16px;
			padding-bottom: 16px;
			padding-left: 32px;
			padding-right: 32px;
			.name{
				text-align: right;
				margin: auto;
				margin-right: 0;
			}
			.award{
				margin: auto;
			}
		}
		}
	}
	#contact{
		display: flex;
		justify-content: center; 
		align-items: center;
		flex-direction: column;

		a{
			font-family: "scilla_narrowregular_italic";
			font-style: italic;
			font-weight: normal;
			font-size: 60px;
			line-height: 72px;
			text-align: center;
			text-decoration-line: underline;
			font-feature-settings: 'salt' on, 'ss01' on;
			@media screen and (max-width: 425px){
				 font-size: 28px;
				 line-height: 100%;
			}
		}
	}

</style>
<svelte:head>
	<title>About</title>
</svelte:head>

<section>
	<header>
		<h1>Who I am ? I am ...</h1>
		<div>
			<div>
				<p data-splitting="header" class="titre-one">Donaël</p>
				<picture class="picture-one"><img src="/about/awards/top.jpg" alt=""/></picture>
			</div>
			<div>
				<picture class="picture-two"><img src="/about/awards/bottom.jpg" alt=""/></picture>
				<p data-splitting="header" class="titre-two">Walter</p>
			</div>
		</div>
	</header>
	<div id="intro" data-intersection="intro">
		<p data-splitting="lines">
			Hi, I’m Donaël,  I am a French Creative Dev, I do Photography and Graphic Design alongside.
		</p>
	</div>
	<div id="text" data-intersection="text">
		<div class="content">
			<p data-splitting="lines">
				I’am curently working at <a href="https://www.bihua.fr/" target="_blank" class='hover-effect'>Studio Bihua</a> in the city of <strong>Lyon, France</strong>, and I’m available in <strong>freelancing</strong> for little projects. On top of that,I am in the last year of my training at <a href="https://www.hetic.net" target="_blank"> Hétic</a> School, in <strong>Paris,France</strong>  where I study Web Development & Web Design. 
			</p>
			<p data-splitting="lines">
				Thanks to my previous training at the <a href='https://iutdijon.u-bourgogne.fr/www/'target="_blank">University Institute of Dijon (DUT MMI)</a>, where I was able to explore several fields in "multimedia". I have the ability to lead a project from A to Z, and to understand and adapt to these various issues in order to provide the most adequate solution.
			</p>
			<p data-splitting="lines">
				I love everything to do with visual design, mobile and web projects as well as branding, typography and animations. In the future I would like to work on more immersive and interactive projects, where the user experience is the key word. 
			</p>
		</div>
		<div class="illustration">
			<picture class="back"><img src="/about/grid/team.png" alt="Photo de l'équipe de STUDIO BIHUA"/></picture>
			<picture class="back"><img src="/about/grid/paris_1.png" alt="Photo de Paris"/></picture>
			<picture class="front"><img src="/about/grid/dijon_1.png" alt="Photo de Dijon"/></picture>
			<picture class="middle"><img src="/about/grid/dijon_2.png" alt="Photo de Dijon"/></picture>
			<picture class="middle"><img src="/about/grid/paris_2.png" alt="Photo de Paris"/></picture>
		</div>
	</div>
	<div id="previously" data-intersection="previously"> 
		<h2><span class='number'>02</span> <span class='content'>Previously</span></h2>
		<div>
			<p data-splitting="lines">
				I’m proud and lucky to have passed through these agencies which taught me a lot and helped me to evolve in relation to my professional project, and the digital world.
			</p>
			<ul>
				<li class="experience">
					<a href="https://www.opsone.net/" target="_blank">
						<picture>
							<img src="/about/opsone_logo.svg" alt="">
						</picture>
					</a>
					<p class="name">OPSONE</p>
					<p class="position">2019 - 2020 / Work-study position</p>
				</li>
				<li class="experience">
					<a href="https://www.vinium.com/" target="_blank">
						<picture>
							<img src="/about/vinium_logo.svg" alt="">
						</picture>
					</a>
					<p class="name">VINIUM LUXURY WEBDESIGN</p>
					<p class="position">2019 / Internship</p>
				</li>
			</ul>
		</div>
	</div>
	<div id="awards" data-intersection="awards">
		<h2><span class='number'>03</span> <span class='content'>Awards and Featured</span></h2>
		<div>
			<p data-splitting="lines">
				Yes for know the list is pretty short ... <br/>
				But maybe if we collaborate I'm sure she won't be there long. <br/>
				Winning prizes is one thing, but working on interesting and useful projects is the main thing. <br/>
			</p>
			<ul class="table" id='awards-table'>
				<li>
					<picture class='price-logo table-el'>
						<img src="/about/awards/cssd.svg" />
					</picture>
					<a class='award table-el' >Special Kudos</a>
					<a class="name table-el" >Fédération Française d'Aérostation</a>
				</li>
				<li>
					<picture class='price-logo table-el'>
						<img src="/about/awards/cssd.svg" />
					</picture>
					<a class='award table-el' >Site of the Day</a>
					<a class="name table-el" >Bihua</a>
				</li>
				<li>
					<picture class='price-logo table-el'>
						<img src="/about/awards/maxibestof.svg" />
					</picture>
					<a class='award table-el' >Inspiration Feed</a>
					<a class="name table-el" >Bihua</a>
				</li>
			</ul>
		</div>
	</div>
	<div id="contact" data-intersection="contact">
		<h2><span class='number'>04</span> <span class='content'>Feel free to contact me</span></h2>
		<a>contact@donaelwalter.com</a>
	</div>
</section>
<Footer/>