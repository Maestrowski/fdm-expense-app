import React from 'react';
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook


const TopBar = ({ onSlideIconClick, openLeftBar }) => {
  const navbarClass = !openLeftBar ? 'top-navbar' : 'full-width';
  const { t } = useTranslation(); // Use useTranslation hook to access translations


  return (
    <div className={navbarClass}>
      <div className='slide-icon' onClick={onSlideIconClick}>
        <img src={`icons/Slide.png`} alt="Slide Icon" />
      </div>
      <Link to="login">
      <div className='login-btn'>
        <span className='login-title'>{t('topBar.loginSignup')}</span>
      </div>
      </Link>
    </div>
  );
}

export default TopBar;

