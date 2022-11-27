

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
            <li>Soup Bowl Box: {item?.contents} <div>Quantity: {item?.quantity}</div></li>
         )
      } else if(item?.contents.includes('CUPS')){
         return (
            <li>Ramen Cup Box: {item?.contents} <div>Quantity: {item?.quantity}</div></li>
         )
      } else {
         return (
            <li>{item.contents} <div>Quantity: {item?.quantity}</div></li>
         )
      }

   }

   return (
      <li>
         Order Date:  {month} {day}, {year}
         <div>Items</div>
         <ul>
            {order?.items.map(item => (
               checkItem(item)
            ))}
         </ul>
         <div>
            Total Price: ${order?.totalPrice}
         </div>
      </li>
   )
}

export default OrderItem;
