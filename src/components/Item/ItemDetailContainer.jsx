import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase-config";
import ItemDetail from "./ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const collections = ["medicamentos", "perfumes"];
        let foundItem = null;

        for (const collection of collections) {
          const itemRef = doc(db, collection, id);
          const snapshot = await getDoc(itemRef);
          if (snapshot.exists()) {
            foundItem = { id: snapshot.id, ...snapshot.data() };
            break;
          }
        }

        if (foundItem) {
          setItem(foundItem);
        } else {
          console.error("El producto no existe en ninguna colección.");
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
        <p className="text-center text-lg">El producto no existe o no está disponible.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
