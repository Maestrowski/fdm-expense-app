import React, { useContext, useState, useRef } from 'react';
import { GlobalContext } from '../context/GlobalState';
import './AddExpense.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const AddExpense = () => {
    const { t } = useTranslation(); // Use useTranslation hook to access translations

    const [date, setDate] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const [value, setValue] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null);
    const { addTransaction, addReceipt } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Expense Submitted:', { date, expenseName, expenseType, value });
        const newTransaction = {
            id: Math.floor(Math.random() * 10000000),
            date,
            expenseName,
            expenseType,
            value: +value,
            receipt: selectedFile
        }

        addTransaction(newTransaction);
        setDate('');
        setExpenseName('');
        setExpenseType('');
        setValue('');
        setSelectedFile(null);
    };

    const handleAttachReceipt = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        addReceipt(e.target.files[0]);
        console.log('Receipt attached successfully')
    }

    return (
        <div className='add-expense'>
            <div className='title-bar'>
                <h1 className='add-title'>{t('addExpense.title')}</h1> {/* Translate title */}
                <div className='title-buttons'>
                    <button className='receipt-btn' onClick={handleAttachReceipt}>
                        {t('addExpense.attachReceiptButton')} {/* Translate button label */}
                    </button>
                </div>
            </div>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='date'>{t('addExpense.dateLabel')}:</label> {/* Translate label */}
                        <input
                            type="text"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder={t('addExpense.datePlaceholder')} // Translate placeholder
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='expenseName'>{t('addExpense.expenseNameLabel')}:</label> {/* Translate label */}
                        <input
                            type="text"
                            id="expenseName"
                            value={expenseName}
                            onChange={(e) => setExpenseName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='expenseType'>{t('addExpense.expenseTypeLabel')}:</label> {/* Translate label */}
                        <input
                            type="text"
                            id="expenseType"
                            value={expenseType}
                            onChange={(e) => setExpenseType(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Value'>{t('addExpense.valueLabel')}:</label> {/* Translate label */}
                        <input
                            type="number"
                            id="value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            title={t('addExpense.valueValidationMessage')}
                            required
                        />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <button className='submit-expense'>{t('addExpense.submitButton')}</button> {/* Translate button label */}
                </form>
            </div>
        </div>
    )
}

export default AddExpense;
