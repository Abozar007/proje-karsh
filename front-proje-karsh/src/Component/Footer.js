import "./Footer.css";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import Logo from './Logo';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Logo />
        </div>

        <div className="footer-column">
          <h4>{t("footer.quickAccess")}</h4>
          <ul>
            <li><a href="/">{t("footer.home")}</a></li>
            <li><a href="/Products">{t("footer.shop")}</a></li>
            <li><a href="/about">{t("footer.about")}</a></li>
            <li><a href="/contact">{t("footer.contact")}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t("footer.usefulLinks")}</h4>
          <ul>
            <li><a href="/">{t("footer.faq")}</a></li>
            <li><a href="/">{t("footer.terms")}</a></li>
            <li><a href="/">{t("footer.privacy")}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t("footer.contactUs")}</h4>
          <ul>
            <li>
              <a href="/">
                <FaInstagram style={{ marginLeft: "8px" }} />
                {t("footer.instagram")}
              </a>
            </li>
            <li>
              <a href="/">
                <FaTelegramPlane style={{ marginLeft: "8px" }} />
                {t("footer.telegram")}
              </a>
            </li>
            <li>
              <a href="/">
                <FaWhatsapp style={{ marginLeft: "8px" }} />
                {t("footer.whatsapp")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} TechSphere. {t("footer.rights")}
      </div>
    </footer>
  );
};

export default Footer;
