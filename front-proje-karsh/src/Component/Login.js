import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Login.module.css";
import { useAuth } from "./auth";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { setIsLoggedIn } = useAuth();
  const { t } = useTranslation();

  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  
  // State برای نمایش/مخفی کردن پسورد
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => {
    setErrorMessage(""); // وقتی فرم عوض میشه خطاها پاک بشه
    setIsSignIn(!isSignIn);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignUp = async () => {
    const { name, email, password } = signUpData;

    if (!name || !email || !password) {
      setErrorMessage("لطفاً تمام فیلدها را پر کنید.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("ایمیل وارد شده معتبر نیست.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setIsSignIn(true);
        setErrorMessage("");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("مشکلی در ارتباط با سرور پیش آمده است.");
    }
  };

  const handleSignIn = async () => {
    const { email, password } = signInData;

    if (!email || !password) {
      setErrorMessage("لطفاً ایمیل و رمز عبور را وارد کنید.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("ایمیل وارد شده معتبر نیست.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        alert(t('login.success'));
        window.location.href = "/";
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("مشکلی در ارتباط با سرور پیش آمده است.");
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.formContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        {isSignIn ? (
          <div className={styles.formSection}>
            <h2>{t('login.signInTitle')}</h2>
            <input
              type="email"
              placeholder={t('login.email')}
              value={signInData.email}
              onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
            />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t('login.password')}
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <button type="button" className={styles.linkButton}>
              {t('login.forgotPassword')}
            </button>
            <button onClick={handleSignIn} className={styles.primaryButton}>
              {t('login.signIn')}
            </button>
            <button onClick={toggleForm} className={styles.switchButton}>
              {t('login.createAccount')}
            </button>
          </div>
        ) : (
          <div className={styles.formSection}>
            <h2>{t('login.signUpTitle')}</h2>
            <input
              type="text"
              placeholder={t('login.name')}
              value={signUpData.name}
              onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder={t('login.email')}
              value={signUpData.email}
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
            />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t('login.password')}
                value={signUpData.password}
                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <button onClick={handleSignUp} className={styles.primaryButton}>
              {t('login.signUp')}
            </button>
            <button onClick={toggleForm} className={styles.switchButton}>
              {t('login.alreadyAccount')}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
