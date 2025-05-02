import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:5000/api/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Received orders data:", data);
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>در حال دریافت سفارش‌ها...</p>;
  if (!orders.length) return <p>سفارشی یافت نشد</p>;

  return (
    <div className="page-container">
      <h2>سفارش‌های من</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order._id} className="order-item">
            <p>تاریخ سفارش: {new Date(order.date).toLocaleDateString()}</p>
            <p>وضعیت: {order.status}</p>
            <p>تعداد کالا: {order.items}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
