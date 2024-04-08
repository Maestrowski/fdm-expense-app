import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Login = () => {
  const { t } = useTranslation(); // Destructure t function from useTranslation

  return (
    <div>
      {t('login')} {/* Translate the text "Login" */}
    </div>
  );
};

export default Login;
