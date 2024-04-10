import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Popup = ({ onClose }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRecipient, setSelectedRecipient] = useState('');
    const [message, setMessage] = useState('');
    const { t } = useTranslation(); // Initialize useTranslation hook

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', { fullName, email, selectedRecipient, message });
        setFullName('');
        setEmail('');
        setSelectedRecipient('');
        setMessage('');
        onClose();

        // Display alert based on selected recipient
        let recipientName = selectedRecipient === 'System Administrator' ? t('popup.systemAdministrator') : t('popup.lineManager');
        alert(`Message has been sent to ${recipientName}`);
    }

    return (
        <div className='popup'>
            <div className='popup-content'>
                <div className='contact-tab'>
                    <span className='close-btn' onClick={onClose}>
                        <img src={`icons/Close.png`} alt="Close button" />
                    </span>
                    <h2 className='contact-title'>{t('popup.contactUs')}</h2>
                </div>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fullName">{t('popup.fullNameLabel')}:</label>
                        <input type='text' id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        <label htmlFor="email">{t('popup.emailLabel')}:</label>
                        <input type='email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="role">{t('popup.selectRecipient')}:</label>
                        <select id="role" value={selectedRecipient} onChange={(e) => setSelectedRecipient(e.target.value)} required>
                            <option value=""></option>
                            <option value="System Administrator">{t('popup.systemAdministrator')}</option>
                            <option value="Line Manager">{t('popup.lineManager')}</option>
                        </select>
                        <label htmlFor="message">{t('popup.messageLabel')}:</label>
                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                        <div className='button-container'>
                            <button type='submit'>{t('popup.sendButton')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Popup;

