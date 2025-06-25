import React, { useState } from 'react'
import { useEffect } from 'react';
import Button from './Button';
import axios from 'axios';

const DeleteScreen = ({closeDelete,userTaskData,onDelete}) => {
    const [title, setTitle] = useState('');
    const [show,setShow] = useState(false);
    
     useEffect(() => {
        if (userTaskData) {
          setTitle(userTaskData.task_title || '');
        }
      }, [userTaskData]);

     useEffect(() => {
        const timer = setTimeout(() => setShow(true), 10);
        return () => clearTimeout(timer);
      }, []);

      const handleDelete = async () => {
        const API = import.meta.env.VITE_LARAVEL_API_URL;
        const token = localStorage.getItem('token');
        try{
          await axios.delete(`${API}tasks/${userTaskData.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          closeDelete();
          onDelete();
        } catch (err){
          console.log("Error:",err)
        }
      }
  return (
    <div>
      <div className={`fixed inset-0 z-50 flex items-center justify-center 
        bg-black/30 backdrop-blur-sm transition-all duration-500 ease-out 
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className='w-[500px] h-auto bg-white rounded-xs shadow-2xl px-10 py-8'>
                <h1 className='text-center font-bold text-xl text-red-500'>Alert</h1>
                <h3 className='text-center px-10 py-6 font-medium'>🗑️Are you sure you want to delete the {title}????</h3>
            <div className="flex justify-center gap-4 pt-5">
            <button
              type="button"
              onClick={closeDelete}
              className="px-6 text-blue-500 py-2 bg-transparent border-2 border-blue-00 hover:bg-blue-600 hover:text-white
              font-semibold rounded-lg shadow-md transition cursor-pointer">
              Cancel
            </button>
            <Button name="Delete" color="bg-red-500 hover:bg-red-600" type="submit" functionDelete={handleDelete} />
          </div>
            </div>
      </div>
    </div>
  )
}

export default DeleteScreen
