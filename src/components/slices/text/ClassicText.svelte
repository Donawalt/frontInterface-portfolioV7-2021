<script>
    import BlockContent from "@movingbrands/svelte-portable-text";

    export let Index;
    export let Title;
    export let Content;
</script>
<style lang='scss'>
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
    section{
        grid-column: 3/7;
        margin-bottom: 180px;
    }
</style>
<section>
    <h2><span class='number'>{Index}</span> <span class='content'>{Title}</span></h2>
    <p><BlockContent blocks={Content}/></p>
</section>