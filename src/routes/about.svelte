<script>
	import Footer from '../components/Footer.svelte'
</script>
<style lang="scss">
	section{
		display:grid;
		grid-template-columns: repeat(8, 1fr);
		grid-gap: 16px;
		margin-left: 32px;
		margin-right: 32px;
		font-weight: 300;
		h1{
			font-family: 'Jost*';
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 97%;

			text-transform: uppercase;

			color: #9B9999;
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
        }
        .content{
            padding: 0px;
            font-style: normal;
            font-weight: normal;
            font-size: 50px;
            text-transform: uppercase;
        }
    }
	header, #intro{
			grid-column: 2/8;
		}
		
		#intro{
			display:grid;
			grid-template-columns: repeat(6, 1fr);
			grid-gap: 16px;
			.canvas{
				grid-column: 1/4;
				overflow: hidden;
				display: flex;
				justify-content:center;
				align-items:center;
				height: 484px;
				z-index: 0;
				video{
					display: block;
					width: 150%;
				}
			}
			p{	
				z-index: 100;
				margin-top: -35%;
				grid-column: 3/7;
			}
		}
		#text, #previously, #awards, #contact{
			grid-column: 1/9;
			margin-bottom: 200px;
		}
	}

	//
	header{
		margin-top: 130px;
		&>div{
			display: grid;
		grid-template-rows: 1fr 1fr;
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
				background-color: crimson;
				overflow: hidden;
				justify-content:center;
				align-items:center;
				img{
					height: 100%;
				}
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
		}
		}
		}
		margin-bottom: 200px;
	}
	#intro{
		p{
			grid-column: 4/8;
			font-family: 'Jost*';
			font-style: normal;
			font-weight: 200;
			font-size: 60px;
			line-height: 87px;
			text-indent: 172px;
		}
		margin-bottom: 200px;
	}
	#text{
		display:grid;
		grid-template-columns: repeat(8, 1fr);
		.content{
			grid-column: 1/5;
		}
	}
	#previously, #awards{
		display:grid;
		grid-template-columns: repeat(8, 1fr);
		h2{
			grid-column: 1/9;
			margin-bottom: 60px;
		}
		div{
			grid-column: 2/8;
			display:grid;
			grid-template-columns: repeat(6, 1fr);
			p{
				grid-column: 2/6;
				margin-bottom: 60px;
			}
			ul{
				grid-column: 1/7;
				list-style: none;
			}
		}
	}
	#previously{
		ul{
			display:flex;
			flex-direction: row;
			justify-content: space-around;
			li{
				display:flex;
				flex-direction: column;
				p{
					margin: 0;
					padding: 0;
					text-align:center;
					&:nth-child(2){
						font-weight: 500;
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
				<p>Donaël</p>
				<picture><img src="/about/awards/top.jpg" alt=""/></picture>
			</div>
			<div>
				<picture><img src="/about/awards/bottom.jpg" alt=""/></picture>
				<p>Walter</p>
			</div>
		</div>
	</header>
	<div id="intro">
		<div class='canvas'>
			<video src='/about/about.mp4' muted loop autoplay></video>
		</div>
		<p>
			Hi, I’m Donaël,  I am a French Creative Dev, I do Photography and Graphic Design alongside.
		</p>
	</div>
	<div id="text">
		<div class="content">
			<p>
				I’am curently working at <a href="https://www.bihua.fr/" target="_blank" class='hover-effect'>Studio Bihua</a> in the city of <strong>Lyon, France</strong>, and I’m available in <strong>freelancing</strong> for little projects. On top of that,I am in the last year of my training at <a href="https://www.hetic.net" target="_blank"> Hétic</a> School, in <strong>Paris,France</strong>  where I study Web Development & Web Design. 
			</p>
			<p>
				Thanks to my previous training at the <a href='https://iutdijon.u-bourgogne.fr/www/'target="_blank">University Institute of Dijon (DUT MMI)</a>, where I was able to explore several fields in "multimedia". I have the ability to lead a project from A to Z, and to understand and adapt to these various issues in order to provide the most adequate solution.
			</p>
			<p>
				I love everything to do with visual design, mobile and web projects as well as branding, typography and animations. In the future I would like to work on more immersive and interactive projects, where the user experience is the key word. 
			</p>
		</div>
		<div>
			<picture><img src="" alt=""/></picture>
		</div>
	</div>
	<div id="previously">
		<h2><span class='number'>02</span> <span class='content'>Previously</span></h2>
		<div>
			<p>
				I’m proud and lucky to have passed through these agencies which taught me a lot and helped me to evolve in relation to my professional project, and the digital world.
			</p>
			<ul>
				<li>
					<a href="https://www.opsone.net/" target="_blank">
						<picture>
							<img src="/about/opsone_logo.svg" alt="">
						</picture>
					</a>
					<p class="name">OPSONE</p>
					<p class="position">2019 - 2020 / Work-study position</p>
				</li>
				<li>
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
	<div id="awards">
		<h2><span class='number'>03</span> <span class='content'>Awards and Featured</span></h2>
		<div>
			<p>
				Yes for know the list is pretty short ... <br/>
				But maybe if we collaborate I'm sure she won't be there long. <br/>
				Winning prizes is one thing, but working on interesting and useful projects is the main thing. <br/>
			</p>
			<ul>
				<li>
					<picture class='price-logo'>
						<img src="/about/awards/cssd.svg" />
					</picture>
					<a class='award' >Special Kudos</a>
					<a class="name" >Fédération Française d'Aérostation</a>
				</li>
				<li>
					<picture class='price-logo'>
						<img src="/about/awards/cssd.svg" />
					</picture>
					<a class='award' >Site of the Day</a>
					<a class="name" >Bihua</a>
				</li>
				<li>
					<picture class='price-logo'>
						<img src="/about/awards/maxibestof.svg" />
					</picture>
					<a class='award' >Inspiration Feed</a>
					<a class="name" >Bihua</a>
				</li>
			</ul>
		</div>
	</div>
	<div id="contact">
		<h2><span class='number'>04</span> <span class='content'>Feel free to contact me</span></h2>
		<a>contact@donaelwalter.com</a>
	</div>
</section>
<Footer/>