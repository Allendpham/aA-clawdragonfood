import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createReviewThunk } from "../../store/review";
import { loadProductsThunk } from "../../store/product";
import { AiFillStar } from "react-icons/ai";
import ErrorDisplay from "../ErrorDisplay";
import '../auth/form.css'

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
   const [hover, setHover] = useState(null);

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

      // setErrors([])
      // if(review.length > 255 && !title){
      //    setErrors(['Exceeds max character count: 255.', 'Please enter a title.'])
      //    return
      // } else if(review.length > 255 && title){
      //    setErrors(['Exceeds max character count: 255.'])
      //    return
      // } else if(review.length < 255 && !title.length){
      //    setErrors(['Please enter a title.'])
      //    return
      // }

      let createdReview = await dispatch(createReviewThunk(payload, productId))
      if (createdReview.errors){
         setErrors(createdReview.errors)
         return
      }
      if (createdReview){
         history.push(`/products/${productId}`)
      }
   }

   // const handleStarClick = (num) => {
   //    let element1 = document.getElementsByClassName('ones')[0]
   //    let element2 = document.getElementsByClassName('twos')[0]
   //    let element3 = document.getElementsByClassName('threes')[0]
   //    let element4 = document.getElementsByClassName('fours')[0]
   //    let element5 = document.getElementsByClassName('fives')[0]

   //    element1.classList.remove('gold')
   //    element2.classList.remove('gold')
   //    element3.classList.remove('gold')
   //    element4.classList.remove('gold')
   //    element5.classList.remove('gold')
   //    // console.log(typeof num)

   //    switch(num){
   //       case 1:
   //          element1.classList.add('gold')
   //       case 2:
   //          element1.classList.add('gold')
   //          element2.classList.add('gold')
   //    }
   // }

// on mouse exit, clear the stars
   return (
      <form className='review-form-wrapper' onSubmit={handleSubmit}>
         {/* <div>Hello from Review Form for {chosenProduct?.name}</div> */}
         <div className="review-form-header">
            <h1>LEAVE A REVIEW</h1>
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
            placeholder={`What did you think about ${chosenProduct?.name}?`}
            className='review-textarea login-input'
            />
            <div className='word-counter'>{255 - review.length > 0 ? 255 - review.length : 0} characters remaining</div>
         </label>

         <button className='review-button' type="submit">Submit Review</button>
      </form>
   )
}

export default ReviewForm;
