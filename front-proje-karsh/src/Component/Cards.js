import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next'; // اضافه شده
import './Cards.css'; 

import img1 from '../image/1.jpg';
import img2 from '../image/2.jpg';
import img3 from '../image/3.jpg';
import img4 from '../image/4.jpg';

const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'cards.productDescription', // ترجمه شده
    price: 500000,
    image: img1,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'cards.productDescription',
    price: 400000,
    image: img2,
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'cards.productDescription',
    price: 1000000,
    image: img3,
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'cards.productDescription',
    price: 1000000,
    image: img4,
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'cards.productDescription',
    price: 1000000,
    image: img4,
  },
];

export default function Cards({ addToCart, showAll = false }) {
  const { t } = useTranslation(); // اضافه شده

  if (!Array.isArray(products) || products.length === 0) {
    return <p>{t('cards.loading')}</p>;
  }

  return (
    <section className='someproduct'>
      {!showAll && (
        <>
          <h2 className='product-title'>{t('cards.title')}</h2>
          <p className='product-untitle'>{t('cards.subtitle')}</p>
        </>
      )}
      <div id='products' className="cards-container">
        {(showAll ? products : products.slice(0, 3)).map((product) => (
          <ProductCard
            key={product.id}
            product={{ ...product, description: t(product.description) }}
            onAddToCart={addToCart}
          />
        ))}
        {!showAll && (
          <div className="view-all-button-container">
            <Link to="/products" className="view-all-button">
              {t('cards.viewAll')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
