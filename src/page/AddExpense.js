import React, {useContext, useState, useRef} from 'react';
import {GlobalContext} from '../context/GlobalState';
import './AddExpense.css';

const AddExpense = () => {
    const [date, setDate] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const [value, setValue] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null);
    const { addTransaction, addReceipt } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Expense Submitted:', { date, expenseName, expenseType, value});
        const newTransaction = {
            id: Math.floor(Math.random()*10000000),
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
            <h1 className='add-title'>Add Expense</h1>
            <div className='title-buttons'>
                <button className='receipt-btn' onClick={handleAttachReceipt}>
                    Attach Receipt
                </button>
            </div>
        </div>
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='date'>Date:</label>
                    <input 
                    type="text"
                    id = "date"
                    value = {date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder='DD/MM/YYYY'
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='expenseName'>Expense Name:</label>
                    <input 
                    type="text"
                    id = "expenseName"
                    value = {expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='expenseType'>Expense Type:</label>
                    <input 
                    type="text"
                    id = "expenseType"
                    value = {expenseType}
                    onChange={(e) => setExpenseType(e.target.value)}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='Value'
                    >Value: <br />
                    ("-" = expense, "+" = income)</label>
                    <input 
                    type="text"
                    id = "value"
                    value = {value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    />
                </div>
                <input 
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
                />
                <button className='submit-expense'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddExpense
