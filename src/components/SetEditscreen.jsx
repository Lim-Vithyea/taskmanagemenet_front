import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useStateProps } from '../context/StateContext';
import { useAuth } from '../context/AuthContext';

const SetEditscreen = ({ closeEditFunction, userData }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [priority,setPriority] = useState('');
  const {user} = useAuth();

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
      setStatus(userData.status || {});
      setPriority(userData.priority || {});
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...userData,
      title,
      desc,
      timeS: startDate,
      timeE: endDate,
      status,
    };
    console.log("Updated Data:", updatedUser);
    closeEditFunction(); 
  };


  return (
    <div className={`transition-all duration-500 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-sm z-50`}>
      <div className='w-[700px] h-auto bg-white rounded-2xl shadow-2xl px-10 py-8'>
        <h1 className='text-center font-bold text-2xl text-blue-600 mb-6'> 🖊️Edit Task</h1>
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
                value={status?.name }
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
              <label htmlFor='status' className='mb-2 text-sm font-medium text-gray-700'>Priority</label>
              <select
                value={priority?.level}
                readOnly={user?.role === "2"}
                onChange={(e) => setStatus(e.target.value)}
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
