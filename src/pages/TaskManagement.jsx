// TaskManagement.jsx
import React, { useState } from 'react';
import TestTable from '../components/TestTable';
import AssignTask from '../components/AssignTask';
import AssignButton from '../components/AssignButton';
import { useStateProps } from '../context/StateContext'
import { useAuth } from '../context/AuthContext';

const TaskManagement = () => {
  const {user} = useAuth();
  const { openAdd,isOpen } = useStateProps();
  
  return (
    <>
      <div className='flex justify-center '>
        <div className='flex justify-center absolute'>
          {isOpen && <AssignTask/>}
        </div>
      </div>
      <div className='w-full h-auto rounded-2xl shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'>
        <div className='pt-5 pl-5 '>
          {user.role === "1" ? 
          <AssignButton setisAddStuff={openAdd} name={"Assign task"} /> : ""
        }
        </div>
        <div>
          <h1 className='text-center font-bold text-2xl p-5'>Task Management System</h1>
          <div className='px-5'>
            <TestTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskManagement;
