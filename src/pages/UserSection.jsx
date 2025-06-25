import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import AddEmployee from '../components/AddEmployee';
import AssignButton from '../components/AssignButton';
import { useStateProps } from '../context/StateContext';
import AdminTable from '../components/AdminTable';

const UserSection = () => {
  const { openAdd, isOpen } = useStateProps();
  const [view, setView] = useState("admin");

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray/20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
            <AddEmployee />
          </div>
        </div>
      )}
      {/* Main Card */}
      <div className="w-full max-w-7xl bg-white rounded-XS shadow-md overflow-hidden">
        {/* Top Section */}
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <h1 className={`text-xl sm:text-2xl font-bold text-center sm:text-left ${view === 'admin' ? 'text-red-600' : 'text-blue-600'}`}>
            {view === 'admin' ? 'Admin Management' : 'Employee Management'}
          </h1>
          <div className="mt-3 sm:mt-0">
            <AssignButton setisAddStuff={openAdd} name={view === "admin" ? "Add Admin" : "Add Employee"} />
          </div>
        </div>
        <div className="flex w-full">
          <button
            onClick={() => setView('admin')}
            className={`w-1/2 py-2 font-semibold text-sm sm:text-base transition-all duration-200 ${
              view === 'admin'
                ? 'bg-blue-900 text-white border-b-4 border-green-400'
                : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
          >
            Manage Admin
          </button>
          <button
            onClick={() => setView('user')}
            className={`w-1/2 py-2 font-semibold text-sm sm:text-base transition-all duration-200 ${
              view === 'user'
                ? 'bg-blue-900 text-white border-b-4 border-green-400'
                : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
          >
            Manage Employees
          </button>
        </div>

        {/* Table Content */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          {view === 'admin' ? <AdminTable /> : <UserTable />}
        </div>
      </div>
    </div>
  );
};

export default UserSection;
