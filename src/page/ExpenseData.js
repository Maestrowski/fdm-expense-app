import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const ExpenseData = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <div>
      <h2>Expense Data</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Date: {transaction.date}</p>
            <p>Expense Name: {transaction.expenseName}</p>
            <p>Expense Type: {transaction.expenseType}</p>
            <p>Value: {transaction.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseData;