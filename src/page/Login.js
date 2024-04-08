import React, { useState } from 'react';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from "react-router-dom";
import AuthDetails from "./AuthDetails";

const Login = () => {
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
    <div className="sign-in-container">
      <form onSubmit={login}>
        <h1>Login to Account</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
        <p>Don't have an account? </p>
        <Link to="../signup">
          Create one here!
        </Link>
      </form> 
      <AuthDetails />
    </div>
  );
};

export default Login
