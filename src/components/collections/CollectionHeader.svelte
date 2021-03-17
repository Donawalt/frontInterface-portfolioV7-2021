<script>
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
    <h1 class="collection-header__pageName">{ pageName }</h1>
    <p class="collection-header__subTitle">{ subTitle }</p>
</header> 
