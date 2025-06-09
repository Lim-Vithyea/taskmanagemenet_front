import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useStateProps } from '../context/StateContext';
import axios from 'axios';

const AssignTask = () => {
  const [show, setShow] = useState(false);
  const {isCloseAdd} = useStateProps();
  const [employee,setEmployee] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  //fetch employee data 
  useEffect(()=>{
    const fetchUsers = async () => {
    try {
      const API = import.meta.env.VITE_LARAVEL_API_URL;
      console.log("API URL:", API);
      const response = await axios.get(`${API}getuser`);
      console.log("Fetched inside fetch:", response.data);
      setEmployee(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setErr(err.response?.data?.error || err.message);
    }
  };
  fetchUsers();
  },[])

  return (
    <div className={`transition-all duration-500 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-sm z-50`}>
      <div className='w-[700px] h-auto bg-white rounded-2xl shadow-2xl px-10 py-8'>
        <h1 className='text-center font-bold text-2xl text-blue-600 mb-6'>⚒️Assign Task for Employee</h1>

        <form>
          <div className='flex gap-10 justify-center pt-2'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='task_title' className='mb-2 text-sm font-medium text-gray-700'>Task Title</label>
              <input 
                type="text"
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                placeholder='Add task title'
              required/>
            </div>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='task_desc' className='mb-2 text-sm font-medium text-gray-700'>Task Description</label>
              <textarea 
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
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
              required/>
            </div>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='end_date' className='mb-2 text-sm font-medium text-gray-700'>End Date</label>
              <input 
                type="date"
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
              required/>
            </div>
          </div>

          <div className='flex gap-10 justify-center pt-6'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='employee' className='mb-2 text-sm font-medium text-gray-700'>Select Employee</label>
              <select
                id="employee"
                name="employee"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required>
                  <option>Select an employee</option>
                {employee.map((data) => (
                  <option className="khmer-text" key={data.id} value={data.id}>{data.name}</option>
                  ))}
              </select>
            </div>
            <div className='w-[300px] flex flex-col'>
               <label htmlFor='status' className='mb-2 text-sm font-medium text-gray-700'>Select status</label>
                <select
                id="status"
                name="status"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option>Select status</option>
                <option value="In complete">In completed</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
                </select>
            </div>
          </div>
          <div className='flex gap-10 justify-center pt-6'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='employee' className='mb-2 text-sm font-medium text-gray-700'>Select priority</label>
              <select
                id="priority"
                name="priority"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option>Select priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className='w-[300px] flex flex-col'></div>
          </div>
          <div className="flex justify-end gap-4 pt-5">
            <button
              type="button"
              onClick={isCloseAdd}
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

export default AssignTask;
