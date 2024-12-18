import React, { useState } from "react";

const ItemQuantitySelector = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    onQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    onQuantityChange(quantity > 1 ? quantity - 1 : 1);
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleDecrease} className="bg-gray-200 p-2 rounded">-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrease} className="bg-gray-200 p-2 rounded">+</button>
    </div>
  );
};

export default ItemQuantitySelector;
