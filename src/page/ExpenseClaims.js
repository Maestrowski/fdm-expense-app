import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { GlobalContext } from '../context/GlobalState';

const ExpenseClaims = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
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
      alert(t('expenseClaims.managerApproval')); // Translate alert message
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
        <h2>{t('expenseClaims.title')}</h2>
        <h3>{t('expenseClaims.allExpenses')}</h3>
        <ul style={containerStyle}>
          {transactions.map((transaction) => (
            <li key={transaction.id} style={listItemStyle(claimsStatus[transaction.id])}>
              <p>{t('expenseData.dateLabel')}: {transaction.date}</p>
              <p>{t('expenseData.expenseNameLabel')}: {transaction.expenseName}</p>
              <p>{t('expenseData.expenseTypeLabel')}: {transaction.expenseType}</p>
              <p>{t('expenseData.valueLabel')}: {transaction.value}</p>
              <button onClick={() => handleClaim(transaction.id)} style={buttonStyle}>
                {claimsStatus[transaction.id] === 'unclaimed' ? t('expenseClaims.claimButton') : t('expenseClaims.unclaimButton')}
              </button>
              {userRole === 'manager' && claimsStatus[transaction.id] === 'pending' && (
                <button onClick={() => handleApprove(transaction.id)} style={buttonStyle}>
                  {t('expenseClaims.approveButton')}
                </button>
              )}
            </li>
          ))}
        </ul>
  </div>
      
      <div style={sectionStyle}>
        <h3>{t('expenseClaims.pendingClaims')}</h3>
        <ul style={containerStyle}>
          {transactions.filter(transaction => claimsStatus[transaction.id] === 'pending').map((transaction) => (
            <li key={transaction.id} style={listItemStyle('pending')}>
              <p>{t('expenseData.dateLabel')}: {transaction.date}</p>
              <p>{t('expenseData.expenseNameLabel')}: {transaction.expenseName}</p>
              <p>{t('expenseData.expenseTypeLabel')}: {transaction.expenseType}</p>
              <p>{t('expenseData.valueLabel')}: {transaction.value}</p>
            </li>
          ))}
        </ul>
      </div>


      <div style={{...sectionStyle, minWidth: '30%', flex: '2'}}> {/* Adjusted for a potentially wider approved section */}
      <h3>{t('expenseClaims.approvedClaims')}</h3> {/* Translate the section title */}
      <ul style={containerStyle}>
          {transactions.filter(transaction => claimsStatus[transaction.id] === 'approved').map((transaction) => (
            <li key={transaction.id} style={listItemStyle('approved')}>
                <p>{t('expenseData.dateLabel')}: {transaction.date}</p> {/* Translate date label */}
                <p>{t('expenseData.expenseNameLabel')}: {transaction.expenseName}</p> {/* Translate expense name label */}
                <p>{t('expenseData.expenseTypeLabel')}: {transaction.expenseType}</p> {/* Translate expense type label */}
                <p>{t('expenseData.valueLabel')}: {transaction.value}</p> {/* Translate value label */}
            </li>
        ))}
    </ul>
  </div>

    </div>
  );
};

export default ExpenseClaims;
