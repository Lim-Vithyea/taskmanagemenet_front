import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useStateProps } from '../context/StateContext';
import axios from 'axios';
import { Calendar, Pen, TrendingUp, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import profilePic from "../assets/pfpic.jpg"

const AssignTask = ({onTaskAdded}) => {
  const [show, setShow] = useState(false);
  const { isCloseAdd } = useStateProps();
  const [message, setMessage] = useState({ type: '', text: '' });
  const [employee, setEmployee] = useState([]);
  const [priority, setPriority] = useState([]);
  const [status, setStatus] = useState([]);
  const {API_PIC} = useAuth();
  const [taskData, setTaskData] = useState({
    task_title: "",
    task_desc: "",
    start_date: "",
    end_date: "",
    employee_id: "",
    status: "",
    priority_task: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const API = import.meta.env.VITE_LARAVEL_API_URL;

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}getuser`,
           { headers: { 
            Authorization: `Bearer ${token}` 
          }
        }
        );
        setEmployee(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    const fetchPriorities = async () => {
      try {
        const response = await axios.get(`${API}getprio`);
        setPriority(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${API}getstatus`);
        setStatus(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUsers();
    fetchPriorities();
    fetchStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const API = import.meta.env.VITE_LARAVEL_API_URL;
      await axios.post(`${API}createtask`, taskData,
          { headers: { 
            Authorization: `Bearer ${token}` 
          }
        }
      );
      setTaskData({
        task_title: "",
        task_desc: "",
        start_date: "",
        end_date: "",
        employee_id: "",
        status: "",
        priority_task: ""
      });
      
      setMessage({ type: 'success', text: '✅ Task assigned successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage({
        type: 'error',
        text: error.response?.data?.error || error.response?.data?.details || " Unknown error"
      });
    } 
  };

  return (
    <div className={`transition-all duration-500 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-sm z-50`}>
      <div className='w-[700px] h-auto bg-white rounded-2xl shadow-2xl px-10 py-8'>
        <h1 className='text-center font-bold text-2xl text-blue-600 mb-6'>⚒️ Assign Task for Employee</h1>
        {/* show message if successful */}
        {message.text && (
          <div className={`mt-4 p-2 rounded text-center font-medium 
            ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className='flex gap-10 justify-center pt-2'>
            <div className='flex flex-col w-[300px]'>
              <div className='flex gap-1'>
                <label htmlFor='task_title' className='mb-2 text-sm font-medium text-gray-700'>Task Title</label>
                <Pen className='text-blue-600  w-4 h-4' />
              </div>
              <input
                value={taskData.task_title}
                onChange={handleChange}
                name='task_title'
                type="text"
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                placeholder='Add task title'
                required />
            </div>
            <div className='flex flex-col w-[300px]'>
              <div className='flex gap-1'>
                <label htmlFor='task_desc' className='mb-2 text-sm font-medium text-gray-700'>Task description</label>
                <Pen className='text-blue-600  w-4 h-4' />
              </div>
              <textarea
                value={taskData.task_desc}
                onChange={handleChange}
                name='task_desc'
                className='p-3 border border-gray-300 rounded-lg h-[100px] resize-none focus:ring-2 focus:ring-blue-500 outline-none'
                placeholder='Enter task details...'
              />
            </div>
          </div>

          <div className='flex gap-10 justify-center pt-6'>
            <div className='flex flex-col w-[300px]'>
              <div className='flex gap-1'>
                <label htmlFor='start_date' className='mb-2 text-sm font-medium text-gray-700'>Start date</label>
                <Calendar className='text-blue-600  w-4 h-4' />
              </div>
              <input
                value={taskData.start_date}
                onChange={handleChange}
                name='start_date'
                type="date"
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                required />
            </div>
            <div className='flex flex-col w-[300px]'>
              <div className='flex gap-1'>
                <label htmlFor='end_date' className='mb-2 text-sm font-medium text-gray-700'>End date</label>
                <Calendar className='text-red-600 w-4 h-4' />
              </div>
              <input
                value={taskData.end_date}
                onChange={handleChange}
                name='end_date'
                type="date"
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                required />
            </div>
          </div>

          <div className='flex gap-10 justify-center pt-6'>
            <div className='flex flex-col w-[300px]'>
              <div className='flex gap-1'>
                <label htmlFor='employee_id' className='mb-2 text-sm font-medium text-gray-700'>Employee</label>
                <User className='text-blue-600 w-4 h-4' />
              </div>
              <select
                value={taskData.employee_id}
                onChange={handleChange}
                id="employee_id"
                name="employee_id"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required>
                <option>Select an employee</option>
                {employee.map((data) => (
                  <option key={data.id} value={data.id}>
                        {data.name}
                 </option>
                ))}
              </select>
            </div>
            <div className='w-[300px] flex flex-col'>
              <div className='flex gap-1'>
                <label htmlFor='status' className='mb-2 text-sm font-medium text-gray-700'>Status</label>
                <TrendingUp className='text-blue-600 w-4 h-4' />
              </div>
              <select
                value={taskData.status}
                onChange={handleChange}
                id="status"
                name="status"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required>
                <option>Select status</option>
                {status.map((datastatus) =>
                  <option key={datastatus.id} value={datastatus.id}>{datastatus.name}</option>
                )}
              </select>
            </div>
          </div>

          <div className='flex gap-10 justify-center pt-6'>
            <div className='flex flex-col w-[300px]'>
              <label htmlFor='priority_task' className='mb-2 text-sm font-medium text-gray-700'>Select priority</label>
              <select
                value={taskData.priority_task}
                onChange={handleChange}
                id="priority_task"
                name="priority_task"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required>
                <option>Select priority</option>
                {priority.map((priodata) =>
                  <option key={priodata.id} value={priodata.id}>{priodata.level}</option>
                )}
              </select>
            </div>
            <div className='w-[300px] flex flex-col'></div>
          </div>
          {/* end form */}
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
