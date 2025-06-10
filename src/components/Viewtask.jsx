import React, { useState, useEffect } from 'react';
import { ArrowLeft, File } from 'lucide-react';

const Viewtask = ({ closeView, dataView }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState({});
  const [priority, setPriority] = useState({});

  useEffect(() => {
    if (dataView) {
      setTitle(dataView.task_title || '');
      setDescription(dataView.task_desc || '');
      setStartDate(dataView.start_date || '');
      setEndDate(dataView.end_date || '');
      setStatus(dataView.status || {});
      setPriority(dataView.priority || {});
    }
  }, [dataView]);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = () => {
    const lower = status?.name?.toLowerCase();
    if (lower === 'completed') return 'bg-green-500 text-white';
    if (lower === 'in progress') return 'bg-yellow-400 text-black';
    if (lower === 'pending') return 'bg-orange-400 text-white';
    return 'bg-gray-300 text-black';
  };

  const getPriorityColor = () => {
    const lower = priority?.level?.toLowerCase();
    if (lower === 'low') return 'bg-green-500 text-white';
    if (lower === 'medium') return 'bg-orange-400 text-black';
    if (lower === 'high') return 'bg-red-500 text-white';
    return 'bg-gray-300 text-black';
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm 
    transition-all duration-500 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl sm:p-10">
        <h1 className="text-xl font-bold text-center text-blue-600 mb-8">📄 View Task</h1>
        <div className="space-y-6">
          {/* Title */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-lg font-semibold text-gray-600">Title</h2>
            <p className="text-[15px] font-medium text-gray-900">{title}</p>
          </div>
          {/* Description */}
          <div className="border-l-4 border-blue-500 pl-4">
            <div className='flex gap-1'>
              <h2 className="text-lg font-semibold text-gray-600">Description</h2>
              <File className='w-5 h-5 text-gray-600' />
            </div>
            <p className="text-gray-800 bg-gray-100 p-4 rounded-md">
              {description}
            </p>
          </div>
          {/* Start and End Dates */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <span className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-base font-semibold">
              📅 Start: {startDate}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-base font-semibold">
              🛑 End: {endDate}
            </span>
          </div>
          {/* Status and Priority */}
          <div className='flex justify-between'>
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">Status</h2>
              <span className={`inline-block px-4 py-2 rounded uppercase tracking-wide text-sm font-bold ${getStatusColor()}`}>
                {status?.name || 'N/A'}
              </span>
            </div>
            <div className="border-r-4 border-blue-500 pr-4">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">Priority</h2>
              <span className={`inline-block px-4 py-2 rounded uppercase tracking-wide text-sm font-bold ${getPriorityColor()}`}>
                {priority?.level || 'N/A'}
              </span>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={closeView}
            className="px-6 py-2 flex gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition">
            <ArrowLeft />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewtask;
