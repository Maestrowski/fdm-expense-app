import { sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook;
import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../page/ForgotPassword.css";

function ForgotPassword(){

    const { t } = useTranslation(); // Destructure t function from useTranslation
    const history = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const emailVal = e.target.email.value;
        sendPasswordResetEmail(auth,emailVal).then(data=>{
            alert("Check your email")
            history("/login")
        }).catch(err=>{
            alert("No email found.")
        })
    }
    return(
        <div className="forgot-form-container">
            <h1>{t("forgotPassword.resetTitle")}</h1>
            <label htmlFor="email">{t("login.emailLabel")}</label>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input 
                    name="email" 
                    placeholder={t("login.placeholderEmail")} 
                    required
                />
                <button className="reset-btn-text" type="submit">{t("forgotPassword.resetText")}</button>
            </form>
        </div>
    )
}
export default ForgotPassword;