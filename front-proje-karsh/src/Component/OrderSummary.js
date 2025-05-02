import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // اضافه شده
import "./OrderSummary.css";

export default function OrderSummary() {
  const { cartItems } = useCart();
  const { t } = useTranslation(); // اضافه شده

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const shipping = totalPrice > 500000 ? 0 : 30000;
  const finalPrice = totalPrice + shipping;

  return (
    <div className="order-summary">
      <h2>{t('order.title')}</h2>
      <div className="summary-item">
        <span>{t('order.items')}</span>
        <span>{cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
      </div>
      <div className="summary-item">
        <span>{t('order.totalPrice')}</span>
        <span>{totalPrice.toLocaleString()} تومان</span>
      </div>
      <div className="summary-item">
        <span>{t('order.shipping')}</span>
        <span>{shipping === 0 ? t('order.freeShipping') : `${shipping.toLocaleString()} تومان`}</span>
      </div>
      <hr />
      <div className="summary-total">
        <span>{t('order.finalPrice')}</span>
        <span>{finalPrice.toLocaleString()} تومان</span>
      </div>
      <Link to="/checkout" className="checkout-btn">{t('order.checkout')}</Link>
    </div>
  );
}
