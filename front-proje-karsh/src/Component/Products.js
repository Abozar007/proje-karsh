import React, { useContext, useState } from 'react';
import Cards from './Cards';
import { CartContext } from './CartContext';
import './Products.css';

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const [sortOption, setSortOption] = useState('default');

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="products-page">
      <h1 className="products-header">تمام محصولات</h1>

      <div className="products-filters">
        <select className="sort-select" value={sortOption} onChange={handleSortChange}>
          <option value="default">مرتب‌سازی</option>
          <option value="newest">جدیدترین</option>
          <option value="lowest">ارزان‌ترین</option>
          <option value="highest">گران‌ترین</option>
        </select>
      </div>

      <div className="products-content">
        <Cards addToCart={addToCart} showAll={true} sortOption={sortOption} />
      </div>
    </div>
  );
}
