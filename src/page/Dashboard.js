import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import "../page/Dashboard.css";
import { Pie } from 'react-chartjs-2';


import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const Dashboard = () => {
  
  const { t } = useTranslation();
  
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
      setError(t('dashboard.selectCurrency'));
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
      setError(t('dashboard.loadExchangeRatesFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  /* Exchange Currency - End */

  /* pie chart - Start */

  
  const expensesByCategory = transactions.reduce((acc, transaction) => {
    const { expenseType, value } = transaction;
    acc[expenseType] = (acc[expenseType] || 0) + Number(value);
    return acc;
  }, {});

  
  const categoryColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  
  const totalExpenses = Object.values(expensesByCategory).reduce((acc, value) => acc + value, 0);

  const pieChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      data: Object.values(expensesByCategory).map(value => ((value / totalExpenses) * 100).toFixed(2)),
      backgroundColor: categoryColors,
      hoverOffset: 4
    }]
  };

  const pieChartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false, 
    },
    
  };
  

  

  /* pie chart - End */
  

  return (

    <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div className="grid-two-item grid-common Expenses-Dashboard" style={{ marginRight: '10px' }}>
          <div className="grid-c-title">
              <h3 className="grid-c-title-text">{t('dashboard.expenses')}</h3>
              <button className="grid-c-title-icon">
                  {/* Place for button icon */}
              </button>
          </div>
          <div className="grid-c-top text-silver-v1">
              <h2 className="lg-value">{t('dashboard.totalExpenses')}</h2>
              <span className="lg-value">£ {total.toFixed(2)}</span> 
          </div>
          <div className="grid-c4-content bg-jet">
              <div className="grid-items">
                  {
                      
                      transactions.map((transaction) => (
                          <div className="grid-item" key={transaction.id}>
                              <div className="grid-item-l">
                                  <div className="icon">
                                      {/* Place for item icon */}
                                  </div>
                                  <p className="text text-silver-v1">{t('dashboard.transaction.expenseName')}: {transaction.expenseName} <span>{t('dashboard.transaction.expenseType')}: {transaction.expenseType}</span></p>
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
          <h1>{t('dashboard.exchangeRates')}</h1>
          <div className="grid-c-title">
            <select
              value={targetCurrency}
              onChange={handleTargetCurrencyChange}
              className="currency-dropdown text-silver-v1"
            >
              <option value="">{t('dashboard.selectCurrency')}</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          {loading ? (
            <p className="text-silver-v1">{t('dashboard.loading')}</p>
          ) : error ? (
            <p className="text-scarlet">{error}</p>
          ) : exchangeRates && (
            <div className="grid-c4-content">
              <h2>{t('dashboard.baseCurrency', { baseCurrency, total: total.toFixed(2), targetCurrency })}</h2>
              <ul>
                {exchangeRates && targetCurrency in exchangeRates.rates ? (
                  <li className="text-green">
                    {targetCurrency}: {(exchangeRates.rates[targetCurrency] * total).toFixed(2)}
                  </li>
                ) : (
                  <p className="text-scarlet">{t('dashboard.targetCurrencyNotAvailable')}</p>
                )}
              </ul>
            </div>
          )}
        </div>

      

        {/*<Loans/>*/}

        {/*
        <div className="pie-chart-widget" style={{ backgroundColor: '#333', color: '#fff', marginLeft: '20px' }}>
          <h3>Expenses by Currency Type</h3>
          <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
        </div>  
                */}

      </div>

      {/* Pie Chart widget */}
    <div className="grid-common pie-chart-widget">
      <h3>{t('dashboard.expensesByCategory')}</h3>
      <div style={{ height: '300px' }}>
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
      {/* Legend Part */}
      <div className="chart-legend">
        {pieChartData.labels.map((label, index) => {
          const value = pieChartData.datasets[0].data[index];
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', color: 'white', marginTop: '10px' }}>
              <span style={{
                backgroundColor: categoryColors[index],
                width: '20px',
                height: '20px',
                display: 'inline-block',
                marginRight: '10px',
                borderRadius: '50%',
              }}></span>
              {label}: {value}%
            </div>
          );
        })}
      </div>
    </div>


    </div>
  );
};

export default Dashboard;
