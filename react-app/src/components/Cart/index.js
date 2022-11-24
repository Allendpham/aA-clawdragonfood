import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { updatePrice, purchaseCart } from "../../store/cart";
import CartItem from "../CartItem";

const Cart = () => {
   let cartItems;
   let content;
   const dispatch = useDispatch();
   const history = useHistory();
   // const [totalPrice, setTotalPrice] = useState(0);
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


      dispatch(purchaseCart)
      localStorage.removeItem('cart')
      window.alert("Your purchase was successful! Thank you for your business.")
      history.push('/')
   }

   cartItems?.length ? content = (<div>
      <h2>SHOPPING CART</h2>
      <table>
         <thead>
            <tr>
               <th>PRODUCT</th>
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
      <div>
         <div>SUBTOTAL ${totalPrice[0]} USD</div>
         <button onClick={() => handleCheckout()}>CHECK OUT</button>
      </div>

   </div>) : content = (<div>Your Cart is Currently Empty</div>)

   return (
      <div>
         {content}
      </div>
   )
}

export default Cart;
