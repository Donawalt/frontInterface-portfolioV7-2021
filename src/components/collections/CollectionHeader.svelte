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
    }
</style>

<header class="collection-header">
    <h1 class="collection-header__pageName">{ pageName }</h1>
    <p class="collection-header__subTitle">{ subTitle }</p>
</header> 
