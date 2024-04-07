import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import "../page/Dashboard.css";
import { Pie } from 'react-chartjs-2';

const Dashboard = () => {
  
  const { transactions } = useContext(GlobalContext);

  
  const total = transactions.reduce((acc, transaction) => acc + Number(transaction.value), 0);

  /* Exchange Currency - Start */
  const [baseCurrency] = useState('GBP'); 
  const [targetCurrency, setTargetCurrency] = useState('');
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const currencies = ['USD', 'EUR', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD'];

  useEffect(() => {
    if (targetCurrency) {
      fetchExchangeRates();
    }
  }, [targetCurrency]);  

  const fetchExchangeRates = async () => {
    if (!targetCurrency) {
      setError('Please specify the target currency.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExchangeRates(data);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setError('Failed to load exchange rates.');
    } finally {
      setLoading(false);
    }
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  /* Exchange Currency - End */

  /* pie chart - Start */

  const expensesByCurrency = transactions.reduce((acc, transaction) => {
    const { expenseType, value } = transaction;
    acc[expenseType] = (acc[expenseType] || 0) + Number(value);
    return acc;
  }, {});
  
  
  const pieChartData = {
    labels: Object.keys(expensesByCurrency),
    datasets: [{
      data: Object.values(expensesByCurrency),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', 
        // ...
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', 
        // ...
      ]
    }]
  };

  /* pie chart - End */
  

  return (
    <div className="grid-two-item grid-common Expenses-Dashboard">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Expenses</h3>
            <button className="grid-c-title-icon">
                {/* Placeholder for button icon */}
            </button>
        </div>
        <div className="grid-c-top text-silver-v1">
            <h2 className="lg-value">Total </h2>
            <span className="lg-value">£ {total.toFixed(2)}</span> 
        </div>
        <div className="grid-c4-content bg-jet">
            <div className="grid-items">
                {
                    
                    transactions.map((transaction) => (
                        <div className="grid-item" key={transaction.id}>
                            <div className="grid-item-l">
                                <div className="icon">
                                    {/* Placeholder for item icon */}
                                </div>
                                <p className="text text-silver-v1">{transaction.expenseName} <span>{transaction.expenseType}</span></p>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-silver-v1">£ {Number(transaction.value).toFixed(2)}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

        <div className="Currency-Conversion-Section grid-common">
        <h1>Exchange Rates</h1>
        <div className="grid-c-title">
          <select
            value={targetCurrency}
            onChange={handleTargetCurrencyChange}
            className="currency-dropdown text-silver-v1"
          >
            <option value="">Select a currency</option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <p className="text-silver-v1">Loading...</p>
        ) : error ? (
          <p className="text-scarlet">{error}</p>
        ) : exchangeRates && (
          <div className="grid-c4-content">
            <h2>Base: {baseCurrency}, Amount: {total.toFixed(2)}, Target: {targetCurrency}</h2>
            <ul>
              {exchangeRates && targetCurrency in exchangeRates.rates ? (
                <li className="text-green">
                  {targetCurrency}: {(exchangeRates.rates[targetCurrency] * total).toFixed(2)}
                </li>
              ) : (
                <p className="text-scarlet">Target currency not available in rates.</p>
              )}
            </ul>
          </div>
        )}
      </div>

      {/*
      <div className="pie-chart-widget" style={{ backgroundColor: '#333', color: '#fff', marginLeft: '20px' }}>
        <h3>Expenses by Currency Type</h3>
        <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
      </div>  
              */}

    </div>
  );
};

export default Dashboard;
