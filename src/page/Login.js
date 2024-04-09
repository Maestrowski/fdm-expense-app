import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook;
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from "react-router-dom";
import { SignUp } from "./SignUp";
import AuthDetails from "./AuthDetails";

const Login = (props) => {
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
        <h2>{t("Login")}</h2>
        <form className="login-form" onSubmit={login}>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <Link to="../signup">
          <button className="link-btn">{t("Don't have an account? Register here.")}</button>
        </Link>
    </div>
  );
};

export default Login;
