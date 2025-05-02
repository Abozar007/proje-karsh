import "./Banner.css";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();

  const handleScrollToProducts = () => {
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-banner">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>{t("banner.title")}</h1>
          <p>{t("banner.subtitle")}</p>
          <div className="hero-buttons">
            <button onClick={handleScrollToProducts} className="btn primary">{t("banner.explore")}</button>
            <button className="btn secondary">{t("banner.learn")}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
