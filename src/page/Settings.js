import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import i18n from '../i18n'; // Import i18n instance
import "../page/Settings.css";
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();

  const [ authUser, setAuthUser ] = useState(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
        setAuthUser(user);
        } else {
        setAuthUser(null);
        }
    });

  return () => {
    listen();
  };
  }, []);

  const userSignOut = () => {
    signOut(auth)
        .then(() => {
        console.log(t("authDetails.signOutConsole"));
        })
        .catch((error) => console.log(error));
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
      <div className="account-details">
        <h2>{t("settings.accountDetails")}</h2>
        {authUser ? (
        <>
            <p>{t("settings.accountEmail")+": "} {authUser.email}</p>
            <button className="sign-out-btn" onClick={userSignOut}>{t("authDetails.signOutClick")}</button>
        </>
        ) : (
        <p>{t("settings.accountNotFound")}</p>
        )}
      </div>
    </div>
  );
}

export default Settings;
