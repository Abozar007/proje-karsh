import React, { useState } from "react";
import { useTranslation } from "react-i18next"; 
import "./ProductFinder.css";

const ProductFinder = () => {
  const { t } = useTranslation(); 

  const [formData, setFormData] = useState({
    project: "",
    level: "",
    budget: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: t('finder.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="productfinder">
      <div className="product-finder-wrapper">
        <h2>{t('finder.title')}</h2>
        <p>{t('finder.description')}</p>
        <form className="product-finder-form" onSubmit={handleSubmit}>
          <textarea
            name="project"
            placeholder={t('finder.placeholder.project')}
            value={formData.project}
            onChange={handleChange}
            required
          />
          <div className="form-row">
            <input
              type="text"
              name="level"
              placeholder={t('finder.placeholder.level')}
              value={formData.level}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="budget"
              placeholder={t('finder.placeholder.budget')}
              value={formData.budget}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? t('finder.button.loading') : t('finder.button.search')}
          </button>
        </form>

        {result && (
          <div className="product-result">
            {result.error ? (
              <p className="error">{result.error}</p>
            ) : (
              <pre>{JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFinder;
