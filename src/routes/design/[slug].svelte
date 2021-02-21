<script context="module">

    import client from "../../sanityClient.js"

    export async function preload({ params }) {
        try{
        const slug = params.slug;
        const filter = '*[_type == "project" && slug.current == $slug&& category == "design"][0]';

        const query = filter;
        const post = await client.fetch(query, {slug});
        console.log(post)
        return {post}
    } catch (err) {
        this.error(505, err)
      }
    };
</script>

<script>
    import Header from "../../components/project/ProjectHeader.svelte";
    import Information from "../../components/project/ProjectInformation.svelte";
    import SlicesManager from "../../components/SliceManager.svelte";
    import ProjectFooter from '../../components/project/ProjectFooter.svelte'
    import Footer from '../../components/Footer.svelte'

    export let post;
</script>
<Header/>
<Information />
<SlicesManager />
<ProjectFooter />
<Footer />