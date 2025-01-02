import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase-config";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const category = (id || "medicamentos").toLowerCase();
        const categoryRef = collection(db, category);
        const snapshot = await getDocs(categoryRef);

        if (snapshot.empty) {
          setItems([]);
          return;
        }

        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{greeting}</h2>
      {items.length > 0 ? (
        <ItemList items={items} />
      ) : (
        <p className="text-center text-lg">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ItemListContainer;
