import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../Constants/CartConstansts";

//////////////
//Add to cart action
export const addToCart = (id, qty) => async (dispacth, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispacth({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // storing cart items in the local storage
    //getState() is getting state from the combine reducers in store.js
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) 
}

//////////////
//remove from the cart action
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) 
}

//////////////
//Save shipping address action
export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    
    localStorage.setItem('shippingAddress', JSON.stringify(data)) 
}
//////////////
//Save payment method action
export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    
    localStorage.setItem('paymentMethod', JSON.stringify(data)) 
}