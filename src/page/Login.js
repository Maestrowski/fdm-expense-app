import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook;
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from "react-router-dom";
import AuthDetails from "./AuthDetails";

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
    <div>
      Login
    </div>
  );
};

export default Login;
