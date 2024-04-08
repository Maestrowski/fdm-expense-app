import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { GlobalContext } from '../context/GlobalState';

const ExpenseData = () => {
  const { t } = useTranslation(); // Use useTranslation hook to access translations
  const { transactions } = useContext(GlobalContext);

  return (
    <div>
      <h2>{t('expenseData.title')}</h2> {/* Translate title */}
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>{t('expenseData.dateLabel')}: {transaction.date}</p> {/* Translate date label */}
            <p>{t('expenseData.expenseNameLabel')}: {transaction.expenseName}</p> {/* Translate expense name label */}
            <p>{t('expenseData.expenseTypeLabel')}: {transaction.expenseType}</p> {/* Translate expense type label */}
            <p>{t('expenseData.valueLabel')}: {transaction.value}</p> {/* Translate value label */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseData;
