const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const INCREMENT_ITEM_COUNT = 'cart/INCREMENT_ITEM_COUNT';
const DECREMENT_ITEM_COUNT = 'cart/DECREMENT_ITEM_COUNT';
const INPUT_ITEM_COUNT = 'cart/INPUT_ITEM_COUNT';
const PURCHASE_CART = 'cart/PURCHASE_CART';

export const addToCart = (item) => {
   return {
      type: ADD_TO_CART,
      item
   }
}

export const removeFromCart = (item) => {
   return {
      type: REMOVE_FROM_CART,
      item
   }
}

export const incrementItemCount = (produceId) => {
   return {
      type: INCREMENT_ITEM_COUNT,
      produceId
   }
}

export const decrementItemCount = (produceId) => {
   return {
      type: DECREMENT_ITEM_COUNT,
      produceId
   }
}

export const inputItemCount = (produceId, count) => {
   return {
      type: INPUT_ITEM_COUNT,
      produceId,
      count
   }
}

export const purchaseCart = () => {
   return {
      type: PURCHASE_CART
   }
}

//ONLY really need react to load cart and delete items??
export default function cartReducer(state={}, action){
   switch(action.type){
      case ADD_TO_CART:
         const newState = {
            ...state,
         };
         newState[action.item.id] = { ...action.item };
         return newState;

      case REMOVE_FROM_CART:
         const removedState = {...state};
         delete removedState[action.item.id]
         return removedState;

      case INCREMENT_ITEM_COUNT:
         const incState = {...state};
         incState[action.produceId].count++;
         return incState;

      case DECREMENT_ITEM_COUNT:
         const decState = {...state};
         decState[action.produceId].count--;
         return decState;

      case INPUT_ITEM_COUNT:
         const inputState = {...state}
         inputState[action.produceId].count = action.count;
         return inputState;

      case PURCHASE_CART:
         return {};

      default:
         return state;
   }
}
