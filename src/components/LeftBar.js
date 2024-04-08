import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const LeftBar = ({isOpen}) => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize useTranslation hook

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={`left-navbar ${isOpen ? 'open' : ''}`}>
      <div className='nav-item' onClick={handleLogoClick}>
        <img src={`icons/Logo.png`} className='nav-logo'/>
      </div>
      <Link to ="/dashboard">
        <div className='nav-item'>
        <img src={`icons/Dashboard.png`} className='nav-icon'/>
        <p className='item-title'>{t('leftBar.dashboard')}</p> {/* Translated item title */}
        </div>
      </Link>
      <Link to ="/add-expense">
        <div className='nav-item'>
        <img src={`icons/Plus.png`} className='nav-icon'/>
        <p className='item-title'>{t('leftBar.addExpense')}</p> {/* Translated item title */}
        </div>
      </Link>
      <Link to ="expense-data">
      <div className='nav-item'>
        <img src={`icons/ExpData.png`} className='nav-icon'/>
        <p className='item-title'>{t('leftBar.expenseData')}</p> {/* Translated item title */}
      </div>
      </Link>
      <Link to ="receipts">
      <div className='nav-item'>
        <img src={`icons/Receipts.png`} className='nav-icon'/>
        <p className='item-title'>{t('leftBar.receipts')}</p> {/* Translated item title */}
      </div>
      </Link>
      <Link to ="expense-claims">
      <div className='nav-item'>
        <img src={`icons/ExpClaim.png`} className='nav-icon'/>
        <p className='item-title'>{t('leftBar.expenseClaims')}</p> {/* Translated item title */}
      </div>
      </Link>
      <Link to ="export">
      <div className='nav-item'>
        <img src={`icons/Export.png`} className='nav-icon'/>
        <p className='item-title'>{t('leftBar.export')}</p> {/* Translated item title */}
      </div>
      </Link>
      <Link to ="settings">
      <div className='nav-item'>
        <img src={`icons/Settings.png`} className='nav-icon'/>
        <p className='item-title'>{t('leftBar.settings')}</p> {/* Translated item title */}
      </div>
      </Link>
    </div>
  );
}

export default LeftBar;
