import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  transactions: [],
  receipts: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  function addReceipt(receipt) {
    dispatch({
        type: 'ADD_RECEIPT',
        payload: receipt
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    receipts: state.receipts,
    addTransaction,
    addReceipt
  }}>
    {children}
  </GlobalContext.Provider>);
}