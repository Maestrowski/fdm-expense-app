import React, { useState } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';
import Chatbox from './components/Chatbox';
import Popup from './components/Popup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddExpense from './page/AddExpense';
import ExpenseData from './page/ExpenseData';
import Receipts from './page/Receipts';
import ExpenseClaims from './page/ExpenseClaims';
import Export from './page/Export';
import Settings from './page/Settings';
import Login from './page/Login';
import {GlobalProvider} from './context/GlobalState';


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
    <GlobalProvider>
    <Router> {/* Wrap your app with the Router component */}
      <div className="container">
        <LeftBar isOpen={openLeftBar}/>
        <div className='main-content'>
        <Routes> {/* Define routes inside the Switch component */}
          <Route path='/' element={<div></div>}/>
          <Route path="/add-expense" element={<AddExpense />} />{' '} 
          <Route path="/expense-data" element={<ExpenseData />} />{' '} 
          <Route path="/receipts" element={<Receipts />} />{' '}
          <Route path="/expense-claims" element={<ExpenseClaims />} />{' '}
          <Route path="/export" element={<Export />} />{' '}
          <Route path="/settings" element={<Settings />} />{' '}
          <Route path="/login" element={<Login />} />{' '}
        </Routes>
        </div>
        <TopBar onSlideIconClick={handleSlideIconClick} openLeftBar={openLeftBar}/>
        <Chatbox onChatboxClick ={togglePopup}/>
        {showPopup && <Popup onClose={togglePopup}/>}
      </div>
    </Router>
    </GlobalProvider>
  );
}

export default App;
