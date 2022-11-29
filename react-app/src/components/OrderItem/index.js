

const OrderItem = ({order}) => {

   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   const createdAt = new Date(order?.createdAt);
   const month = months[createdAt.getMonth()];
   const year = createdAt.getFullYear();
   const day = createdAt.getDate();
   let content;

   //Create Order Contents
   const checkItem = (item) => {

      if(item?.contents.includes('BOWLS')){
         return (
            <li><img className='table-image' src={'https://i.imgur.com/OQx4fzX.png'}/><div>Soup Bowl Box: {item?.contents} <div>Quantity: {item?.quantity}</div></div></li>
         )
      } else if(item?.contents.includes('CUPS')){
         return (
            <li><img className='table-image' src={'https://i.imgur.com/2dzGnBD.png'}/><div>Ramen Cup Box: {item?.contents} <div>Quantity: {item?.quantity}</div></div></li>
         )
      } else if(item?.contents.includes('Garlic')){
         return (
            <li><img className='table-image' src={'https://i.imgur.com/8KSeQfL.png'}/><div>{item.contents} <div>Quantity: {item?.quantity}</div></div></li>
         )
      } else{
         return (
            <li><img className='table-image' src={'https://i.imgur.com/hffph36.png'}/><div>{item.contents} <div>Quantity: {item?.quantity}</div></div></li>
         )
      }

   }

   return (
      <li className='order-history-item'>
         <span className='title'>Order Date:</span>  {month} {day}, {year}
         <div className='title'>Items:</div>
         <ul className='order-history-list'>
            {order?.items.map(item => (
               checkItem(item)
            ))}
         </ul>
         <div>
            <span className='title'>Total Price:</span> ${order?.totalPrice.toFixed(2)}
         </div>
      </li>
   )
}

export default OrderItem;
