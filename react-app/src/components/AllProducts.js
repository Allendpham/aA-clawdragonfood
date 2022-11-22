import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadProductsThunk } from "../store/product";
import './allproducts.css'

const AllProducts = () => {
   const dispatch = useDispatch();
   const allProducts = useSelector(state => Object.values(state.product.allProducts))

   useEffect(() => {
      dispatch(loadProductsThunk())
   }, [dispatch])

   return (
      <div>
         <h1>Hello from allProducts Page</h1>
         <ul className='all-products-wrapper'>
            {allProducts?.map(product => (
               <li key={product?.id}>
                  <Link to={`/products/${product?.id}`}>
                     <div className='product-card'>
                        <img src={product?.images[0].imageUrl}/>
                        {product.name}
                     </div>
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default AllProducts;
