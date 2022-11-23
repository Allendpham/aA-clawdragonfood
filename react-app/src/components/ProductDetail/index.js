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
      let alert = document.createElement("div");
      alert.innerText = 'Successfully deleted your review.'
      alert.style.color = 'red';
      setTimeout(()=>{
         el.removeChild(alert)
      }, 1000)
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
      content = (<button onClick={() => directToBuild()}>Build Your Box</button>) : content = (<button onClick={() => addToCart()}>Add to Cart</button>)

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
               {/* adjust above content to display different based on bowl or cup */}
               {content}
               {/* <button onClick={() => directToBuild()}>Build Your Box</button> */}
               {/* Two different pages for build bowl box or cup box */}
            </div>
         </div>
         <div className="product-reviews-wrapper">
            <div className='reviews-or-questions'>REVIEWS</div>
            {(allReviews.filter(review => review?.userId === currUser?.id).length === 0) &&
            <NavLink className='new-review-link' to={`/products/${chosenProduct?.id}/reviews/new`} >Write a Review</NavLink>
            }
            <div className='reviews-display-wrapper'>
               <ul className='review-list'>
                  {allReviews?.map(review => (
                     <li key={review?.id}>
                        <div className='review-card'>
                           <div>
                              {review?.title} by {review?.user?.firstName} {review?.user?.lastName}
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
