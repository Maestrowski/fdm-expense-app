import React, { useState } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';
import Chatbox from './components/Chatbox';
import Popup from './components/Popup';


function App() {
  const [openLeftBar, setOpenLeftBar] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const handleSlideIconClick = () => {
    setOpenLeftBar(prevState => !prevState);
  }

  const togglePopup = () => {
    setShowPopup(prevState => !prevState);
  }

  return (
    <div className="container">
      <LeftBar isOpen={openLeftBar}/>
      <TopBar onSlideIconClick={handleSlideIconClick} openLeftBar={openLeftBar}/>
      <Chatbox onChatboxClick ={togglePopup}/>
      {showPopup && <Popup onClose={togglePopup}/>}
    </div>
  );
}

export default App;
