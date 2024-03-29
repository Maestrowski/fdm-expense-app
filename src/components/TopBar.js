import React from 'react';
import {Link} from "react-router-dom";

const TopBar = ({ onSlideIconClick, openLeftBar }) => {
  const navbarClass = !openLeftBar ? 'top-navbar' : 'full-width';

  return (
    <div className={navbarClass}>
      <div className='slide-icon' onClick={onSlideIconClick}>
        <img src={`icons/Slide.png`} alt="Slide Icon" />
      </div>
      <Link to="login">
      <div className='login-btn'>
        <span className='login-title'>Login / Sign up</span>
      </div>
      </Link>
    </div>
  );
}

export default TopBar;

