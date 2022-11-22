//CONSTANTS
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

//ACTIONS
const loadReviews = (reviews) => ({
   type: LOAD_REVIEWS,
   reviews: reviews.reviews
})

const updateReview = (review) => ({
   type: UPDATE_REVIEW,
   review: review.review
})

const deleteReview = (reviewId) => ({
   type: DELETE_REVIEW,
   reviewId
})

//THUNKS
export const loadReviewsThunk = (productId) => async (dispatch) => {
   const response = await fetch(`/api/products/${productId}/reviews`)

   if(response.ok){
      const data = await response.json();
      dispatch(loadReviews(data))
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const createReviewThunk = (payload, productId) => async (dispatch) => {
   const response = await fetch(`/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
   })

   if(response.ok){
      const data = await response.json();
      dispatch(updateReview(data))
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const updateReviewThunk = (payload, reviewId) => async (dispatch) => {
   const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
   })

   if(response.ok){
      const data = await response.json();
      dispatch(updateReview(data))
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
   const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
   })

   if(response.ok){
      const data = await response.json();
      dispatch(deleteReview(reviewId))
      return data;
    }else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

//REDUCER
const initialState = {allReviews: {}}
export default function reviewReducer(state = initialState, action){
   switch(action.type){
      case LOAD_REVIEWS:
         const reviews = normalizeArray(action.reviews)
         return {...state, allReviews:{...reviews}}
      case UPDATE_REVIEW:
         if (!state[action.review.id]) {
            const newState = {
              ...state, allReviews:{...state.allReviews,
              [action.review.id]: action.review}
            };
            return newState;
          }
          return {
            ...state, allReviews:{...state.allReviews,
            [action.review.id]: {
              ...state[action.review.id],
              ...action.review}
            }
          };
      case DELETE_REVIEW:
         const deleteState = {...state, allReviews: {...state.allReviews}}
         delete deleteState.allReviews[action.reviewId]
         return deleteState
      default:
         return state;
   }
}

//HELPER
function normalizeArray(dataArray){
   if (!dataArray instanceof Array) throw new Error('Normalize problem: data invalid')
   const obj = {}
   dataArray.forEach(element => {
     obj[element.id] = element
   })
   return obj
 }
