import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { loadProductsThunk } from "../../store/product";
import { addToCart } from "../../store/cart";
import './bowlbox.css'

const BowlBox = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const allProducts = useSelector(state => Object.values(state?.product?.allProducts))
   const currUser = useSelector(state => state?.session?.user)
   const [totalCount, setTotalCount] = useState(0)

   const [chickenCount, setChickenCount] = useState(0)
   const [beefCount, setBeefCount] = useState(0)
   const [vegetableCount, setVegetableCount] = useState(0)
   const [mushroomCount, setMushroomCount] = useState(0)
   const [laksaCount, setLaksaCount] = useState(0)
   //Use useStates for all counters or do localStorage?

   useEffect(() => {
      dispatch(loadProductsThunk())
   }, [dispatch])

   if(!allProducts.length) return null;

   const allBowls = allProducts?.filter(product => product.name.includes('Bowls'))

   const handleMinus = (index) => {
      setTotalCount(totalCount - 1)
      switch(index){
         case 0:
            setChickenCount(chickenCount - 1)
            break;
         case 1:
            setBeefCount(beefCount - 1)
            break;
         case 2:
            setVegetableCount(vegetableCount - 1)
            break;
         case 3:
            setMushroomCount(mushroomCount - 1)
            break;
         case 4:
            setLaksaCount(laksaCount - 1)
      }
   }

   const handlePlus = (index) => {
      setTotalCount(totalCount + 1)
      switch(index){
         case 0:
            setChickenCount(chickenCount + 1)
            break;
         case 1:
            setBeefCount(beefCount + 1)
            break;
         case 2:
            setVegetableCount(vegetableCount + 1)
            break;
         case 3:
            setMushroomCount(mushroomCount + 1)
            break;
         case 4:
            setLaksaCount(laksaCount + 1)
      }
   }

   const handleAddToCart = () => {
      // Build payload
      let contentsArr = [];
      if(chickenCount > 0){
         contentsArr.push(`${chickenCount}X CHICKEN PHO BOWLS`)
      }
      if(beefCount > 0){
         contentsArr.push(`${beefCount}X BEEF PHO BOWLS`)
      }
      if(vegetableCount > 0){
         contentsArr.push(`${vegetableCount}X VEGETABLE PHO BOWLS`)
      }
      if(mushroomCount > 0){
         contentsArr.push(`${mushroomCount}X MUSHROOM PHO BOWLS`)
      }
      if(laksaCount > 0){
         contentsArr.push(`${laksaCount}X LAKSA PHO BOWLS`)
      }

      const payload = {
         name: 'Soup Bowl Box',
         size: 'SIZE: 6 Bowls',
         price: 19.80,
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
               <h2>SOUP BOWL BOX</h2>
               <h3>SIZE 6 Bowls</h3>
            </div>

            <div className='right-top'>
               <h2>$19.80</h2>
               {content}
               {/* <div>ADD {6 - totalCount} TO CONTINUE</div> */}
            </div>

         </div>

         <div className='progress-bar'>Progress Bar Here</div>

         <ul className='bowls-list'>
            <li>
               <img src={allBowls[0].images[0].imageUrl}/>
               {allBowls[0].name}
               <div className='counter-wrapper'>
                     <button disabled={chickenCount === 0} onClick={() => handleMinus(0)}>-</button>
                     <div>{chickenCount}</div>
                     <button disabled={totalCount === 6} onClick={() => handlePlus(0)}>+</button>
               </div>
            </li>

            <li>
               <img src={allBowls[1].images[0].imageUrl}/>
               {allBowls[1].name}
               <div className='counter-wrapper'>
                     <button disabled={beefCount === 0} onClick={() => handleMinus(1)}>-</button>
                     <div>{beefCount}</div>
                     <button disabled={totalCount === 6} onClick={() => handlePlus(1)}>+</button>
               </div>
            </li>

            <li>
               <img src={allBowls[2].images[0].imageUrl}/>
               {allBowls[2].name}
               <div className='counter-wrapper'>
                     <button disabled={vegetableCount === 0} onClick={() => handleMinus(2)}>-</button>
                     <div>{vegetableCount}</div>
                     <button disabled={totalCount === 6} onClick={() => handlePlus(2)}>+</button>
               </div>
            </li>

            <li>
               <img src={allBowls[3].images[0].imageUrl}/>
               {allBowls[3].name}
               <div className='counter-wrapper'>
                     <button disabled={mushroomCount === 0} onClick={() => handleMinus(3)}>-</button>
                     <div>{mushroomCount}</div>
                     <button disabled={totalCount === 6} onClick={() => handlePlus(3)}>+</button>
               </div>
            </li>

            <li>
               <img src={allBowls[4].images[0].imageUrl}/>
               {allBowls[4].name}
               <div className='counter-wrapper'>
                     <button disabled={laksaCount === 0} onClick={() => handleMinus(4)}>-</button>
                     <div>{laksaCount}</div>
                     <button disabled={totalCount === 6} onClick={() => handlePlus(4)}>+</button>
               </div>
            </li>
         </ul>
      </div>
   )
}

export default BowlBox;
