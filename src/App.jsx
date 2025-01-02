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
import ItemListContainer from "./components/Item/ItemListContainer";
import ItemDetailContainer from "./components/Item/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import AllProducts from "./components/Products/AllProducts";
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
          <Navbar handleOrderPopup={handleOrderPopup} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero handleOrderPopup={handleOrderPopup} />
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
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/productos" element={<AllProducts />} />
          </Routes>
          <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
