import React from 'react';
import './Export.css';

const Export = () => {
  const handleDownload = () => {
    const transactions = [];
    const transactionElements = document.querySelectorAll('.transaction');

    transactionElements.forEach(element => {
      const date = element.querySelector('p:nth-child(1)').textContent.split(': ')[1];
      const expenseName = element.querySelector('p:nth-child(2)').textContent.split(': ')[1];
      const expenseType = element.querySelector('p:nth-child(3)').textContent.split(': ')[1];
      const value = element.querySelector('p:nth-child(4)').textContent.split(': ')[1];

      transactions.push({ date, expenseName, expenseType, value });
    });

    const csv = convertToCSV(transactions);
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expense_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    let csv = 'Date,Expense Name,Expense Type,Value\n';
    data.forEach(transaction => {
      const row = `${transaction.date},${transaction.expenseName},${transaction.expenseType},${transaction.value}`;
      csv += row + '\n';
    });
    return csv;
  };

  return (
    <div className="export-container">
      <div className="title-bar">
        <h2 className="export-title">Download Expense Data</h2>
        <button className="export-button" onClick={handleDownload}>Download CSV</button>
      </div>
    </div>
  );
};

export default Export;