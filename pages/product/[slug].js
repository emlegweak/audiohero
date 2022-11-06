//file-based routing in next.js
//square brackets around file names means that next.js will dynamically render the page based on the slug name
//don't need to implement any kind of library like react-router, just create a new folder and write JSX
import React from 'react'
import {client, urlFor} from '../../lib/client'

const ProductDetails = ({product, products}) => {
  const {image, name, details, price} = product
  return (
    <div>
      <div className='product-detail-container'>
        <div className='image-container'>
          <img src={urlFor(image && image[0])} alt={details} />
        </div>
      </div>
    </div>
    
  )
}

 // getStaticProps = nextjs function that is used when you want to pre-render the page at build time using the props returned
 //when to use? - if data required to render the page is available at build time ahead of user's request, if data comes from headless CMS
export const getStaticProps = async ({params: {slug}}) =>{
  //sanity query - grabs all product details from the page the user is currently on
  const query = `*[_type == "product && slug.current ==== '${slug}'][0]`
  const productsQuery = '*[_type = "product]'

  //get individual product
  const product = await client.fetch(query)
  //get all products
  const products = await client.fetch(productsQuery)

  console.log(product)

  return{
    props: {
      products, product
    }
  }
}

//getStaticPaths = if a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated
export const getStaticPaths = async() =>{
  //sanity query - get only the current property of a slug for each project 
  const query = `*[_type = product] {
    slug{
      current
    }
  }`

  const products = await client.fetch(query)

  const paths = products.map((product) =>({
    //returning an object from a function
    params:{
      slug: product.slug.current
    }
  }))

  return{
    paths, 
    fallback: 'blocking'
  }
}

export default ProductDetails
