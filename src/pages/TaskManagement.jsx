import React from 'react';
import TestTable from '../components/TestTable';
import AssignTask from '../components/AssignTask';
import AssignButton from '../components/AssignButton';
import { useStateProps } from '../context/StateContext';
import { useAuth } from '../context/AuthContext';

const TaskManagement = () => {
  const { user } = useAuth();
  const { openAdd, isOpen } = useStateProps();

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
            <AssignTask />
          </div>
        </div>
      )}
      {/* Main container */}
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left text-gray-800">
            Task Management System
          </h1>
          {user?.role === "1" && (
            <div className="mt-4 sm:mt-0">
              <AssignButton setisAddStuff={openAdd} name="Assign Task" />
            </div>
          )}
        </div>
        {/* Table Section */}
        <div className="p-4">
          <TestTable />
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
