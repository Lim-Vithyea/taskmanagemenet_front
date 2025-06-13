import React, { useState } from 'react';
import axios from 'axios';

const UploadProfile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value); 
    }

    try {
      const token = localStorage.getItem('token');
      const API = import.meta.env.VITE_LARAVEL_API_URL;
      const res = await axios.post(`${API}upload-profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}`,},}
      );
      setMessage(res.data.message || 'Upload successful');
    } catch (error) {
    console.log(formData)
      setMessage('Upload failed: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <h2>Upload Profile Picture</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadProfile;
