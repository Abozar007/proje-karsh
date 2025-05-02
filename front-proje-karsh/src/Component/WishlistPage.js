import React from "react";

export default function WishlistPage() {
  const wishlistItems = [
    { id: 101, name: "لپ‌تاپ هوشمند", price: "45,000,000 تومان" },
    { id: 102, name: "ساعت هوشمند", price: "6,000,000 تومان" },
  ];

  return (
    <div className="page-container">
      <h2>علاقه‌مندی‌ها</h2>
      <ul className="wishlist">
        {wishlistItems.map((item) => (
          <li key={item.id} className="wishlist-item">
            <p>{item.name}</p>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
