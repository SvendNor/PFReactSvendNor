import React, { useState } from "react";
import ItemQuantitySelector from "./ItemDetail/ItemQuantitySelector";
import { Link } from "react-router-dom";

const Item = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{item.nombre}</h3>
      <p>
        <strong>Precio:</strong> ${item.precio}
      </p>
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
      <ItemQuantitySelector onQuantityChange={handleQuantityChange} />
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => onAddToCart({ ...item, quantity })}
          className="bg-primary text-white px-4 py-2 rounded hover:scale-105 duration-200"
        >
          Agregar al carrito
        </button>
        <Link
          to={`/producto/${item.id}`}
          className="text-primary underline hover:text-secondary"
        >
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};

export default Item;
