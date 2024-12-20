import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase-config";
import ItemDetail from "./ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams(); // Obtenemos el ID del producto desde la URL

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemRef = doc(db, "products", id); // Cambia "products" al nombre de tu colección en Firestore
        const snapshot = await getDoc(itemRef);

        if (snapshot.exists()) {
          setItem({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.error("El producto no existe");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {item ? (
        <ItemDetail item={item} />
      ) : (
        <p className="text-center text-lg">Cargando producto...</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;