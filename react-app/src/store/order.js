//CONSTANTS
const LOAD_ORDERS = 'orders/LOAD_ORDERS';
const ADD_ORDER = 'orders/ADD_ORDERS';

//ACTION CREATORS
const loadOrders = (orders) => ({
   type: LOAD_ORDERS,
   orders: orders.orders
})

const addOrder = (order) => ({
   type: ADD_ORDER,
   order: order.order
})

//THUNKS
export const loadOrdersThunk = () => async (dispatch) => {
   const response = await fetch('/api/orders/current')

   if(response.ok){
      const data = await response.json();
      dispatch(loadOrders(data))
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

export const addOrderThunk = (payload) => async (dispatch) => {
   const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
   })

   if(response.ok){
      const data = await response.json();
      dispatch(addOrder(data))
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

//REDUCER
const initialState = {allOrders: {}}
export default function orderReducer(state=initialState, action){
   switch(action.type){
      case LOAD_ORDERS:
         const orders = normalizeArray(action.orders)
         return {...state,allOrders:{...orders}}

      case ADD_ORDER:
         const newState = {...state, allOrders: {...state.allOrders}}
         newState.allOrders[action.order.id] = action.order
         return newState

      default:
         return state
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
