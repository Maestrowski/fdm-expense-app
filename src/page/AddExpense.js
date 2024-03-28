import React, {useState} from 'react';
import './AddExpense.css';

const AddExpense = () => {
    const [date, setDate] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Expense Submitted:', { date, expenseName, expenseType, value});
        setDate('');
        setExpenseName('');
        setExpenseType('');
        setValue('');
    };

  return (
    <div className='add-expense'>
        <div className='title-bar'>
            <h1 className='add-title'>Add Expense</h1>
            <div className='title-buttons'>
                <div className='receipt-btn'>
                    Attach Receipt
                </div>
                <div className='submit-btn'>
                    Submit
                </div>
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
                    <label htmlFor='Value'>Value:</label>
                    <input 
                    type="text"
                    id = "value"
                    value = {value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    />
                </div>
                <div className='submit-expense'>
                    <p className='submit-title'>Submit Expense Claim</p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddExpense
