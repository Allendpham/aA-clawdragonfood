import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { loadProductsThunk } from "../../store/product";
import { loadReviewsThunk, updateReviewThunk } from "../../store/review";
import ErrorDisplay from "../ErrorDisplay";
import '../auth/form.css'

const UpdateReviewForm = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const allReviews = useSelector(state => state?.review?.allReviews)
   const currUser = useSelector(state => state?.session?.user)
   const { productId, reviewId } = useParams()
   const chosenReview = allReviews[reviewId]

   const [review, setReview] = useState(chosenReview?.message);
   const [title, setTitle] = useState(chosenReview?.title);
   const [stars, setStars] = useState(chosenReview?.rating);
   const [errors, setErrors] = useState([]);
   const [hover, setHover] = useState(null);

   useEffect(() => {
      dispatch(loadProductsThunk())
      dispatch(loadReviewsThunk(productId))
   }, [])

   if(!Object.values(allReviews).length) return null;

   const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
         message: review,
         title,
         rating: stars,
         userId: currUser.id,
         productId: chosenReview.productId
      }

      setErrors([])
      // if(review.length > 255 && !title.length){
      //    setErrors(['Message exceeds max character count: 255.', 'Please enter a title.'])
      //    return
      // } else if(review.length > 255 && title.length){
      //    setErrors(['Message exceeds max character count: 255.'])
      //    return
      // } else if(review.length === 0 && title.length === 0){
      //    setErrors(['Please enter a title.', 'Please enter a message.'])
      //    return
      // } else if(review.length <= 255 && title.length === 0){
      //    setErrors(['Please enter a title.'])
      //    return
      // } else if(title.length && review.length === 0){
      //    setErrors(['Please enter a message.'])
      //    return
      // } else if(title.length > 50 && review.length > 255){
      //    setErrors(['Title exceeds max character count: 50.', 'Message exceeds max character count: 255.'])
      //    return
      // }

      let checkErrors = [];
      if(review.length > 255) checkErrors.push('message : Message character limit is 255 characters.');
      else if(review.length === 0) checkErrors.push('message : Please enter a message.');

      if(title.length === 0) checkErrors.push('title : Please enter a title.');
      else if(title.length > 50) checkErrors.push('title : Title character limit is 50 characters.')
      setErrors(checkErrors)
      if(checkErrors.length) return;


      let updatedReview = await dispatch(updateReviewThunk(payload, reviewId))
      if (updatedReview.errors){
         setErrors(updatedReview.errors)
         return
      }
      if (updatedReview){
         history.push(`/products/${chosenReview.productId}`)
      }
   }


   return (
      <form className='review-form-wrapper' onSubmit={handleSubmit}>
         <div className="review-form-header">
            <h1>EDIT YOUR REVIEW</h1>
         </div>

         <div>
            <ErrorDisplay id={'login-error-list'} errors={errors}/>
         </div>

            <div className='star-radio-buttons'>
            {[...Array(5)].map((star,i) => {
               const ratingValue = i + 1

               return (
                  <label>
                     <input
                        type='radio'
                        name='rating'
                        value={ratingValue}
                        onClick={() => setStars(ratingValue)}
                     />
                     <AiFillStar
                        className="star"
                        color={ ratingValue <= (hover||stars) ? "#f16522":"#e4e5e9"}
                        size={45}
                        onMouseEnter={()=>setHover(ratingValue)}
                        onMouseLeave={()=>setHover(null)}
                      />
                  </label>
               )

            })}
         </div>

         <div className='title-input'>
            <input
               id='review-title'
               className='login-input'
               type='text'
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder='Review Title'
            />
         </div>

         <label>
            <textarea
            id='review-message'
            type='text'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            // placeholder={`What did you think about ${chosenProduct?.name}`}
            className='review-textarea login-input'
            />
            <div className='word-counter'>{255 - review?.length > 0 ? 255 - review?.length : 0} characters remaining</div>
         </label>

         <button className='review-button' type="submit">Submit Review</button>
      </form>
   )
}

export default UpdateReviewForm;
