import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import CartItem from "../CartItem";

//Make a Table to display Shopping Cart info
const Cart = () => {
   let cartItems;
   let content;
   const cart = useSelector(state => state.cart)
   console.log(cart, "I am the cart!")

   if(localStorage.getItem('cart')){
      cartItems = JSON.parse(localStorage.getItem('cart'))
   } 

   cartItems?.length ? content = (<div>
      <h2>SHOPPING CART</h2>
      <table>
         <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
         </tr>
         {cartItems.map((item, index) => (
            // map to a CartItem component instead?
            <CartItem key={item.id} item={item} index={index}/>
         ))}
      </table>
   </div>) : content = (<div>Your Cart is Currently Empty</div>)

   return (
      <div>Hello From Cart Page
         {/* <div>
            <h2>SHOPPING CART</h2>
            <div>***Table headers to be added here***</div>
            <table>
               <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
               </tr>
            </table>
         </div> */}
         {content}
      </div>
   )
}

export default Cart;
