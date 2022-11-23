import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { loadProductsThunk } from "../../store/product";
import { addToCart } from "../../store/cart";

const CupBox = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const allProducts = useSelector(state => Object.values(state?.product?.allProducts))
   const currUser = useSelector(state => state?.session?.user)
   const [totalCount, setTotalCount] = useState(0)

   const [chickenCount, setChickenCount] = useState(0)
   const [misoCount, setMisoCount] = useState(0)
   const [tonkCount, setTonkCount] = useState(0)

   useEffect(() => {
      dispatch(loadProductsThunk())
   }, [dispatch])

   if(!allProducts.length) return null;

   const allCups = allProducts?.filter(product => product.name.includes('Cups'))

   const handleMinus = (index) => {
      setTotalCount(totalCount - 1)
      switch(index){
         case 0:
            setChickenCount(chickenCount - 1)
            break;
         case 1:
            setMisoCount(misoCount - 1)
            break;
         case 2:
            setTonkCount(tonkCount - 1)
      }
   }

   const handlePlus = (index) => {
      setTotalCount(totalCount + 1)
      switch(index){
         case 0:
            setChickenCount(chickenCount + 1)
            break;
         case 1:
            setMisoCount(misoCount + 1)
            break;
         case 2:
            setTonkCount(tonkCount + 1)
      }
   }

   const handleAddToCart = () => {
      // Build payload
      let contentsArr = [];
      if(chickenCount > 0){
         contentsArr.push(`${chickenCount}X CHICKEN RAMEN CUPS`)
      }
      if(misoCount > 0){
         contentsArr.push(`${misoCount}X MISO RAMEN CUPS`)
      }
      if(tonkCount > 0){
         contentsArr.push(`${tonkCount}X SPICY TONKOTSU RAMEN CUPS`)
      }

      const payload = {
         name: 'Ramen Cup Box',
         size: 'SIZE: 6 Cups',
         price: 18.00,
         contents: contentsArr,
         count: 1
      }

      // Check Local Storage
      if(!localStorage.getItem('cart')){
         payload['id'] = 1;
         localStorage.setItem('cart', JSON.stringify([payload]))
         dispatch(addToCart(payload))
      } else {
         const currentCart = JSON.parse(localStorage.getItem('cart'));
         if(JSON.parse(localStorage.getItem('cart')).length === 0){
            payload['id'] = 1
         } else {
            payload['id'] = currentCart.map(item => item.id)[currentCart.length - 1] + 1
         }

         currentCart.push(payload)
         localStorage.setItem('cart', JSON.stringify(currentCart))
         dispatch(addToCart(payload))
      }

      history.push('/cart')
   }

   let content;
   totalCount !== 6 ?
   content = (<div>ADD {6 - totalCount} TO CONTINUE</div>) :
   content = (<button onClick={() => handleAddToCart()}>ADD TO CART</button>)

   return (
      <div className='bowl-box-wrapper'>
         <div className='top'>
            <div className='left-top'>
               <h2>RAMEN CUP BOX</h2>
               <h3>SIZE 6 Cups</h3>
            </div>

            <div className='right-top'>
               <h2>$18.00</h2>
               {content}
               {/* <div>ADD {6 - totalCount} TO CONTINUE</div> */}
            </div>

         </div>

         <div className='progress-bar'>Progress Bar Here</div>

         <ul className='bowls-list'>
            <li>
               <img src={allCups[0].images[0].imageUrl}/>
               {allCups[0].name}
               <div className='counter-wrapper'>
                     <button disabled={chickenCount === 0} onClick={() => handleMinus(0)}>-</button>
                     <div>{chickenCount}</div>
                     <button disabled={totalCount === 6} onClick={() => handlePlus(0)}>+</button>
               </div>
            </li>

            <li>
               <img src={allCups[1].images[0].imageUrl}/>
               {allCups[1].name}
               <div className='counter-wrapper'>
                     <button disabled={misoCount === 0} onClick={() => handleMinus(1)}>-</button>
                     <div>{misoCount}</div>
                     <button disabled={totalCount === 6} onClick={() => handlePlus(1)}>+</button>
               </div>
            </li>

            <li>
               <img src={allCups[2].images[0].imageUrl}/>
               {allCups[2].name}
               <div className='counter-wrapper'>
                     <button disabled={tonkCount === 0} onClick={() => handleMinus(2)}>-</button>
                     <div>{tonkCount}</div>
                     <button disabled={totalCount === 6} onClick={() => handlePlus(2)}>+</button>
               </div>
            </li>
         </ul>
      </div>
   )
}

export default CupBox;
