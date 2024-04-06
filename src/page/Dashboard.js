import React, { useState, useEffect } from 'react';
import { budget } from "../page/data.js";
import "../page/Dashboard.css";

const Dashboard = () => {
  const [baseCurrency] = useState('GBP'); // Base currency is always GBP
  const [targetCurrency, setTargetCurrency] = useState('');
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // List of currencies for the dropdown
  const currencies = ['USD', 'EUR', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD'];

  const totalExpenses = budget.reduce((acc, curr) => acc + curr.amount, 0);
  

  useEffect(() => {
    if (targetCurrency) {
      fetchExchangeRates();
    }
  }, [targetCurrency]);  // useEffect will trigger fetchExchangeRates when targetCurrency changes

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

  return (
    <div className="app">
      <div className="Expenses-Section grid-common">
        <h1>Expenses</h1>
        <div className="grid-two-item">
          {budget.map((item) => (
            <div className="grid-item" key={item.id}>
              <div className="grid-item-l">
                <p className="text text-silver-v1">{item.title} <span>{item.type}</span></p>
              </div>
              <div className="grid-item-r">
                <span className="text-silver-v1">£ {item.amount}</span>
              </div>
            </div>
          ))}
          <div className="grid-c-top">
            <h2>Total Expenses: </h2>
            <span className="lg-value">£{totalExpenses}</span>
          </div>
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
            <h2>Base: {baseCurrency}, Amount: {totalExpenses}, Target: {targetCurrency}</h2>
            <ul>
              {targetCurrency in exchangeRates.rates ? (
                <li className="text-green">
                  {targetCurrency}: {(exchangeRates.rates[targetCurrency] * totalExpenses).toFixed(2)}
                </li>
              ) : (
                <p className="text-scarlet">Target currency not available in rates.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
