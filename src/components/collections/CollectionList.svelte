<script>
    import Element from "./utils/CollectionElement.svelte"

    export let Posts;
</script>

<style lang="scss">
    .grid{
        padding: 0px;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-auto-rows: 232px;
        grid-column-gap: 16px;
        grid-row-gap: 24px;
        color:white;
        margin-left: 32px;
        margin-right: 32px;
        li{
            padding: 0px;
            margin: 0;
            list-style: none;
            &.big{
                grid-column-end: span 2;
                grid-row-end: span 2;
            }
        }
    }
    .collection-list{
        margin-top: 130px;
        margin-bottom: 130px;
    }
</style>
<ul class="collection-list grid">
    {#each Posts as post, i}
         <!-- content here -->
         <li class:big={i === 4 || i === 10 || i === 25}>
             <Element type={"big"} Post={post} Index={i}/>
         </li>
    {/each}
</ul>