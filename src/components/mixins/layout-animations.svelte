<script>
    // your script goes here
    import { onMount } from 'svelte'
	import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
	let lastValue;
    onMount(async()=>{
		const module = await import('locomotive-scroll');
		let LocomotiveScroll = module.default;
		const scroll = new LocomotiveScroll(
			{
   				el: document.querySelector('[data-scroll-container]'),
    			smooth: true
			}
		);
		
		const f = ()=>{
			if(lastValue != $page.path){
				console.log('update')
				scroll.update();
				setTimeout(() => {
					scroll.update();
					setTimeout(() => {
						scroll.update();
					}, 1000);
				}, 200);
				lastValue = $page.path;
			}
			requestAnimationFrame(f);
		}
		requestAnimationFrame(f)
    })
</script>
