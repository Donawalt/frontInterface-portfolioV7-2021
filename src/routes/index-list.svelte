<script>
	import Footer from '../components/Footer.svelte'
	import CollectionList from '../components/index-list/collection-list.svelte'
	import urlFor from '../../scripts/urlFor.js'


	export let posts;
	export let devPosts;
	export let desPosts;
	export let photoPosts;

	export let picture = null;
	function handler(event) {
		picture = urlFor(posts.filter(x => x.name == event.detail.name)[0].cover).width(506)
		console.log(picture)
	}
</script>
<script context="module">
	// your script goes here
	import client from "../sanityClient.js"

export async function preload({ params }) {
	try{
	const slug = params.slug;
	const filter = '*[_type == "project"]{category, name, slug, cover}';

	const query = filter;
	const posts = await client.fetch(query);
	const devPosts = posts.filter(x => x.category == "development").slice(0,5);
	const desPosts = posts.filter(x => x.category == "design").slice(0,5);
	const photoPosts = posts.filter(x => x.category == "photography").slice(0,5);
	return {posts, devPosts, desPosts, photoPosts}
} catch (err) {
	this.error(505, err)
  }
};
</script>

<style lang="scss">
	section{
		display: grid;
        grid-template-columns: repeat(8,1fr);
        grid-column-gap: 16px;
        grid-row-gap: 24px;
		margin-left: 32px;
		margin-right: 32px;
		@media screen and (max-width: 425px){
			display: block;
			margin-left: 16px;
			margin-right: 16px;
		}
		.left{
			display: grid;
			grid-template-rows: auto 1fr 1fr;
			height: 100vh;
			top:0;
			grid-column: 1/4;
			position: sticky;
			h1{
			font-family: "scillaitalic";
			font-style: italic;
			font-weight: normal;
			font-size: 50px;
			text-transform: uppercase;
			line-height: 97%;
			padding: 0;
			margin: 0;
			}	
			picture{
				height: 100%;
				width: 100%;
				display: block;
				border-radius: 16px;
				overflow: hidden;
				display: flex;
				justify-content:center;
				align-items: center;
				img{
					width: 100%;
				}
			}
			p{
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 97%;
			text-transform: uppercase;

			color: #9B9999;
			}
			a{
				font-family: "scillaregular";
				font-style: normal;
				font-weight: normal;
				font-size: 50px;
				line-height: 97%;
				text-transform: uppercase;
				text-decoration: none;
			}
			ul{
				margin:0;
				padding:0;
				list-style: none;
				li{
					margin:0;
				padding:0;
				}
			}
			@media screen and (max-width: 425px){
				height: auto;
				position: initial;
				margin-bottom: 30px;
				h1{
					font-size: 30px;
					margin-bottom: 30px;
				}
				picture{
					display: none; 
				}
				#list-links{
					display: none;
				}
			}
		}
		.right{
			grid-column: 4/9 ;
			@media screen and (max-width: 425px){
				grid-column: 1/9;
			}
		}
	}
</style>

<svelte:head>
	<title>Index</title>
</svelte:head>

<section>
	<div class="left">
		<h1>
			Find <br/>
			exactly <br/>
			what You <br/>
			Want <br/>
		</h1>
		<picture id="list-picture">
			<img  src={picture ? picture : null} alt="">
		</picture>
		<div id="list-links">
			<p>Social links</p>
			<ul>
				<li><a href="https://www.linkedin.com/in/dona%C3%ABl-walter/">⁕ Linkedin</a></li>
				<li><a href="https://github.com/Donawalt/">Github ⁕</a></li>
				<li><a href="https://www.instagram.com/walt_dona/">⁕ Instagram</a></li>
			</ul>
		</div>
	</div>
	<div class="right">
		<CollectionList TitleCollection={"Development"} Articles={devPosts} on:covering={handler}/>
		<CollectionList TitleCollection={"Photography"} Articles={photoPosts} on:covering={handler}/>
		<CollectionList TitleCollection={"Design"} Articles={desPosts} on:covering={handler}/>
	</div>
</section>
<Footer />