import React from 'react';

const Brief = ({ orderDetails }) => {
  return (
    <div>
      <ul>
        {orderDetails.items.map((item) => (
          <li key={item.id} className="flex justify-between">
            {item.name} x {item.quantity} - ${item.price}
          </li>
        ))}
      </ul>
      <p className="font-semibold mt-4">Total: ${orderDetails.total}</p>
    </div>
  );
};

export default Brief;