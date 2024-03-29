import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LeftBar = ({isOpen}) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  }

  return (
    <div className={`left-navbar ${isOpen ? 'open' : ''}`}>
      <div className='nav-item' onClick={handleLogoClick}>
        <img src={`icons/Logo.png`} className='nav-logo'/>
      </div>
      <Link to ="/add-expense">
        <div className='nav-item'>
        <img src={`icons/Plus.png`} className='nav-icon'/>
        <p className='item-title'>Add Expense</p>
        </div>
      </Link>
      <div className='nav-item'>
        <img src={`icons/ExpData.png`} className='nav-icon'/>
        <p className='item-title'>Expense Data</p>
      </div>
      <div className='nav-item'>
        <img src={`icons/Receipts.png`} className='nav-icon'/>
        <p className='item-title'>Receipts</p>
      </div>
      <div className='nav-item'>
        <img src={`icons/ExpClaim.png`} className='nav-icon'/>
        <p className='item-title'>Expense Claims</p>
      </div>
      <Link to ="/Export">
        <div className='nav-item'>
          <img src={`icons/Export.png`} className='nav-icon'/>
          <p className='item-title'>Export</p>
        </div>
      </Link>
      <div className='nav-item'>
        <img src={`icons/Settings.png`} className='nav-icon'/>
        <p className='item-title'>Settings</p>
      </div>
    </div>
  )
}

export default LeftBar
