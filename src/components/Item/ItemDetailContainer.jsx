import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase-config";
import ItemDetail from "./ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchItem = async () => {
      try {
        const collections = ["medicamentos", "perfumes"];
        let foundItem = null;

        for (const collection of collections) {
          const itemRef = doc(db, collection, id);
          const snapshot = await getDoc(itemRef);

          if (snapshot.exists()) {
            const data = snapshot.data();

            foundItem = {
              id: snapshot.id,
              name: data.nombre,
              price: data.precio,
              stock: data.stock,
              brand: collection === "perfumes" ? data.marca : data.droga,
            };
            break;
          }
        }

        if (isMounted) {
          if (foundItem) {
            setItem(foundItem);
          } else {
            console.error("El producto no existe en ninguna colección.");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error al obtener el producto:", error);
        }
      }
    };

    fetchItem();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {item ? (
        <ItemDetail item={item} />
      ) : (
        <p className="text-center text-lg">El producto no existe o no está disponible.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
