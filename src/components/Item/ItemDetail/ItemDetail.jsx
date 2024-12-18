import React, { useState } from "react";
import ItemQuantitySelector from "./ItemQuantitySelector";
import Description from "./Description";
import AddItemButton from "./AddItemButton";

const ItemDetail = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-gray-600">Precio: ${item.price}</p>
      <Description text="Este es un producto de ejemplo." />
      <ItemQuantitySelector onQuantityChange={handleQuantityChange} />
      <AddItemButton item={item} quantity={quantity} />
    </div>
  );
};

export default ItemDetail;
