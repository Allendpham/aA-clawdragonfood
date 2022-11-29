import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { loadProductsThunk } from "../../store/product";
import { loadReviewsThunk, deleteReviewThunk } from "../../store/review";
import { addToCart } from "../../store/cart";
import { useParams } from "react-router-dom";
import './productDetail.css'

const ProductDetail = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const allProducts = useSelector(state => state?.product?.allProducts)
   const currUser = useSelector(state => state?.session?.user)
   const { productId } = useParams()
   const chosenProduct = allProducts[productId]

   const allReviews = useSelector(state => Object.values(state?.review?.allReviews))
   let content;

   useEffect(() => {
      dispatch(loadProductsThunk())
      dispatch(loadReviewsThunk(productId))
   }, [dispatch])

   //Create function to parse through price and display correct float

   //Create a useState variable to determine which reviews or questions button is clicked
   //Conditionally render reviews or questions based on useState with "content" variable
   //If no logged in user, when new review button clicked, redirect to login/signuppages
   //If user already has review on product, don't display write a review link

   const displayStars = (int) => {
      let arr = [];
      for(let i = 0; i < int; i++) {
         arr.push("★");
      };
      return arr.join(" ");
   }

   const handleDeleteClick = (reviewId) => {

      const data = dispatch(deleteReviewThunk(reviewId));
      if(data && !data.errors){
         tempAlert()
      }
   }

   const tempAlert = () => {
      const el = document.querySelector('.reviews-or-questions')
      let alert = document.createElement("p");
      alert.innerText = 'Successfully deleted your review.'
      alert.style.color = 'white';
      setTimeout(()=>{
         el.removeChild(alert)
      }, 1500)
      el.appendChild(alert)
   }

   const directToBuild = () => {
      if(chosenProduct?.name?.includes('Bowls')) history.push('/products/bowl-box')
      // Build the same component but just hand it different items
      else if(chosenProduct?.name?.includes('Cups')) history.push('/products/cup-box')
   }

   const addToCart = () => {

      //Build payload
      const payload = {
         name: chosenProduct?.name,
         price: 24.00,
         count: 1
      }

      // Check Local Storage
      if(!localStorage.getItem('cart')){
         payload['id'] = 1;
         localStorage.setItem('cart', JSON.stringify([payload]))
         // dispatch(addToCart(payload)) causes infinite loop
      }
      else {
         const currentCart = JSON.parse(localStorage.getItem('cart'));
         if(JSON.parse(localStorage.getItem('cart')).length === 0){
            payload['id'] = 1
         } else {
            payload['id'] = currentCart.map(item => item.id)[currentCart.length - 1] + 1
         }

         currentCart.push(payload)
         localStorage.setItem('cart', JSON.stringify(currentCart))
         // dispatch(addToCart(payload)) causes infinite loop
      }

      history.push('/cart')
   }

   chosenProduct?.name?.includes("Bowls") || chosenProduct?.name?.includes("Cups") ?
   content = (<button className='build-button' onClick={() => directToBuild()}>Build Your Box</button>) : content = (<button className='build-button' onClick={() => addToCart()}>Add to Cart</button>)

   let price;
   if(chosenProduct?.name?.includes('Bowls')) price = (<div className='price'>${chosenProduct?.price}0 PER BOWL<span> (YOU CAN MIX & MATCH FLAVORS)</span></div>)
   else if(chosenProduct?.name?.includes("Cups")) price = (<div className='price'>${chosenProduct?.price}.00 PER CUP<span> (YOU CAN MIX & MATCH FLAVORS)</span></div>)
   else price = (<div className='price'>${chosenProduct?.price}.00 PER 6-PACK</div>)

   //Helper function to parse date information
   const displayDate = (date) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const updatedAt = new Date(date);
      const month = months[updatedAt.getMonth()];
      const year = updatedAt.getFullYear();
      const day = updatedAt.getDate();

      return (<div>{month} {day}, {year}</div>)
   }

   return (
      <div className="spot-detail-wrapper">
         <div className='spot-detail-links'><Link className='shop-link' to='/collections/all'>SHOP</Link> <i class='fas fa-angle-right'></i> {chosenProduct?.name.toUpperCase()}</div>
         <div className='product-page-content'>
            <div className="product-page-images"><img src={chosenProduct?.images[0].imageUrl}/></div>

            <div className="product-page-data">
               <h1>{chosenProduct?.name.toUpperCase()}</h1>
               <p>{chosenProduct?.description}</p>
               {chosenProduct?.name?.includes('Bowls') && (
                  <p>Each 2.1 oz bowl includes rice noodles & seasoning packet(s)</p>
               )}
               {chosenProduct?.name?.includes('Cups') && (
                  <p>Each 2.2 oz cup includes authentic wheat ramen noodles, seasoning packet, vegetable packet and flavoring oil packet.</p>
               )}

               {chosenProduct?.name?.includes('Packets') && (
                  <>
                     <p>Each box contains (2) 2.1 oz packets. Each packet includes rice noodles & seasoning packet</p>
                     <p>6-Pack is (6) 2-Pack boxes of 2.1 oz packets</p>
                  </>
               )}
               {price}
               {chosenProduct?.name?.includes('Bowls') && (
                  <p className='disclaimer'>
                     <div>We only ship in increments of 6 bowls</div>
                     <div>1 box = <span>6 delicious </span>bowls</div>
                  </p>
               )}
               {chosenProduct?.name?.includes('Cups') && (
                  <p className='disclaimer'>
                     <div>We only ship in increments of 6 cups</div>
                     <div>1 box = <span>6 delicious </span>cups</div>
                  </p>
               )}
               {content}
            </div>
         </div>
         <div className="product-reviews-wrapper">
            <h2 className='reviews-or-questions'>REVIEWS</h2>
            <div className='review-button-wrapper'>
               {(allReviews.filter(review => review?.userId === currUser?.id).length === 0) &&
               <NavLink className='new-review-link' to={`/products/${chosenProduct?.id}/reviews/new`} >Write a Review</NavLink>
               }
            </div>
            <div className='reviews-display-wrapper'>
               {allReviews.length === 0 && (<p className='no-reviews'>There are no reviews yet.</p>)}

               <ul className='review-list'>
                  {allReviews?.map(review => (
                     <li key={review?.id}>
                        <div className='review-card'>
                           <div className='review-title'>
                              {review?.title}
                              <div>
                                 by {review?.user?.firstName} {review?.user?.lastName}
                              </div>
                              {displayDate(review?.updatedAt)}
                           </div>
                           <div>{displayStars(review?.rating)}</div>
                           <div>{review?.message}</div>
                           {currUser?.id === review?.userId && (
                              <div className='user-review-buttons'>
                                 <button onClick={() => history.push(`/products/${review?.productId}/reviews/${review?.id}/edit`)}>Edit</button>
                                 <button onClick={() => handleDeleteClick(review?.id)}>Delete</button>
                              </div>
                           )}
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   )
}

export default ProductDetail;
