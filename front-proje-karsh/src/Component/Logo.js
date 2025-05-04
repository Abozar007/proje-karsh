import React from "react";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-cube">
        <div className="logo-face front">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="url(#grad1)" stroke="#3b82f6" strokeWidth="1.5" />
            <path d="M3 7L12 12V22L3 17V7Z" fill="url(#grad2)" stroke="#8b5cf6" strokeWidth="1.5" />
            <path d="M12 12L21 7V17L12 22V12Z" fill="url(#grad3)" stroke="#ec4899" strokeWidth="1.5" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text">TechSphere</span>
        </div>
      </div>
    </div>
  );
}
