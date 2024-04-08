import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { GlobalContext } from '../context/GlobalState';

const Receipts = () => {
  const { t } = useTranslation(); // Use useTranslation hook to access translations
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
      <h2>{t('receipts.title')}</h2> {/* Translate title */}
      <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Remove bullet points and padding */}
        {receipts.map((receipt, index) => (
          <li key={index}>
            <p>{getFileNameWithoutExtension(receipt.name)}</p>
            <button onClick={() => openReceiptInNewTab(receipt)}>{t('receipts.viewReceiptButton')}</button> {/* Translate button label */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Receipts;
