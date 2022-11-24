import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updatePrice } from '../../store/cart';

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

   return (
      <tr>
         <td>
            <div>{item?.name}</div>
            <div>{item?.size}</div>
            <div>{item?.contents}</div>
            <button onClick={() => handleRemove()}>Remove</button>
         </td>

         <td>{item.price}</td>
         <td>
            {/* Place error validation here to check input */}
            <input
               type="number"
               value={count}
               onChange={(e) => handleCount(e.target.value)}
               onBlur={(e) => e.target.value < 1 ? handleRemove() : handleAdd()}
               min="0"/>
          </td>

         <td>{item.price * count}</td>
      </tr>
   );
}

export default CartItem;
