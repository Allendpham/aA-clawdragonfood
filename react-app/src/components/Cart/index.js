import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { updatePrice, purchaseCart } from "../../store/cart";
import { addOrderThunk } from "../../store/order";
import CartItem from "../CartItem";
import './cart.css'

const Cart = () => {
   let cartItems;
   let content;
   const dispatch = useDispatch();
   const history = useHistory();
   // const [totalPrice, setTotalPrice] = useState(0);
   const currUser = useSelector(state => state?.session?.user)
   const totalPrice = useSelector(state => state.cart.totalPrice)
   const cart = useSelector(state => state.cart.items)

   // Need a useEffect for total Price?
   // May need to store totalprice in the cart slice of state
   // useEffect(() => {
   //    let calculation = 0;
   //    cartItems?.forEach(item => {
   //       calculation += (item.count * item.price)
   //    })
   //    console.log("this is the calculation", calculation)
   //    setTotalPrice(calculation)
   // }, [cart])

   useEffect(() => {
      let calculation = 0;
      cartItems?.forEach(item => {
         calculation += (item.count * item.price)
      })
      dispatch(updatePrice(calculation))
   }, [dispatch])


   if(localStorage.getItem('cart')){
      cartItems = JSON.parse(localStorage.getItem('cart'))
      // let calculation = 0;
      // cartItems.forEach(item => {
      //    calculation += (item.count * item.price)
      // })
      // console.log("this is the calculation", calculation)
      // setTotalPrice(calculation)
   }

   const handleCheckout = () => {
      //Send dispatch to back end to create order/order items and store for order history
      //Clear local storage, dispatch cart thunk to clear react state
      //Upon successful checkout, display some type of modal or message saying thank you?
      //Then redirect to account page with order history displayed
      //Must be logged in to successfully check out, protect cart route?
      let cart = localStorage.getItem('cart');
      const payload = {
         userId: currUser.id,
         totalPrice: totalPrice[0],
         items: cart
      }

      dispatch(purchaseCart)
      localStorage.removeItem('cart')
      dispatch(addOrderThunk(payload))
      // window.alert("Your purchase was successful! Thank you for your business.")
      history.push('/account')
   }

   cartItems?.length ? content = (<div className='cart-wrapper'>
      <h2>SHOPPING CART</h2>
      <table className='table-wrapper'>
         <thead>
            <tr className='table-headers'>
               <th className='product-title'>PRODUCT</th>
               <th>PRICE</th>
               <th>QUANTITY</th>
               <th>TOTAL</th>
            </tr>
         </thead>
         <tbody>
            {cartItems.map((item, index) => (
               <CartItem key={item.id} item={item} index={index}/>
            ))}
         </tbody>
      </table>
      <div className='removing-cart-item'></div>
      <div className='bottom-div'>
         <div><span>SUBTOTAL</span> ${totalPrice[0]?.toFixed(2)} USD</div>
         <button onClick={() => handleCheckout()}>CHECK OUT</button>
      </div>

   </div>) : content = (<div className='empty-cart-message'><div>Your Cart is Currently Empty</div>
                           <div><NavLink className='empty-cart-link' to='/collections/all' exact={true} activeClassName='active'>
                              Continue Shopping <i class='fas fa-long-arrow-alt-right'></i>
                           </NavLink></div>
                        </div>)

   return (
      <div>
         {content}
      </div>
   )
}

export default Cart;
