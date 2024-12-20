import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import DarkMode from "./DarkMode";
import CartWidget from "./CartWidget";
import { useCart } from "../../context/CartContext";

const Menu = [
  { id: 1, name: "Inicio", link: "/" },
  { id: 2, name: "Perfumes", link: "/categoria/Perfumes" },
  { id: 3, name: "Medicina", link: "/categoria/Medicina" },
];

const Navbar = () => {
  const { cart, total } = useCart();
  const location = useLocation();

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
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                    {cart.length}
                  </span>
                )}
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
          {Menu.map((data) => (
            <li key={data.id}>
              <Link
                to={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
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
                      {item.Nombre || item.Droga} x {item.quantity}
                    </span>
                    <span className="block">${item.Precio * item.quantity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>El carrito está vacío</p>
            )}
            <div className="font-bold mt-4 border-t pt-2 text-xl">
              Total: ${total}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
