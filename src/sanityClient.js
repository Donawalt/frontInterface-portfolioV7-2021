import sanityClient from '@sanity/client'

const client = sanityClient({
    projectId: '6mijc31d',
    dataset: 'production',
    useCdn: true
  })
  
  export default client