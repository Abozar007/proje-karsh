import { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch, FaGlobe } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useTranslation } from 'react-i18next';
import "./Navbar.css";
import Logo from "./Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setIsLoggedIn] = useState(false);
  const [, setShowProfileMenu] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const profileRef = useRef();
  const languageRef = useRef();
  const { t, i18n } = useTranslation();


  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (lng === 'fa') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
    setLanguageDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logos">
          <Logo />
        </div>

        <div className="desktop-menu">
          <ul className="menu-list">
            <li><Link to="/">{t('Home')}</Link></li>
            <li><Link to="/Products">{t('Products')}</Link></li>
            <li><Link to="/about">{t('About')}</Link></li>
            <li><Link to="/contact">{t('Contact Us')}</Link></li>
          </ul>
        </div>

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder={t('Search AI products...')} className="search-input" />
        </div>

        <div className="actions">
          {/* Language Switcher Dropdown */}
          <div className="language-dropdown" ref={languageRef}>
            <button className="language-button" onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}>
              <FaGlobe />
            </button>
            {languageDropdownOpen && (
              <div className={`language-menu ${languageDropdownOpen ? 'open' : ''}`}>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('fa')}>فارسی</button>
              </div>
            )}
          </div>

          <div className="cart-container" onClick={() => navigate('/cart')}>
            <FaShoppingCart className="cart-icon" />
            {totalItems > 0 && <div className="cart-badge">{totalItems}</div>}
          </div>

          <div className="profile-icon" ref={profileRef} onClick={handleProfileClick}>
            <FaUser />
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}

      <div className={`slide-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>✕</button>
        <Link to="/" className="nav-link">{t('Home')}</Link>
        <Link to="/cart" className="nav-link" onClick={() => setMenuOpen(false)}>{t('Cart')}</Link>
        <Link to="/Products" className="nav-link" onClick={() => setMenuOpen(false)}>{t('Products')}</Link>
        <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>{t('About')}</Link>
      </div>
    </nav>
  );
}
