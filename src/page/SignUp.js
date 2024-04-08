import React, { useState } from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AuthDetails from "./AuthDetails";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <h1>Create an Account</h1>
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
        <button type="submit">Register</button>
      </form> 
      <AuthDetails />
    </div>
  );
};

export default SignUp
