import React, { useState } from 'react';
import API from '../../services/api';

function UploadMedia() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append('media', file);
    const token = localStorage.getItem('token');
    const res = await API.post('/media/upload', formData,{
        headers: {
          'Authorization': `Bearer ${token}`,
        }
  });
    setResult(res.data);
  };

  return (
    <div className="container mt-4">
      <h3>Upload Media</h3>
      <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
      <button className="btn btn-primary mt-3" onClick={upload}>Scan</button>
      {result && (
        <div className="mt-3 alert alert-info">
          <strong>Result:</strong> {result.result} <br />
          <strong>Confidence:</strong> {result.confidence}%
        </div>
      )}
    </div>
  );
}

export default UploadMedia;
