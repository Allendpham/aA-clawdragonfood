import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
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
               <li key={bowl?.id}>
               <Link className='product-name' to={`/products/${bowl?.id}`}>
                  <div className='favorite-card'>
                     <img className='product-img' src={bowl?.images[0].imageUrl}/>
                     <div >{bowl?.name}</div>
                  </div>
               </Link>
               </li>
            ))}
            {cups?.map(cup => (
               <li key={cup?.id}>
               <Link className='product-name' to={`/products/${cup?.id}`}>
                  <div className='favorite-card'>
                     <img className='product-img' src={cup?.images[0].imageUrl}/>
                     <div >{cup?.name}</div>
                  </div>
               </Link>
               </li>
            ))}
         </ul>
         <p>Snapdragon’s instant pho and instant ramen bring Asian cravings straight to your mouth. Our bold flavors are dairy-free and antibiotic-free, so you can slurp without guilt. We’ve got vegan and gluten-free noodles, too.</p>
         <NavLink className='shop-food-link' to='/collections/all' exact={true} activeClassName='active'>
            SHOP FOOD
          </NavLink>
      </div>
   </div>)
}

export default HomePage;
