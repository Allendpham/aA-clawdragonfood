//CONSTANTS
const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS'

//ACTIONS
const loadProducts = (products) => ({
   type: LOAD_PRODUCTS,
   products: products.products
})

//THUNKS
export const loadProductsThunk = () => async (dispatch) => {
   const response = await fetch('/api/products/all')

   if(response.ok){
      const data = await response.json();
      dispatch(loadProducts(data))
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

//REDUCER
const initialState = {allProducts: {}}
export default function productReducer(state = initialState, action){
   switch(action.type){
      case LOAD_PRODUCTS:
         const products = normalizeArray(action.products)
         return {...state, allProducts:{...products}}
      default:
         return state;
   }
}

//HELPERS
function normalizeArray(dataArray){
   if (!dataArray instanceof Array) throw new Error('Normalize problem: data invalid')
   const obj = {}
   dataArray.forEach(element => {
     obj[element.id] = element
   })
   return obj
 }
