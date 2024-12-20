import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../../context/CartContext";
import db from "../../firebase-config";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const { id } = useParams(); // Categoría
  const { addToCart } = useCart(); // Función para agregar al carrito

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const category = id || "Medicina"; // Predeterminado
        console.log(`Cargando productos de la categoría: ${category}`);

        const categoryRef = collection(db, category);
        const snapshot = await getDocs(categoryRef);

        if (snapshot.empty) {
          console.warn(`No se encontraron documentos en la categoría: ${category}`);
          setItems([]);
          return;
        }

        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(products);
        console.log("Productos cargados:", products);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchItems();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{greeting}</h2>
      {items.length > 0 ? (
        <ItemList items={items} onAddToCart={addToCart} />
      ) : (
        <p className="text-center text-lg">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ItemListContainer;
