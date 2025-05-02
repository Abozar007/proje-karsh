import { useContext } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';
import { CartContext } from './CartContext';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const productInCart = cartItems.find((item) => item.id === product.id);
  const quantity = productInCart?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('✅ محصول به سبد خرید اضافه شد!', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      theme: 'colored',
    });
  };

  return (
    <div className="product-card ">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <div className="card-bottom">

        {quantity > 0 ? (
          <div className="quantity-controls">
            <button className="qty-btn" onClick={() => decreaseQuantity(product.id)}>-</button>
            <span className="qty-count">{quantity}</span>
            <button className="qty-btn" onClick={() => increaseQuantity(product.id)}>+</button>
          </div>
        ) : (
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
        <p className="product-price">{product.price.toLocaleString()} تومان</p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
