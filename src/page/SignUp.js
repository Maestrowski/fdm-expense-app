import React, { useState } from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "../page/SignUp.css";
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation(); // Destructure t function from useTranslation

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      }).catch((error) => {
        console.log(error);
    })
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={register}>
        <h1>{t("register.registerTitle")}</h1>
        <input 
          type="email" 
          placeholder={t("register.placeholderEmail")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input 
          type="password" 
          placeholder={t("register.placeholderPassword")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button type="submit">{t("register.buttonRegister")}</button>
      </form> 
    </div>
  );
};

export default SignUp;
