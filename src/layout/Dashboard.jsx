// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import TaskManagement from '../pages/TaskManagement';
// import UserSection from '../pages/UserSection';
// import Login from '../pages/Login';

// const Dashboard = () => {
//   return (
//     <BrowserRouter>
//     <div className="min-h-screen">
//       <div className="top-0 left-0 w-full">
//         <Navbar />
//       </div>
//       <div className="flex pt-9">
//         <div className="w-64 fixed top-16 left-0 h-full z-10">
//           <Sidebar />
//         </div>
//         <div className="ml-64 p-4 flex-1">
//           <Routes>
//             <Route path="/dashboard/taskmanage" element={<TaskManagement />} />
//             <Route path="/dashboard/usersection" element={<UserSection />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//     </BrowserRouter>
//   );
// };

// export default Dashboard;
import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Routes, Route } from 'react-router-dom';
import TaskManagement from '../pages/TaskManagement';
import UserSection from '../pages/UserSection';
import ParticlesComponent from '../components/Particle';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <div className="">
        {/* Sidebar */}
        <div className="w-64 fixed top-0 left-0 h-full z-10">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="ml-64 p-4 flex-1 z-10">
          <Routes>
            <Route path="taskmanage" element={<TaskManagement />} />
            <Route path="usersection" element={<UserSection />} />
            <Route index element={<TaskManagement />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;