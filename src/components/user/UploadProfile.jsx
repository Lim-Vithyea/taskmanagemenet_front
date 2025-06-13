import React, { useState } from 'react';
import axios from 'axios';

const UploadProfile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('⚠️ Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const API = import.meta.env.VITE_LARAVEL_API_URL;

      const res = await axios.post(`${API}upload-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || '✅ Upload successful');
    } catch (error) {
      setMessage(
        '❌ Upload failed: ' +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Profile Picture</h2>

        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {file && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="mx-auto w-24 h-24 object-cover rounded-full border"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default UploadProfile;
