import React, {createContext, useContext, useState, useEffect, isValidElement} from 'react'
import {toast} from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct 
    let index

     //cart functionality - add to cart
     const onAdd = (product, quantity) =>{
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if(checkProductInCart) {
          const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            }
          })

          setCartItems(updatedCartItems);
        } else {
          product.quantity = quantity;
        
          setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
  } 

    //toggle cart item quantity
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        index = cartItems.findIndex((product) => product._id === id)
        
        if(val === 'inc'){
            foundProduct.quantity += 1
            setCartItems([...cartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        }else if (val === 'dec'){
            if (foundProduct.quantity > 1){
            foundProduct.quantity += 1
            setCartItems( [...cartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    //dynamic quantity update functions
    //increase quantity
    const incQty = () =>{
        setQty((prevQty)=> prevQty + 1 )
    }
    //decrease quantity
     const decQty = () =>{
        setQty((prevQty)=> {
            if(prevQty - 1 < 1){
                return 1
            } 
            return prevQty - 1
        })
    }

 
    return(
        <Context.Provider
            value={{
                showCart, setShowCart, cartItems, totalPrice, totalQuantities, qty, incQty, decQty, onAdd, toggleCartItemQuantity
            }}
        >
            {children}
        </Context.Provider>
    )
}

//allows us to use state essentially like a hook
export const useStateContext = () => useContext(Context)