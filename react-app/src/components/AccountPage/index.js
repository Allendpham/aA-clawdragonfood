import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOrdersThunk } from "../../store/order";
import LogoutButton from "../auth/LogoutButton";
import OrderItem from "../OrderItem";
import './account.css'

const AccountPage = () => {
   const dispatch = useDispatch()
   const orders = useSelector(state => Object.values(state?.order?.allOrders)).reverse()
   const currUser = useSelector(state => state?.session?.user)
   // Reverse order of orders ?? need to orderBy createdAt and display orders accordingly

   useEffect(() => {
      dispatch(loadOrdersThunk())
   }, [dispatch])

   if(!orders) return null;

   return (
      <div className='account-page-wrapper'>
         <div className='top-account'>
            <h1>My Account</h1>
            <LogoutButton />
         </div>


         <div className='bottom-account'>
            <div className='order-history-wrapper'>
               <h2>ORDER HISTORY</h2>
               {!orders.length && (<div className='no-orders'>You haven't placed any orders yet.</div>)}
               <ul className='order-history'>
                  {orders?.map((order) => (
                     <OrderItem key={order.id} order={order} />
                  ))}
               </ul>
            </div>
            <div className='account-right'>
               <h2>ACCOUNT DETAILS</h2>
               <ul className='user-info'>
                  <li>{currUser?.firstName} {currUser?.lastName}</li>
                  <li>{currUser?.email}</li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default AccountPage;
