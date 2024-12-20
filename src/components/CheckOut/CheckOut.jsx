import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase-config";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: "", email: "", confirmEmail: "" });
  const [orderId, setOrderId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      alert("Los correos no coinciden.");
      return;
    }

    const order = {
      buyer: { name: formData.name, email: formData.email },
      items: cart.map(({ id, Nombre, Precio, quantity }) => ({
        id,
        name: Nombre,
        price: Precio,
        quantity,
      })),
      total: cart.reduce((acc, item) => acc + item.Precio * item.quantity, 0),
      date: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al generar la orden:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {orderId ? (
        <p className="text-green-500 text-xl">
          ¡Gracias por tu compra! Tu ID de orden es: {orderId}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="confirmEmail"
            placeholder="Confirmar Correo"
            value={formData.confirmEmail}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Finalizar Compra
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
