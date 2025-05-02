import "./Hero.css";
import { useState, useEffect } from "react";

function Hero({ onContinue }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // چک کن ببینه کاربر قبلاً Hero رو دیده یا نه
    const alreadyShown = sessionStorage.getItem("heroShown");

    if (!alreadyShown) {
      setShow(true); // نشون بده
    }
  }, []);

  const handleContinue = () => {
    setShow(false);
    sessionStorage.setItem("heroShown", "true"); // بعد از ادامه، ذخیره کن که دیده شده
    onContinue(); // هر چی callback داشتی اجرا کن
  };

  if (!show) return null; // اگه نباید نشون داده بشه، هیچی رندر نکن

  return (
    <section className={`hero fade-in`}>
      <div className="hero-content">
        <h1 className="hero-title">با ما وارد دنیای آینده شو</h1>
        <p className="hero-subtitle">
        تجربه‌ای هوشمند برای تولید محتوا، فناوری و شهر دیجیتال
        </p>
        <button className="hero-button" onClick={handleContinue}>
        بزن بریم 
        </button>
      </div>
    </section>
  );
}

export default Hero;
