import React, { useState } from 'react';
import './Export.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Export = ({ receiptData }) => {
  const { t } = useTranslation(); // Initialize useTranslation hook

  const [selectedFormat, setSelectedFormat] = useState('csv');

  const handleDownload = () => {
    let formattedData;
    let mimeType;
    let fileExtension;

    switch (selectedFormat) {
      case 'csv':
        formattedData = convertToCSV(receiptData);
        mimeType = 'text/csv';
        fileExtension = 'csv';
        break;
      case 'json':
        formattedData = JSON.stringify(receiptData, null, 2);
        mimeType = 'application/json';
        fileExtension = 'json';
        break;
      default:
        return;
    }

    const encodedUri = encodeURI(`data:${mimeType};charset=utf-8,${formattedData}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `receipt.${fileExtension}`);
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    return data.map(row => row.join(",")).join("\n");
  };

  return (
    <div className="export-container">
      <div className="title-bar">
        <h2 className="export-title">{t('export.title')}</h2> {/* Translate title */}
        <select className="format-select" value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
          <option value="csv">{t('export.csvOption')}</option> {/* Translate CSV option */}
          <option value="json">{t('export.jsonOption')}</option> {/* Translate JSON option */}
        </select>
        <button className="export-button" onClick={handleDownload}>{t('export.downloadButton')}</button> {/* Translate download button */}
      </div>
    </div>
  )
}

export default Export;
