import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import Navbar from "./Component/Navbar";
import Hero from "./Component/Hero";
import HomePage from "./Component/HomePage";
import Cart from "./Component/Cart";
import ProductCard from "./Component/ProductCard";
import Profile from "./Component/Profile"; 
import CartProvider from "./Component/CartContext";
import Checkout from "./Component/Checkout"; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Component/Login";
import Products from './Component/Products';
import OrdersPage from './Component/OrdersPage';
import WishlistPage from './Component/WishlistPage';
import './i18n';

export default function App() {
  const [showHero, setShowHero] = useState(false);
  const { i18n } = useTranslation(); 

  function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  }

  useEffect(() => {
    const heroShown = sessionStorage.getItem("heroShown");
    if (!heroShown) {
      setShowHero(true);
    }
  }, []);

  const handleHeroContinue = () => {
    sessionStorage.setItem("heroShown", "true");
    setShowHero(false);
  };
  useEffect(() => {
    if (i18n.language === "fa") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [i18n.language]);

  return (
    <CartProvider>
      <Router>
        {showHero ? (
          <Hero onContinue={handleHeroContinue} />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/productcard" element={<ProductCard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>
            <ToastContainer position="top-center" autoClose={1000} />
          </>
        )}
      </Router>
    </CartProvider>
  );
}
