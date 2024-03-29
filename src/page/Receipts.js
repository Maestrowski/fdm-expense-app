import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Receipts = () => {
  const { receipts } = useContext(GlobalContext);

  return (
    <div>
      <h2>Receipts</h2>
      <ul>
        {receipts.map((receipt, index) => (
          <li key={index}>
            <p>Filename: {receipt.name}</p>
            <img src={URL.createObjectURL(receipt)} alt={`Receipt ${index}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Receipts;
