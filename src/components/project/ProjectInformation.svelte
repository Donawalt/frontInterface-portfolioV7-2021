<script>
    import BlockContent from "@movingbrands/svelte-portable-text";

    export let Introduction;
    export let Skills;

    console.log(Introduction)
</script>

<style lang="scss">
    .information{
        display:grid;
        grid-template-columns: repeat(8, 1fr);
        column-gap: 16px;
        margin-left: 32px;
        margin-right: 32px;
        margin-top: 120px;
        margin-bottom: 64px;
        .title{
            opacity: 0.7;
            margin-bottom: 16px;
        }
        .information_intro{
            grid-column: 2/6;
        }
        .information_skills{
            grid-column: 7/9;
            ul,li{
                margin: 0;
                padding: 0;
                list-style: none;
            }
        }
    }
</style>

<div class='information'>
    <div class="information_intro">
        <h3 class="title">Introduction</h3>
        <p><BlockContent blocks={Introduction}/></p>
    </div>
    <div class="information_skills">
        <h3 class="title">Skills</h3>
        <ul>
            {#each Skills as skill}
            <li>{skill}</li><!-- content here -->
            {/each}
        </ul>
    </div>
</div>