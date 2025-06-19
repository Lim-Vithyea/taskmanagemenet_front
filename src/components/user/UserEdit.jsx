import React, { useState } from 'react'
import { useEffect } from 'react';
import Button from '../Button';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const UserEdit = ({closeEditUser,userEditData}) => {
  const [show,setShow] = useState(false);
  const [userId,setUserId] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [role,setRole] = useState("");
  const {API,token} = useAuth();
  const [newPassword,setNewpassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
 
  useEffect(()=>{
    if(userEditData){
      setUserId(userEditData.id || "")
      setUsername(userEditData.name || "");
      setRole(userEditData.role);
      setEmail(userEditData.email);
    }
  },[userEditData])

  useEffect(() => {
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    }, []);

  const handleAddNewPassword = () => {
    setNewpassword(true);
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const updatedUser = {
    name: username,
    email: email,
    role: role
  };
  if (newPassword && password) {
    updatedUser.password = password;
    updatedUser.password_confirmation = password;
  }
  try {
    const res = await axios.patch(`${API}users/${userId}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    //closeEditUser();
    setMessage({ type: 'success', text: ' user update successfully' });
  } catch (err) {
    console.error("Update failed:", err.response?.data || err.message);
  }
};

  return (
    <div className={`transition-all duration-500 ease-out 
      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
      flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-sm z-50`}>
        <div className='w-[700px] h-auto bg-white rounded-2xl shadow-2xl px-10 py-8'>
          <h1 className=' text-center font-bold text-2xl text-blue-600 mb-6'>🖊️User edit</h1>
           {message.text && (
          <div className={`mt-4 p-2 rounded text-center font-medium 
            ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="name"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="John"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Select Role</label>
              <select
                name="role"
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required>
                <option value="">Select role</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
            </div>
          </div>
          <div className='flex'>
          <button
              onClick={handleAddNewPassword}
              type="button"
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition">
              Set new password?
            </button>
            <p className='flex items-center text-gray-400 px-5'>old password doesn't required</p>
          </div>
            {newPassword && (
              <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="••••••••"
                required
              />
            </div>
            )}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeEditUser}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
              Cancel
            </button>
            <Button name="Save" color="bg-blue-500 hover:bg-blue-600" type="submit" />
          </div>
        </form>
        </div>
    </div>
  )
}

export default UserEdit;
