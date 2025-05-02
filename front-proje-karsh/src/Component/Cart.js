import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // اضافه شده
import OrderSummary from "./OrderSummary";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const { t } = useTranslation(); // اضافه شده

  return (
    <div className="cart-page">
      <h1 className="cart-title">{t('cart.title')}</h1>

      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{t('cart.price', { price: item.price.toLocaleString() })}</p>
                  <p>{t('cart.quantity', { quantity: item.quantity || 1 })}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  {t('cart.remove')}
                </button>
                <div className="cart-item-actions">
                  <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>➖</button>
                  <span className="qty-count">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>➕</button>
                </div>
              </div>
            ))}
          </div>
          <OrderSummary />
        </>
      ) : (
        <p className="empty-cart">{t('cart.empty')}</p>
      )}
    </div>
  );
}
