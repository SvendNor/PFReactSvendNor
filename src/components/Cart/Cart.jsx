import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="p-4 border-b">
              <h3 className="text-lg font-bold">{item.Nombre || item.Droga}</h3>
              <p>
                <strong>Cantidad:</strong> {item.quantity}
              </p>
              <p>
                <strong>Precio Total:</strong> ${item.Precio * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 mt-2"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Vaciar Carrito
          </button>
          <Link
            to="/checkout"
            className="mt-4 bg-primary text-white px-4 py-2 rounded inline-block"
          >
            Finalizar Compra
          </Link>
        </div>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default Cart;
