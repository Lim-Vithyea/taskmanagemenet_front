import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SetEditscreen = ({ closeEditFunction, userData}) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [priority,setPriority] = useState('');
  const {user} = useAuth();
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (userData) {
      setTitle(userData.task_title || '');
      setDescription(userData.task_desc || '');
      setStartDate(userData.start_date || '');
      setEndDate(userData.end_date || '');
      setStatus(userData.status?.id?.toString() || ''); // Ensure it's a string
      setPriority(userData.priority?.id?.toString() || '');
    }
  }, [userData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const API = import.meta.env.VITE_LARAVEL_API_URL;
    const token = localStorage.getItem('token');
    const updatedTask = {
        task_title: title,
        task_desc: description,
        start_date: startDate,
        employee_id: userData?.employee_id,
        end_date: endDate,
        status: parseInt(status),
        priority_task: parseInt(priority),
    };
    try {
      const response = await axios.patch(`${API}tasks/${userData.id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}`},
      });
      console.log("Update response:", response.data);
      setMessage({ type: 'success', text: ' Task update successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      console.error("Update error:", err);
      console.log(updatedTask);
    }
  };

  return (
    <div className={`transition-all duration-500 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-sm z-50`}>
      <div className='w-[700px] h-auto bg-white rounded-xs shadow-2xl px-10 py-8'>
        <h1 className='text-center font-bold text-2xl text-blue-600 mb-6'> 🖊️Edit Task</h1>
        {message.text && (
          <div className={`mt-4 p-2 rounded text-center font-medium 
            ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className='flex gap-10 justify-center pt-2'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='task_title' className='mb-2 text-sm font-medium text-gray-700'>Task Title</label>
              <input
                type="text"
                value={title}
                readOnly={user?.role === "2"}
                onChange={(e) => setTitle(e.target.value)}
                className={`p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
                placeholder='Add task title'
                required
              />
            </div>

            <div className='flex flex-col w-[300px]'>
              <label htmlFor='task_desc' className='mb-2 text-sm font-medium text-gray-700'>Task Description</label>
              <textarea
                value={description}
                readOnly={user?.role === "2"}
                onChange={(e) => setDescription(e.target.value)}
                className='p-3 border border-gray-300 rounded-lg h-[100px] resize-none focus:ring-2 focus:ring-blue-500 outline-none'
                placeholder='Enter task details...'
              />
            </div>
          </div>

          <div className='flex gap-10 justify-center pt-6'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='start_date' className='mb-2 text-sm font-medium text-gray-700'>Start Date</label>
              <input
                type="date"
                value={startDate}
                readOnly={user?.role === "2"}
                onChange={(e) => setStartDate(e.target.value)}
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                required
              />
            </div>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='end_date' className='mb-2 text-sm font-medium text-gray-700'>End Date</label>
              <input
                type="date"
                readOnly={user?.role === "2"}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                required
              />
            </div>
          </div>

          <div className='flex gap-10 justify-center pt-6'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='status' className='mb-2 text-sm font-medium text-gray-700'>Status</label>
              <select
               
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required>
                <option value="">Select status</option>
                <option value="1">Pending</option>
                <option value="2">In progress</option>
                <option value="3">Completed</option>
              </select>
            </div>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='status' className='mb-2 text-sm font-medium text-gray-700'>Status</label>
              <select
                disabled={user?.role === "2"}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required>
                <option value="">Select priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-8">
            <button
              type="button"
              onClick={closeEditFunction}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
              Cancel
            </button>
            <Button name="Save" color="bg-blue-500 hover:bg-blue-600" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetEditscreen;
