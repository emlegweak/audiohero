//file-based routing in next.js
//square brackets around file names means that next.js will dynamically render the page based on the slug name
//don't need to implement any kind of library like react-router, just create a new folder and write JSX
import React, {useState} from 'react'
import {client, urlFor} from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import {useStateContext} from '../../context/StateContext'

const ProductDetails = ({product, products}) => {
  const {image, name, details, price} = product

  //state mgmt for image-container
  const [index, setIndex] = useState(0)

  //import state functions from StateContext.js
  const {decQty, incQty, qty, onAdd} = useStateContext()

  return (
    <div>
      <div className='product-detail-container'>
        <div className='image-container'>
          <img src={urlFor(image && image[index])} alt={details} className='product-detail-image' />
        </div>
        <div className='small-images-container'>
          {image?.map((item, i) =>(
            <img src={urlFor(item)} alt={details}
            className={i === index ? 'small-image selected-image' : 'small-image'}
            //selects product image to display in image-container based on mouse hover
            onMouseEnter={() => setIndex(i)} />
          ))}
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <p>
              (20)
            </p>
          </div>
            <h4>Details: </h4>
            <p>{details}</p>
            <p className='price'>${price}</p>
            <div className='quantity'>
              <h3>Quantity: </h3>
              <p className='quantity-desc'>
                <span className='minus'
                      onClick={decQty}>
                        <AiOutlineMinus />
                </span>
                <span className='num'
                      onClick=''>
                        {qty}
                </span>
                <span className='plus'
                      onClick={incQty}>
                        <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className='buttons'>
              <button type='button'
                      className='add-to-cart'
                      onClick={() => onAdd(product, qty)}>
                        Add to Cart
              </button>
                <button type='button'
                      className='buy-now'>
                        Buy Now
              </button>
            </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like...</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) =>(
              <Product key={item._id}
              product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
    
  )
}

//getStaticPaths = if a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated
export const getStaticPaths = async() =>{
  //sanity query - get only the current property of a slug for each project 
  const query = `*[_type == "product"] {
    slug {
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

 // getStaticProps = nextjs function that is used when you want to pre-render the page at build time using the props returned
 //when to use? - if data required to render the page is available at build time ahead of user's request, if data comes from headless CMS
export const getStaticProps = async ({params: {slug}}) =>{
  //sanity query - grabs all product details from the page the user is currently on
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery = '*[_type == "product"]'

  //get individual product
  const product = await client.fetch(query)
  //get all products
  const products = await client.fetch(productsQuery)
  
  return{
    props: {
      products, product
    }
  }
}



export default ProductDetails
