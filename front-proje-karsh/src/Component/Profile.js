import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import "./Profile.css";
import avatar from "../image/Avatar.png";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ address: "", phone: "" });
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Received profile data:", data);
        setProfile(data);
        setFormData({
          address: data.address || "",
          phone: data.phone || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const updatedData = await res.json();
      setProfile((prev) => ({ ...prev, ...updatedData }));
      setEditMode(false);
      console.log("Profile updated:", updatedData);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p className="profile-loading">{t('profile.loading')}</p>;
  if (!profile) return <p className="profile-error">{t('profile.noAccess')}</p>;

  const joinDate = new Date(profile.joinDate);
  const formattedDate =
    joinDate instanceof Date && !isNaN(joinDate.getTime())
      ? joinDate.toLocaleDateString()
      : "2025-4-03";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatardiv">      
      <img
        src={avatar}
        alt="User Avatar"
        className="profile-avatar"
      />
      </div>

        <h2 className="profile-title">{t('profile.title')}</h2>
        <div className="profile-info">
          <p>
            <strong>{t('profile.name')}:</strong> {profile.name}
          </p>
          <p>
            <strong>{t('profile.email')}:</strong> {profile.email}
          </p>
          <p>
            <strong>{t('profile.joinDate')}:</strong> {formattedDate}
          </p>
          <p>
            <strong>{t('profile.address')}:</strong>
            {editMode ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t('profile.addressPlaceholder')}
              />
            ) : (
              profile.address || t('profile.notProvided')
            )}
          </p>
          <p>
            <strong>{t('profile.phone')}:</strong>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('profile.phonePlaceholder')}
              />
            ) : (
              profile.phone || t('profile.notProvided')
            )}
          </p>
        </div>

        <div className="profile-buttons">
          {editMode ? (
            <>
              <button onClick={handleSave}>💾 {t('profile.save')}</button>
              <button onClick={() => setEditMode(false)}>❌ {t('profile.cancel')}</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/orders")}>🛒 {t('profile.viewOrders')}</button>
              <button onClick={() => navigate("/downloads")}>{t('profile.downloadProducts')}</button>
              <button onClick={() => setEditMode(true)}>✏️ {t('profile.editInfo')}</button>
              <button onClick={handleLogout} className="logout">🚪 {t('profile.logout')}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
