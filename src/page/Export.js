import React, { useState } from 'react';
import './Export.css'; 

const Export = ({ receiptData }) => {
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
        <h2 className="export-title">Download Receipt</h2>
        <select className="format-select" value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
        <button className="export-button" onClick={handleDownload}>Download</button>
      </div>
    </div>
  )
}

export default Export