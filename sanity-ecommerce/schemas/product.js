//export sanity schema as basic JS object
export default{
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                //enables UI for cropping/resizing uploaded images
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            //sanity's custom type for unique identifiers
            type: 'slug',
            options: {
                //automatically generates unique slug based on name
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price', 
            title: 'Price', 
            type: 'number',
        },
        {
            name: 'details',
            title: 'details',
            type: 'string'
        }
    ]
}