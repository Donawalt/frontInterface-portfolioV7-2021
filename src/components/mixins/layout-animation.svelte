<script>
        import { onMount } from 'svelte'

        let winsize;
            const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
            // scroll position
            let docScroll;
            // for scroll speed calculation
            let lastScroll;
            let scrollingSpeed = 0;
            // scroll position update function
            const getPageYScroll = () => docScroll = window.pageYOffset || document.documentElement.scrollTop;

            let rm;
            let rc;

            class SmoothScroll {
            constructor(){
                this.DOM = {main: document.querySelector('#sapper')};
                this.DOM.scrollable = this.DOM.main.querySelector('main');
                this.renderedStyles = {
                translationY: {
                    // interpolated value
                    previous: 0, 
                    // current value
                    current: 0, 
                    // amount to interpolate
                    ease: 0.1,
                    // current value setter
                    // in this case the value of the translation will be the same like the document scroll
                    setValue: () => docScroll
                }
                };

                            // set the body's height
                    this.setSize();
                    // set the initial values
                    this.update();
                    // the <main> element's style needs to be modified
                    this.style();
                    // init/bind events
                    this.initEvents();
                    // start the render loop
                    rm = requestAnimationFrame(() => this.render());
            }
            update(){
                this.layout();
            }
            layout(){
                this.DOM.scrollable.style.transform = `translate3d(0,${-1*this.renderedStyles.translationY.previous}px,0)`;
            }
            setSize(){
                document.querySelector('body').style.height = `${this.DOM.scrollable.scrollHeight}px`;
            }
            style(){
                this.DOM.main.style.position = 'fixed';
                this.DOM.main.style.width = this.DOM.main.style.height = '100%';
                this.DOM.main.style.top = this.DOM.main.style.left = 0;
                this.DOM.main.style.overflow = 'hidden';
            }
            initEvents(){
                window.addEventListener('resize', () => this.setSize());
            }
            render(){
                scrollingSpeed = Math.abs(docScroll - lastScroll);
                lastScroll = docScroll;
            
                this.layout();
                rc = requestAnimationFrame(() => this.render());
            }
            destroy(){
                this.DOM.main.removeProperty('position');
                this.DOM.main.removeProperty('width');
                this.DOM.main.removeProperty('height');
                this.DOM.main.removeProperty('top');
                this.DOM.main.removeProperty('left');
                this.DOM.main.removeProperty('overflow');
                window.cancelAnimationFrame(rm);
                window.cancelAnimationFrame(rc);
            }
        }
        onMount(()=>{
            calcWinsize();
            window.addEventListener('resize', calcWinsize);
            window.addEventListener('scroll', getPageYScroll);
            getPageYScroll();
            lastScroll = docScroll;
            let scroll = new SmoothScroll();
            console.log(scroll, 'vjhv');
        })
            // calculate the viewport size
</script>