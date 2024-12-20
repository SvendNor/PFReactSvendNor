import React, { useState } from "react";

const ItemList = ({ items, onAddToCart }) => {
  const [quantities, setQuantities] = useState({}); // Almacena cantidades seleccionadas para cada producto

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value > 0 ? value : 1, // Asegura que la cantidad sea al menos 1
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1; // Usa la cantidad seleccionada o 1 por defecto
    onAddToCart({ ...item, quantity });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="p-4 border rounded shadow">
          <h3 className="text-lg font-bold">{item.Nombre || item.Droga}</h3>
          <p>
            <strong>Precio:</strong> ${item.Precio}
          </p>
          <p>
            <strong>{item.Cantidad ? "Cantidad disponible" : "Peso"}:</strong>{" "}
            {item.Cantidad || item.Peso}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="number"
              min="1"
              value={quantities[item.id] || 1}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value, 10))
              }
              className="w-16 text-center border rounded"
            />
            <button
              onClick={() => handleAddToCart(item)}
              className="bg-primary text-white px-4 py-2 rounded hover:scale-105 duration-200"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
