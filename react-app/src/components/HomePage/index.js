import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProductsThunk } from "../../store/product";
import './homepage.css'

const HomePage = () => {
   const dispatch = useDispatch();
   const allProducts = useSelector(state => Object.values(state?.product?.allProducts))

   const bowls = allProducts.slice(0, 4);
   const cups = allProducts.slice(6, 8);

   useEffect(() => {
      dispatch(loadProductsThunk())
   }, [dispatch])

   return (<div className='home-page-wrapper'>
      <div className='video-wrapper'>
         <h2 className='video-heading'><div>Deliciously Bold</div> Asian Eats</h2>

         <video muted autoPlay loop>
            <source src='https://i.imgur.com/iwFdeft.mp4' type='video/mp4' />
         </video>
      </div>
      <div className='slurpable-favorites'>
         <h2>Slurpable Favorites</h2>
         <ul>
            {bowls?.map(bowl => (
               <li key={bowl?.id}>{bowl?.name}</li>
            ))}
            {cups?.map(cup => (
               <li key={cup?.id} >{cup?.name}</li>
            ))}
         </ul>
      </div>
   </div>)
}

export default HomePage;
