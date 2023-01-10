import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadProductsThunk } from "../store/product";
import './allproducts.css';

const AllProducts = () => {
   const dispatch = useDispatch();
   const allProducts = useSelector(state => Object.values(state.product.allProducts))

   useEffect(() => {
      dispatch(loadProductsThunk())
   }, [dispatch])

   //Determine display price
   const displayPrice = (product) => {
      let price;
      if(product.name.includes('Bowls')) price = '19.80'
      else if(product.name.includes('Cups')) price = '18'
      else price = '24'

      return price;
   }

   return (
      <div className='products-page'>
         <h1>All Products</h1>
         <p>Bold and delicious food inspired by the streets and kitchens of Asia. From instant pho and ramen to scrumptious refrigerated meals, we’ve got all your cravings covered. Now, stop staring...the food isn't going to order itself.</p>
         <ul className='all-products-wrapper'>
            {allProducts?.map(product => (
               <li key={product?.id}>
                  <Link className='product-link' to={`/products/${product?.id}`}>
                     <div className='product-card'>
                        <img src={product?.images[0].imageUrl}/>
                        {product.name.toUpperCase()}
                        <div className='six-pack-text'>6-Packs for ${displayPrice(product)}</div>
                     </div>
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default AllProducts;
