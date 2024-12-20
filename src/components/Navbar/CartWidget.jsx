import React from "react";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = ({ onShowCart }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <button onClick={onShowCart} className="relative flex items-center">
      <FaShoppingCart className="text-2xl text-white" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartWidget;
