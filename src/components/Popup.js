import React, { useState } from 'react'

const Popup = ({onClose}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

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
            <h2 className='contact-title'>Contact Us</h2>
            </div>
            <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name:</label>
                <input type='text' id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <label htmlFor="email">Email Address:</label>
                <input type='email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="message">Message:</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </form>
                <div className='button-container'>
                <button type='submit'>Send</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Popup
