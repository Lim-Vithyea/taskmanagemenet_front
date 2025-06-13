// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadProfile = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Please select a file first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', file);
//     for (let [key, value] of formData.entries()) {
//         console.log(`${key}:`, value); 
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const API = import.meta.env.VITE_LARAVEL_API_URL;
//       const res = await axios.post(`${API}upload-profile`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}`,},}
//       );-
//       setMessage(res.data.message || 'Upload successful');
//     } catch (error) {
//     console.log(formData)
//       setMessage('Upload failed: ' + (error.response?.data?.error || error.message));
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Profile Picture</h2>
//       <input type="file" onChange={handleFileChange} accept="image/*" />
//       <button onClick={handleUpload}>Upload</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default UploadProfile;
import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const UploadProfile = ({closeUploadPF}) => {
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
      setMessage('❌ Upload failed: ' +(error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/25 backdrop-blur-[5px]'>
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <div className='flex justify-between'>
          <div className='w-5 h-5'></div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Profile Picture</h2>
          <X onClick={closeUploadPF} className='cursor-pointer'/>
        </div>
        <div className="mb-4">
          <input type="file" accept="image/*" onChange={handleFileChange}
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
              className="mx-auto w-24 h-24 object-cover rounded-full border" />
          </div>
        )}
        <button onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Upload
        </button>
        {message && (<p className="mt-4 text-sm text-gray-600">{message}</p>)}
      </div>
    </div>
  );
};

export default UploadProfile;
