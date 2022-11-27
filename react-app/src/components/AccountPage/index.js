import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOrdersThunk } from "../../store/order";
import LogoutButton from "../auth/LogoutButton";
import OrderItem from "../OrderItem";

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
         <div>
            <h1>My Account</h1>
            <LogoutButton />
         </div>


         <div>
            <div className='order-history-wrapper'>
               <h2>ORDER HISTORY</h2>
               <ul>
                  {orders?.map((order) => (
                     <OrderItem key={order.id} order={order} />
                  ))}
               </ul>
            </div>
            <div>
               <h2>ACCOUNT DETAILS</h2>
               <ul>
                  <li>{currUser?.email}</li>
                  <li>{currUser?.firstName} {currUser?.lastName}</li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default AccountPage;
