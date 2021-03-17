<script>
    import urlFor from '../../../scripts/urlFor.js'

    export let Cover;
    export let SubTitle;
    export let Title;
</script>
<style lang='scss'>
    header{
        margin-top: calc(12vh - 32px);
        margin-bottom: 130px;
        p{
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
        }
        h1{
            font-style: normal;
            font-weight: normal;
            font-size: 90px;
            line-height: 97%;
            text-transform: uppercase;
            font-feature-settings: 'ordn' on, 'swsh' on, 'ornm' on;
            text-align:center;
            max-width: 50%;
            margin:auto;
        }
        @media screen and (max-width: 1024px){
            // Petit Desktop
        }
        @media screen and (max-width: 768px){
            // Tablette
        }
        @media screen and (max-width: 425px){
            // Mobile
        }
    }
    div{
        height: 480px;
        margin-left: 32px;
        margin-right: 32px;
        border-radius: 16px;
        overflow: hidden;
        picture{
            display:block;
            width: 100%;
            img{
                width: 100%;
            }
        }
    }
</style>
<header>
    <p>{SubTitle}</p>
    <h1>{Title}</h1>
</header>
<div>
    <picture>
        <img src={urlFor(Cover).width(1441).height(480)}/>
    </picture>
</div>