import React, { useState } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';
import Chatbox from './components/Chatbox';
import Popup from './components/Popup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddExpense from './page/AddExpense';


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
    <Router> {/* Wrap your app with the Router component */}
      <div className="container">
        <LeftBar isOpen={openLeftBar}/>
        <div className='main-content'>
        <Routes> {/* Define routes inside the Switch component */}
          <Route path="/add-expense" element={<AddExpense />} /> {/* Route to the new expense input page */}
        </Routes>
        </div>
        <TopBar onSlideIconClick={handleSlideIconClick} openLeftBar={openLeftBar}/>
        <Chatbox onChatboxClick ={togglePopup}/>
        {showPopup && <Popup onClose={togglePopup}/>}
      </div>
    </Router>
  );
}

export default App;
