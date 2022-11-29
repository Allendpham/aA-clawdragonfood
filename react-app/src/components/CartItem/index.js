import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updatePrice } from '../../store/cart';
import './cartItem.css'

const CartItem = ({item, index}) => {
   const dispatch = useDispatch();
   const [count, setCount] = useState(item.count);
   const [errors, setErrors] = useState([])

   useEffect(() => {
      setCount(item.count);
    }, [item.count]);


   const handleRemove = () => {
      let cartItems = JSON.parse(localStorage.getItem('cart'))
      cartItems.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(cartItems))
      dispatch(removeFromCart(item))

      let calculation = 0;
      cartItems?.forEach(item => {
         calculation += (item.count * item.price)
      })
      dispatch(updatePrice(calculation))

      tempAlert();
   }

   const handleAdd = () => {
      let cartItems = JSON.parse(localStorage.getItem('cart'))
      cartItems[index].count = Number(count)
      localStorage.setItem('cart', JSON.stringify(cartItems))

      let calculation = 0;
      cartItems?.forEach(item => {
         calculation += (item.count * item.price)
      })
      dispatch(updatePrice(calculation))
   }

   const handleCount = (num) => {
      if(num < 0 || num.includes('-')) {
         setCount(0)
      } else setCount(num)
   }

   const tempAlert = () => {
      const el = document.querySelector('.removing-cart-item')
      let alert = document.createElement("div");
      alert.innerText = `Removed (${item?.count}) ${item?.name} from your cart.`
      alert.style.color = 'white';
      setTimeout(()=>{
         el.removeChild(alert)
      }, 3000)
      el.appendChild(alert)
   }

   let imageUrl;
   if(item?.name?.includes('Soup')){
      imageUrl='https://i.imgur.com/OQx4fzX.png'
   } else if(item?.name?.includes('Ramen')){
      imageUrl='https://i.imgur.com/2dzGnBD.png'
   } else if(item?.name?.includes('Garlic')){
      imageUrl='https://i.imgur.com/8KSeQfL.png'
   } else imageUrl='https://i.imgur.com/hffph36.png'

   return (
      <tr className='table-item'>
         <td className='table-data'>

            <span><img className='table-image' src={imageUrl}/></span>

            <span>
               <div className='table-name'>{item?.name}</div>
               {item?.name.includes('Box') && (<>
                  <div className='table-size'>{item?.size}</div>
                  <div className='table-contents'>CONTENTS: {item?.contents}</div>
               </>)}
               <button onClick={() => handleRemove()}>Remove</button>
            </span>
         </td>

         <td className='table-price'>${(item.price).toFixed(2)}</td>
         <td className='input-wrapper'>
            {/* Place error validation here to check input */}
            <input
               className='count-input'
               type="number"
               value={count}
               onChange={(e) => handleCount(e.target.value)}
               onBlur={(e) => e.target.value < 1 ? handleRemove() : handleAdd()}
               min="0"/>
          </td>

         <td className='table-price'>${(item.price * count).toFixed(2)}</td>
      </tr>
   );
}

export default CartItem;
