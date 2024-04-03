import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Receipts = () => {
  const { receipts } = useContext(GlobalContext);

  const getFileNameWithoutExtension = (filename) => {
    return filename.split('.').slice(0, -1).join('.');
  };

  const openReceiptInNewTab = (receipt) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.body.innerHTML = `<img src="${URL.createObjectURL(receipt)}" style="cursor: zoom-in; transition: transform 0.2s ease-in-out;" />`;
      newWindow.document.querySelector('img').addEventListener('click', (event) => handleZoom(event, 1.2)); // Initial zoom factor (zoom in)
    }
  };

  const handleZoom = (event, zoomFactor) => {
    event.preventDefault();
    const currentScale = parseFloat(event.target.style.transform.replace('scale(', '').replace(')', ''));
    if (currentScale && currentScale > 1) {
      event.target.style.transform = `scale(${currentScale / zoomFactor})`;
    } else {
      event.target.style.transform = `scale(${zoomFactor})`;
    }
  };

  return (
    <div>
      <h2>Receipts</h2>
      <ul>
        {receipts.map((receipt, index) => (
          <li key={index}>
            <p>Filename: {getFileNameWithoutExtension(receipt.name)}</p>
            <button onClick={() => openReceiptInNewTab(receipt)}>View Receipt</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Receipts;

