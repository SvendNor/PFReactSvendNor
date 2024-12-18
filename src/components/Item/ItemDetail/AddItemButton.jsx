import React from "react";
import { useCart } from "../../../context/CartContext";

const AddItemButton = ({ item, quantity }) => {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart({ ...item, quantity })}
      className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
    >
      Agregar al carrito
    </button>
  );
};

export default AddItemButton;
