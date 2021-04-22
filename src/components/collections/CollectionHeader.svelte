<script>
    import SplitType from 'split-type'
	import gsap from 'gsap';
	import { ScrollTrigger } from "gsap/ScrollTrigger";

    
    import { onMount } from 'svelte'

    
    onMount(async ()=>{
        gsap.registerPlugin(ScrollTrigger);
        let headeSplit = new SplitType("[data-splitting='header']", {type: "chars"})
        let tl = gsap.timeline();
        tl.fromTo('header h1 .char', {
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

        tl.fromTo('header p', {opacity: 0}, {opacity: 1, delay: -0.25})
    })

    export let pageName;
    export let subTitle;
</script>

<style lang="scss">
    .collection-header{
        margin-top: 12vh;
        h1{ 
            font-style: normal;
            font-weight: normal;
            font-size: 80px;

            text-align: center;
            text-transform: uppercase;
            font-feature-settings: 'ordn' on, 'swsh' on, 'ornm' on;
            margin:0;
            padding:0;
            overflow: hidden;
        }
        p{
            margin:0;
            padding:0;
            font-family: 'scillaregular';
            font-style: normal;
            font-weight: normal;
            font-size: 35px;
            text-align: center;
            font-feature-settings: 'ordn' on;
            opacity: 70%;
        }
        @media screen and (max-width: 1024px){
            // Petit Desktop
        }
        @media screen and (max-width: 768px){
            // Tablette
            h1{
                font-style: normal;
                font-weight: normal;
                font-size: 60px;
                line-height: 97%;
            }
            p{
                font-style: normal;
                font-weight: normal;
                font-size: 26px;
                line-height:auto;
                text-align: center;
            }
        }
        @media screen and (max-width: 425px){
            // Mobile
            padding-left: 16px;
            padding-right: 16px;
            h1{
                font-style: normal;
                font-weight: normal;
                font-size: 30px;
                line-height: 97%;
            }
            p{
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
            }
        }
    }
</style>

<header class="collection-header">
    <h1 class="collection-header__pageName"  data-splitting="header">{ pageName }</h1>
    <p class="collection-header__subTitle">{ subTitle }</p>
</header> 
