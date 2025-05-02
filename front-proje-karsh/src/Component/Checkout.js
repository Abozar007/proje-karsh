import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // اضافه شده
import "./Checkout.css";

export default function Checkout() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const { t } = useTranslation(); // اضافه شده

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const shipping = totalPrice > 500000 ? 0 : 30000;
  const finalPrice = totalPrice + shipping;
  const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    const { name, phone, address, postalCode } = formData;

    if (!name || !phone || !address || !postalCode) {
      alert(t('checkout.fillAllFields'));
      return;
    }

    alert(t('checkout.success', { name }));
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box form-side">
        <h2>{t('checkout.buyerInfo')}</h2>
        <input
          type="text"
          name="name"
          placeholder={t('checkout.name')}
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="phone"
          placeholder={t('checkout.phone')}
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder={t('checkout.address')}
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder={t('checkout.postalCode')}
          value={formData.postalCode}
          onChange={handleChange}
        />

        <button className="pay-btn" onClick={handlePayment}>
          {t('checkout.pay')} 💳
        </button>
      </div>

      <div className="checkout-box summary-side">
        <h2>{t('checkout.orderSummary')}</h2>
        <p>{t('checkout.totalItems')}: <strong>{totalCount}</strong></p>
        <p>{t('checkout.totalProductsPrice')}: <strong>{totalPrice.toLocaleString()} تومان</strong></p>
        <p>{t('checkout.shippingCost')}: <strong>{shipping === 0 ? t('checkout.freeShipping') : `${shipping.toLocaleString()} تومان`}</strong></p>
        <hr />
        <p>💰 {t('checkout.finalAmount')}: <strong>{finalPrice.toLocaleString()} تومان</strong></p>
      </div>
    </div>
  );
}
