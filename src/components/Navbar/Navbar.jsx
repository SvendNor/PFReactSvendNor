import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import CartWidget from "./CartWidget";
import { useCart } from "../../context/CartContext"; // Importar el contexto del carrito

const Menu = [
  { id: 1, name: "Inicio", link: "/#" },
  { id: 2, name: "Perfumeria", link: "/#services" },
  { id: 3, name: "Medicamentos", link: "/#" },
];

const DropdownLinks = [
  { id: 1, name: "Mas Buscados", link: "/#" },
  { id: 2, name: "Mejor Rankeados", link: "/#" },
  { id: 3, name: "Ofertas", link: "/#" },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showCart, setShowCart] = useState(false);
  const { cart, total } = useCart(); // Obtener carrito y total del contexto

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              Farmacia Farah
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Buscar"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* CartWidget */}
            <div onClick={toggleCart} className="cursor-pointer">
              <CartWidget />
            </div>

            {/* Darkmode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
          {/* Simple Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Productos
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* Carrito Resumen */}
      {showCart && (
        <div className="absolute top-16 right-4 bg-white shadow-lg p-4 rounded-md z-50 w-[300px]">
          <h3 className="font-bold mb-2">Resumen del Carrito</h3>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between mb-2">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>El carrito está vacío</p>
          )}
          <div className="font-bold mt-4 border-t pt-2">
            Total: ${total}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
