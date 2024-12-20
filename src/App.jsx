import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import AOS from "aos";
import "aos/dist/aos.css";
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";

// Nuevos componentes
import ItemListContainer from "./components/Item/ItemListContainer";
import ItemDetailContainer from "./components/Item/ItemDetailContainer";
import Cart from "./components/Cart/Cart"; // Componente del carrito
import Checkout from "./components/Checkout/Checkout"; // Componente de checkout
import { CartProvider } from "./context/CartContext";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
          {/* Navbar */}
          <Navbar handleOrderPopup={handleOrderPopup} />

          {/* Rutas */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Hero Section */}
                  <Hero handleOrderPopup={handleOrderPopup} />
                  {/* Productos */}
                  <Products />
                  <TopProducts handleOrderPopup={handleOrderPopup} />
                  <Banner />
                  <Subscribe />
                  <Products />
                  <Testimonials />
                  <Footer />
                </>
              }
            />
            <Route
              path="/categoria/:id"
              element={<ItemListContainer greeting="Bienvenidos a la Tienda Farah" />}
            />
            <Route path="/producto/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Cart />} /> {/* Ruta del carrito */}
            <Route path="/checkout" element={<Checkout />} /> {/* Ruta del checkout */}
          </Routes>

          {/* Popup */}
          <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
