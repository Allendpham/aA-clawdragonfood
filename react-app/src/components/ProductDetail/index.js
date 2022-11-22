import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { loadProductsThunk } from "../../store/product";
import { useParams } from "react-router-dom";
import './productDetail.css'

const ProductDetail = () => {
   const dispatch = useDispatch();
   const allProducts = useSelector(state => state.product.allProducts)
   const { productId } = useParams()
   const chosenProduct = allProducts[productId]

   useEffect(() => {
      dispatch(loadProductsThunk())
   }, [dispatch])

   //Create function to parse through price and display correct float

   //Create a useState variable to determine which reviews or questions button is clicked
   //Conditionally render reviews or questions based on useState with "content" variable
   //If no logged in user, when new review button clicked, redirect to login/signuppages
   //If user already has review on product, don't display write a review link

   return (
      <div className="spot-detail-wrapper">
         Hello from Product Detail
         <div className='spot-detail-links'><Link to='/collections/all'>Shop</Link> - {chosenProduct?.name}</div>
         <div className='product-page-content'>
            <div className="product-page-images"><img src={chosenProduct?.images[0].imageUrl}/></div>

            <div className="product-page-data">
               <div>{chosenProduct?.name}</div>
               <div>{chosenProduct?.description}</div>
               <div>${chosenProduct?.price} per cup</div>
               <button>Add to Cart</button>
            </div>
         </div>
         <div className="product-reviews-wrapper">
            <div className='reviews-or-questions'>REVIEWS</div>
            <NavLink className='new-review-link' to={`/products/${chosenProduct?.id}/reviews/new`} >Write a Review</NavLink>
            <div className='reviews-display-wrapper'> Here will be reviews </div>
         </div>
      </div>
   )
}

export default ProductDetail;
