import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { loadProductsThunk } from "../../store/product";
import { loadReviewsThunk, updateReviewThunk } from "../../store/review";


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
      if(review.length > 255 && !title.length){
         setErrors(['Exceeds max character count: 255.', 'Please enter a title.'])
         return
      } else if(review.length > 255 && title.length){
         setErrors(['Exceeds max character count: 255.'])
         return
      } else if(review.length < 255 && !title.length){
         setErrors(['Please enter a title.'])
         return
      }

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
         <ul className='errors-list'>
            {errors.map((error, idx) => <li key={idx}><i className='fa fa-exclamation-circle' />  {error}</li>)}
         </ul>

         {/* <div className="star-radio-buttons">
         <label>
            Select a Rating
            <label>
            <input
               type="radio"
               value="1"
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
               checked={stars === 1 ? true: false}
            />
            ★
            </label>

            <label>
            <input
               type="radio"
               value="2"
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
               checked={stars === 2 ? true: false}
            />
            ★★
            </label>

            <label>
            <input
               type="radio"
               value="3"
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
               checked={stars === 3 ? true: false}
            />
            ★★★
            </label>

            <label>
            <input
               type="radio"
               value="4"
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
               checked={stars === 4 ? true: false}
            />
            ★★★★
            </label>

            <label>
            <input
               type="radio"
               value="5"
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
               checked={stars === 5 ? true: false}
            />
            ★★★★★
            </label>
         </label>
         </div>

         <div className='title-input'>
            <input
               type='text'
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder='Review Title'
            />
         </div> */}

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

         <label>
            <textarea
            type='text'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            // placeholder={`What did you think about ${chosenProduct.name}`}
            className='review-textarea'
            />
            <div className='word-counter'>{255 - review?.length > 0 ? 255 - review?.length : 0} characters remaining</div>
         </label>

         <button className='review-button' type="submit">Submit Review</button>
      </form>
   )
}

export default UpdateReviewForm;
