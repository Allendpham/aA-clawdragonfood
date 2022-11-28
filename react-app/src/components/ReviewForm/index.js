import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createReviewThunk } from "../../store/review";
import { loadProductsThunk } from "../../store/product";

const ReviewForm = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const allProducts = useSelector(state => state.product.allProducts)
   const currUser = useSelector(state => state.session.user)
   const { productId } = useParams()
   const chosenProduct = allProducts[productId]

   const [review, setReview] = useState("");
   const [title, setTitle] = useState("");
   const [stars, setStars] = useState(1);
   const [errors, setErrors] = useState([]);

   useEffect(() => {
      dispatch(loadProductsThunk())
   }, [dispatch])

   if(!Object.values(allProducts).length) return null;
   if(!chosenProduct) return null;

   const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
         message: review,
         title,
         rating: stars,
         userId: currUser.id,
         productId: chosenProduct?.id
      }

      setErrors([])
      if(review.length > 255 && !title){
         setErrors(['Exceeds max character count: 255.', 'Please enter a title.'])
         return
      } else if(review.length > 255 && title){
         setErrors(['Exceeds max character count: 255.'])
         return
      } else if(review.length < 255 && !title.length){
         setErrors(['Please enter a title.'])
         return
      }

      let createdReview = await dispatch(createReviewThunk(payload, productId))
      if (createdReview.errors){
         setErrors(createdReview.errors)
         return
      }
      if (createdReview){
         history.push(`/products/${productId}`)
      }
   }


   return (
      <form className='review-form-wrapper' onSubmit={handleSubmit}>
         {/* <div>Hello from Review Form for {chosenProduct?.name}</div> */}
         <div className="review-form-header">
            <h3>Leave a Review!</h3>
         </div>
         <ul className='errors-list'>
            {errors?.map((error, idx) => <li key={idx}><i className='fa fa-exclamation-circle' />  {error}</li>)}
         </ul>

         <div className="star-radio-buttons">
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
         </div>

         <label>
            <textarea
            type='text'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={`What did you think about ${chosenProduct?.name}`}
            className='review-textarea'
            />
            <div className='word-counter'>{255 - review.length > 0 ? 255 - review.length : 0} characters remaining</div>
         </label>

         <button type="submit">Submit Review</button>
      </form>
   )
}

export default ReviewForm;
