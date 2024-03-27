import React from 'react'

const LeftBar = ({isOpen}) => {
  return (
    <div className={`left-navbar ${isOpen ? 'open' : ''}`}>
      <div className='nav-item'>
        <img src={`icons/Logo.png`} className='nav-logo'/>
      </div>
      <div className='nav-item'>
        <img src={`icons/Plus.png`} className='nav-icon'/>
        <p className='item-title'>Add Expense</p>
      </div>
      <div className='nav-item'>
        <img src={`icons/ExpData.png`} className='nav-icon'/>
        <p className='item-title'>Expense Data</p>
      </div>
      <div className='nav-item'>
        <img src={`icons/Receipts.png`} className='nav-icon'/>
        <p className='item-title'>Receipts</p>
      </div>
      <div className='nav-item'>
        <img src={`icons/ExpClaim.png`} className='nav-icon'/>
        <p className='item-title'>Expense Claims</p>
      </div>
      <div className='nav-item'>
        <img src={`icons/Export.png`} className='nav-icon'/>
        <p className='item-title'>Export</p>
      </div>
      <div className='nav-item'>
        <img src={`icons/Settings.png`} className='nav-icon'/>
        <p className='item-title'>Settings</p>
      </div>
    </div>
  )
}

export default LeftBar
