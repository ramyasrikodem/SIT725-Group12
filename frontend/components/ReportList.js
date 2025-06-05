import React from 'react';

function ReportList() {
  const scans = [1, 2, 3]; // Replace with real data from API

  return (
    <div className="container mt-4">
      <h3>Download Reports</h3>
      <ul className="list-group">
        {scans.map(id => (
          <li key={id} className="list-group-item">
            <a href={`http://localhost:5001/api/media/report/${id}`} target="_blank" rel="noreferrer">
              Download Report #{id}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportList;
