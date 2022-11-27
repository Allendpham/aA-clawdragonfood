import LogoutButton from "../auth/LogoutButton";

const AccountPage = () => {
   return (
      <div className='account-page-wrapper'>
         <div>
            <h1>My Account</h1>
            <LogoutButton />
         </div>


         <div>
            <div className='order-history-wrapper'>
               <h2>ORDER HISTORY</h2>
            </div>
            <div>
               <h2>ACCOUNT DETAILS</h2>
            </div>
         </div>
      </div>
   )
}

export default AccountPage;
