import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/header/Header';
import { Routes, Route } from 'react-router-dom';
import TaskManagement from '../pages/TaskManagement';
import UserSection from '../pages/UserSection';
import ProtectedRoute from '../components/ProtectedRoute';
import Report from '../pages/Report';
import OurTeam from '../pages/OurTeam';
import ProfilePage from '../pages/ProfilePage';

const Dashboard = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div>
        <div className={`fixed top-0 left-0 h-full w-64 bg-white border-r-1 border-gray-300 z-40 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 flex flex-col sm:ml-64 bg-gray-50">
        <Header/>
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="taskmanage" element={<ProtectedRoute><TaskManagement /></ProtectedRoute>} />
            <Route path="usersection" element={<ProtectedRoute><UserSection /></ProtectedRoute>} />
            <Route path="report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="aboutus" element={<ProtectedRoute><OurTeam /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route index element={<ProtectedRoute><TaskManagement /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
