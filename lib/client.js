//sanity client
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'w2hisx9f',
    dataset: 'production',
    apiVersion: '2022-10-27',
    useCdn: true,
    token:  process.env.PROJECT_TOKEN
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)