import React, { useState } from 'react'
import { useEffect } from 'react';

const Viewtask = ({closeView,dataView}) => {
    
    const [show, setShow] = useState(false);
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [status,setStatus] = useState('');

    useEffect(() => {
        if (dataView) {
          setTitle(dataView.title || '');
          setDescription(dataView.desc || '');
          setStartDate(dataView.timeS || '');
          setEndDate(dataView.timeE || '');
          setStatus(dataView.status || '');
        }
      }, [dataView]);
    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 10);
        return () => clearTimeout(timer);
      }, []);


  return (
    <div>
      <div className={`transition-all duration-500 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-sm z-50`}>
      <div className='w-[800px] h-auto bg-white rounded-2xl shadow-2xl px-10 py-8'>
        <h1 className='text-center font-bold text-2xl text-blue-600 mb-6'>Edit Task</h1>
        <form>
          <div className='flex gap-10 justify-center pt-2'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='task_title' className='mb-2 text-sm font-medium text-gray-700'>Task Title</label>
              <input
                type="text"
                value={title}
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                placeholder='Add task title'
                required readOnly
              />
            </div>

            <div className='flex flex-col w-[300px]'>
              <label htmlFor='task_desc' className='mb-2 text-sm font-medium text-gray-700'>Task Description</label>
              <textarea
                readOnly
                value={description}
                className='p-3 border border-gray-300 rounded-lg h-[100px] resize-none focus:ring-2 focus:ring-blue-500 outline-none'
                placeholder='Enter task details...'
              />
            </div>
          </div>

          <div className='flex gap-10 justify-center pt-6'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='start_date' className='mb-2 text-sm font-medium text-gray-700'>Start Date</label>
              <input
                readOnly
                value={startDate}
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                required
              />
            </div>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='end_date' className='mb-2 text-sm font-medium text-gray-700'>End Date</label>
              <input
                readOnly
                value={endDate}
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                required
              />
            </div>
          </div>

          <div className='flex gap-10 justify-center pt-6'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='status' className='mb-2 text-sm font-medium text-gray-700'>Status</label>
             <input
                readOnly
                value={status}
                className={`p-3 border border-gray-300 ${status === "completed".toLowerCase() ? "bg-green-500" : "bg-yellow-400"} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
                required
              />
            </div>
            <div className='w-[300px]'></div> 
          </div>

          <div className="flex justify-end gap-4 pt-8">
            <button
              type="button"
              onClick={closeView}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
              Back to home
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Viewtask
