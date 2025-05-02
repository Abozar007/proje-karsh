import { useTranslation } from "react-i18next";
import "./Why.css";

const Why = () => {
  const { t } = useTranslation();

  const Why = [
    {
      icon: "🧠",
      title: t("why.localizedAI"),  // از تابع t برای ترجمه عنوان استفاده می‌کنیم
      description: t("why.localizedDescription"),  // ترجمه توضیحات
    },
    {
      icon: "🎓",
      title: t("why.integratedLearning"),
      description: t("why.integratedLearningDescription"),
    },
    {
      icon: "🏙️",
      title: t("why.smartCity"),
      description: t("why.smartCityDescription"),
    },
  ];

  return (
    <section className="features-section">
      <h2 className="features-title">{t("why.chooseTitle")}</h2>  {/* ترجمه عنوان کلی بخش */}
      <div className="features-grid">
        {Why.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-heading">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Why;
