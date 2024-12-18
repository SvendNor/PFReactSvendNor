import React from "react";
import { useCart } from "../../context/CartContext";

const CheckOut = () => {
  const { cart, total } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Resumen de Compra</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between">
            {item.name} x {item.quantity} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p className="font-semibold mt-4">Total: ${total}</p>
    </div>
  );
};

export default CheckOut;
