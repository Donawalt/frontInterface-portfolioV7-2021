<script context="module">

    import client from "../../sanityClient.js"

    export async function preload({ params }) {
        try{
        const slug = params.slug;
        const filter = '*[_type == "project" && category == "design"]';

        const query = filter;
        const posts = await client.fetch(query);
        return {posts}
    } catch (err) {
        this.error(505, err)
      }
    };
</script>
<script>
    // your script goes here
    import Header from '../../components/collections/CollectionHeader.svelte';
    import List from '../../components/collections/CollectionList.svelte';
    import Footer from '../../components/Footer.svelte';;

    export let posts
</script>

<Header pageName={"Design"} subTitle={"Graphic Design, 3D Design and other Stuffs"} />
<List Posts={posts}/>
<Footer />