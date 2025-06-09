import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/header/Header';
import { Routes, Route } from 'react-router-dom';
import TaskManagement from '../pages/TaskManagement';
import UserSection from '../pages/UserSection';
import ProtectedRoute from '../components/ProtectedRoute';
import Report from '../pages/Report';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full z-10">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="ml-64 flex-1 z-10">
        <Header />
        {/* Page Routes */}
        <div className="p-4">
          <Routes>
            <Route path="taskmanage" element={<ProtectedRoute><TaskManagement/></ProtectedRoute>} />
            <Route path="usersection" element={<ProtectedRoute><UserSection /></ProtectedRoute>} />
            <Route path="report" element={<ProtectedRoute><Report/></ProtectedRoute>} />
            <Route index element={<ProtectedRoute><TaskManagement/></ProtectedRoute>} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
