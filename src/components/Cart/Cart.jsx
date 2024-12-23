import React from "react";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="p-4 border-b mb-4">
              <h3 className="text-lg font-bold">{item.nombre}</h3>
              {item.droga && (
                <p>
                  <strong>Droga:</strong> {item.droga}
                </p>
              )}
              {item.marca && (
                <p>
                  <strong>Marca:</strong> {item.marca}
                </p>
              )}
              <p>
                <strong>Precio Unitario:</strong> ${item.precio}
              </p>
              <p>
                <strong>Cantidad:</strong> {item.quantity}
              </p>
              <p>
                <strong>Subtotal:</strong> ${item.precio * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 mt-2"
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="text-right font-bold text-lg mt-4">
            <p>Total: ${calculateTotal()}</p>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Vaciar Carrito
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded">
              Finalizar Compra
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
