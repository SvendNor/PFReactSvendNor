import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import DarkMode from "./DarkMode";
import CartWidget from "./CartWidget";
import { useCart } from "../../context/CartContext";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase-config";

const Navbar = () => {
  const { cart } = useCart();
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, "categories");
        const snapshot = await getDocs(categoriesRef);
        const categoriesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              Farmacia Farah
            </Link>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Buscar"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
            <div className="relative cursor-pointer">
              <Link to="/carrito" className="flex items-center gap-2">
                <CartWidget />
              </Link>
            </div>
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {/* Nuevo enlace para 'Productos' */}
          <li>
            <Link
              to="/productos"
              className="inline-block px-4 hover:text-primary duration-200"
            >
              Productos
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={category.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {location.pathname === "/carrito" && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h3 className="font-bold text-2xl mb-4">Resumen del Carrito</h3>
            {cart.length > 0 ? (
              <ul className="mb-4">
                {cart.map((item) => (
                  <li key={item.id} className="mb-2">
                    <span>
                      {item.nombre} x {item.quantity}
                    </span>
                    <span className="block">${item.precio * item.quantity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>El carrito está vacío</p>
            )}
            <div className="font-bold mt-4 border-t pt-2 text-xl">
              Total: ${cart.reduce((total, item) => total + item.precio * item.quantity, 0)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
