import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../context/GlobalState';
import './ExpenseClaims.css';

const ExpenseClaims = () => {
  const { t } = useTranslation();
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
      alert(t('expenseClaims.managerApproval'));
      return;
    }
    setClaimsStatus({
      ...claimsStatus,
      [transactionId]: 'approved',
    });
  };


  return (
    <div className="mainLayout">
      <div className="section">
        <h2>{t('expenseClaims.title')}</h2>
        <h3>{t('expenseClaims.allExpenses')}</h3>
        <ul className="claim-container">
          {transactions.length === 0 ? (
                <p>{t('expenseClaims.noExpensesMessage')}</p>
                ) : (
            transactions.map((transaction) => (
              <li key={transaction.id} className={`listItem ${claimsStatus[transaction.id]}`}>
                <p>{t('expenseData.dateLabel')}: {transaction.date}</p>
                <p>{t('expenseData.expenseNameLabel')}: {transaction.expenseName}</p>
                <p>{t('expenseData.expenseTypeLabel')}: {transaction.expenseType}</p>
                <p>{t('expenseData.valueLabel')}: {transaction.value}</p>
                <button onClick={() => handleClaim(transaction.id)} className="button">
                  {claimsStatus[transaction.id] === 'unclaimed' ? t('expenseClaims.claimButton') : t('expenseClaims.unclaimButton')}
                </button>
                {userRole === 'manager' && claimsStatus[transaction.id] === 'pending' && (
                  <button onClick={() => handleApprove(transaction.id)} className="button">
                    {t('expenseClaims.approveButton')}
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="section">
        <h3>{t('expenseClaims.pendingClaims')}</h3>
        <ul className="container">
         
           { transactions.filter(transaction => claimsStatus[transaction.id] === 'pending').map((transaction) => (
              <li key={transaction.id} className="listItem pending">
                <p>{t('expenseData.dateLabel')}: {transaction.date}</p>
                <p>{t('expenseData.expenseNameLabel')}: {transaction.expenseName}</p>
                <p>{t('expenseData.expenseTypeLabel')}: {transaction.expenseType}</p>
                <p>{t('expenseData.valueLabel')}: {transaction.value}</p>
              </li>
            ))
          
            }
             </ul>
      </div>

      <div className="section" style={{ minWidth: '30%', flex: '2' }}>
        <h3>{t('expenseClaims.approvedClaims')}</h3>
        <ul className="container">
       
          {  transactions.filter(transaction => claimsStatus[transaction.id] === 'approved').map((transaction) => (
              <li key={transaction.id} className="listItem approved">
                <p>{t('expenseData.dateLabel')}: {transaction.date}</p>
                <p>{t('expenseData.expenseNameLabel')}: {transaction.expenseName}</p>
                <p>{t('expenseData.expenseTypeLabel')}: {transaction.expenseType}</p>
                <p>{t('expenseData.valueLabel')}: {transaction.value}</p>
              </li>
            ))
          
          }
        </ul>
      </div>
    </div>
  );
};

export default ExpenseClaims;
