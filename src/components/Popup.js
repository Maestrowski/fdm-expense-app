import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Popup = ({onClose}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { t } = useTranslation(); // Initialize useTranslation hook


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', {fullName, email, message});
        setFullName('');
        setEmail('');
        setMessage('');
        onClose();        
    }

  return (
    <div className='popup'>
        <div className='popup-content'>
            <div className='contact-tab'>
            <span className='close-btn' onClick={onClose}>
                <img src={`icons/Close.png`}/>
            </span>
            <h2 className='contact-title'>{t('popup.contactUs')}</h2>
            </div>
            <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">{t('popup.fullNameLabel')}:</label>
                <input type='text' id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <label htmlFor="email">{t('popup.emailLabel')}:</label>
                <input type='email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="message">{t('popup.messageLabel')}:</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </form>
                <div className='button-container'>
                <button type='submit'>{t('popup.sendButton')}</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Popup
