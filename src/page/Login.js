import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook;
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import "../page/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation(); // Destructure t function from useTranslation

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      }).catch((error) => {
        console.log(error);
    })
  };

  return (
    <div className="auth-form-container">
        <h2>{t("login.loginTitle")}</h2>
        <form className="login-form" onSubmit={login}>
            <label htmlFor="email">{t("login.emailLabel")}</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              placeholder={t("login.placeholderEmail")} 
              id="email" 
              name="email" 
              required
            />
            <label htmlFor="password">{t("login.passwordLabel")}</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="********" 
              id="password" 
              name="password" 
              required
            />
            <button className="login-btn" type="submit">{t("login.buttonLogin")}</button>
        </form>
        <Link to="../signup">
          <button className="link-btn">{t("login.registerMessage")}</button>
        </Link>
    </div>
  );
};

export default Login;
