import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase-config";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const collections = ["medicamentos", "perfumes"];
        const allProducts = [];

        for (const coll of collections) {
          const querySnapshot = await getDocs(collection(db, coll));
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            allProducts.push({
              id: doc.id,
              name: data.nombre,
              price: data.precio,
              stock: data.stock,
              brand: coll === "perfumes" ? data.marca : data.droga,
              category: coll,
            });
          });
        }

        setProducts(allProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Cargando productos...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Todos los Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>Categoría: {product.category}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>{product.category === "perfumes" ? `Marca: ${product.brand}` : `Droga: ${product.brand}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
