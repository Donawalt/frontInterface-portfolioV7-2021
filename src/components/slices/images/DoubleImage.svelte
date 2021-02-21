<script>
    import urlFor from '../../../../scripts/urlFor.js'
    // your script goes here
    export let FirstImage;
    export let SecondaryImage;
    export let FirstAlt;
    export let SecondaryAlt;
    export let Side;
</script>
<style lang='scss'>
    section{
        grid-column: 1/9;
        margin-bottom: 180px;
        display:grid;
        grid-template-columns: repeat(8, 1fr);
        grid-gap: 16px;
        picture{
            border-radius: 16px;
            overflow:hidden;
            &:nth-child(1){
                grid-column: 1/4;
            }
            &:nth-child(2){
                margin-top: 25%;
                grid-column: 5/8;
            }
            display:block;
            width:100%;
            height: fit-content;
            img{
                display:block;
                width: 100%;
                height: auto;
            }
        }
        &.revert{
            picture{
                &:nth-child(1){
                    margin-top: 25%;
                    grid-column: 2/5;
                }
                &:nth-child(2){
                    margin-top: 0px;
                    grid-column: 6/9;
                }
            }
        }
    }
</style>
<section class='revert'>
    <picture>
        <img src={urlFor(FirstImage).width(506)} alt={FirstAlt}/>
    </picture>
    <picture>
        <img src={urlFor(SecondaryImage).width(506)} alt={SecondaryAlt}/>
    </picture>
</section>