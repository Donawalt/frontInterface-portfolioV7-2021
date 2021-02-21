<script context="module">

    import client from "../../sanityClient.js"

    export async function preload({ params }) {
        try{
        const slug = params.slug;
        const filter = '*[_type == "project" && slug.current == $slug && category == "photography"][0]';

        const query = filter;
        const post = await client.fetch(query, {slug});
        let createdAt = new String(post._createdAt).toString();
        console.log(createdAt);
        const nextPost= await client.fetch("*[_type == 'project' && $createdAt< _createdAt && category == 'photography'] | order(_createdAt asc)[0]", {createdAt})
        console.log('CurrentPost', post)
        console.log('NextPost', nextPost)
        return {post, nextPost}
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
    export let nextPost;
</script>
<Header SubTitle={post.subtitle} Title={post.name} Cover={post.cover}/>
<Information Skills={post.skills} Introduction={post.introduction}/>
<SlicesManager Slices={post.slices}/>
<ProjectFooter Title={nextPost ? nextPost.name : 'No more projects' } Slug={nextPost ? nextPost.category+'/'+nextPost.slug.current : '/'} Cover={nextPost ? nextPost.cover : null}/>
<Footer />