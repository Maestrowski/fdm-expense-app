import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const ExpenseClaims = () => {
  const { transactions, userRole } = useContext(GlobalContext);
  const [claimsStatus, setClaimsStatus] = useState(transactions.reduce((acc, transaction) => {
    acc[transaction.id] = 'unclaimed';
    return acc;
  }, {}));

  const handleClaim = (transactionId) => {
    const newStatus = claimsStatus[transactionId] === 'unclaimed' ? 'pending' : 'unclaimed';
    setClaimsStatus({
      ...claimsStatus,
      [transactionId]: newStatus,
    });
  };

  const handleApprove = (transactionId) => {
    if (userRole !== 'manager') {
      alert('Only managers can approve expenses.');
      return;
    }
    setClaimsStatus({
      ...claimsStatus,
      [transactionId]: 'approved',
    });
  };

  const listItemStyle = (status) => ({
    backgroundColor: status === 'pending' ? '#ADD8E6' : status === 'approved' ? '#90EE90' : 'lightgrey',
    listStyleType: 'none',
    padding: '10px',
    margin: '5px',
    flex: '1 0 21%',
  });

  const buttonStyle = {
    backgroundColor: '#ADD8E6',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    color: 'black',
    margin: '5px',
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 0,
  };

  // New style for the main layout container
  const mainLayoutStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px', // Adjust this value as needed for spacing between sections
  };

  // Style adjustments for side-by-side sections
  const sectionStyle = {
    flex: 1,
    minWidth: '30%', // Ensure sections don't get too narrow; adjust as needed
  };

  return (
    <div style={mainLayoutStyle}>
      <div style={sectionStyle}>
        <h2>Expense Claims</h2>
        <h3>All Expenses</h3>
        <ul style={containerStyle}>
          {transactions.map((transaction) => (
            <li key={transaction.id} style={listItemStyle(claimsStatus[transaction.id])}>
              <p>Date: {transaction.date}</p>
              <p>Expense Name: {transaction.expenseName}</p>
              <p>Expense Type: {transaction.expenseType}</p>
              <p>Value: {transaction.value}</p>
              <button onClick={() => handleClaim(transaction.id)} style={buttonStyle}>
                {claimsStatus[transaction.id] === 'unclaimed' ? 'Claim' : 'Unclaim'}
              </button>
              {userRole === 'manager' && claimsStatus[transaction.id] === 'pending' && (
                <button onClick={() => handleApprove(transaction.id)} style={buttonStyle}>
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div style={sectionStyle}>
        <h3>Pending Claims</h3>
        <ul style={containerStyle}>
          {transactions.filter(transaction => claimsStatus[transaction.id] === 'pending').map((transaction) => (
            <li key={transaction.id} style={listItemStyle('pending')}>
              <p>Date: {transaction.date}</p>
              <p>Expense Name: {transaction.expenseName}</p>
              <p>Expense Type: {transaction.expenseType}</p>
              <p>Value: {transaction.value}</p>
            </li>
          ))}
        </ul>
      </div>

      <div style={{...sectionStyle, minWidth: '30%', flex: '2'}}> {/* Adjusted for a potentially wider approved section */}
        <h3>Approved Claims</h3>
        <ul style={containerStyle}>
          {transactions.filter(transaction => claimsStatus[transaction.id] === 'approved').map((transaction) => (
            <li key={transaction.id} style={listItemStyle('approved')}>
              <p>Date: {transaction.date}</p>
              <p>Expense Name: {transaction.expenseName}</p>
              <p>Expense Type: {transaction.expenseType}</p>
              <p>Value: {transaction.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseClaims;
