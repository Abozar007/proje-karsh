import React from "react";
import "./Subscribe.css";

const Subscribe = () => {
  return (
    <div className="newsletter-section">
      <h2>Stay Updated with Iran's Tech Evolution</h2>
      <p>
        Subscribe to our newsletter for the latest in AI and smart city
        technologies, tailored for the Iranian market.
      </p>
      <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Your email address" required />
        <button type="submit">Subscribe</button>
      </form>
      <small>We respect your privacy. Unsubscribe at any time.</small>
    </div>
  );
};

export default Subscribe;
