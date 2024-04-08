import React from 'react';
import i18n from '../i18n'; // Import i18n instance
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h2>{t('settings.title')}</h2> {/* Translated settings title */}
      <div className='language-btns'>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('fr')}>French</button>
        <button onClick={() => changeLanguage('de')}>German</button>
        <button onClick={() => changeLanguage('cn')}>Chinese</button>
      </div>
    </div>
  );
}

export default Settings;
