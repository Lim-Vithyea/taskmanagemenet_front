import React from 'react';
import { NavLink } from 'react-router-dom';
import ProFilePic from "../assets/NUM.png";
import { useAuth } from '../context/AuthContext';
import { ClipboardMinus, UsersRound } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="h-full overflow-y-auto bg-white text-gray-800 px-4 py-6 shadow-2xl">
    <div className="flex flex-col items-center mb-6">
      <img src={ProFilePic} alt="NUM Logo" className="w-24 h-24 rounded-full" />
      <h1 className="mt-4 font-semibold text-center text-lg text-blue-800">
        National University of Management
      </h1>
    </div>
    <nav>
      <ul className="space-y-4 font-medium">
        <li>
          <NavLink
            to="/dashboard/taskmanage"
            className={({ isActive }) =>
              `flex items-center p-2 rounded transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-800 font-semibold'
                  : 'text-gray-800 hover:bg-blue-50 hover:text-blue-800'}`
            }
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            Task Manager
          </NavLink>
        </li>

        <li className={user?.role === "2" ? "hidden" : ""}>
          <NavLink
            to="/dashboard/usersection"
            className={({ isActive }) =>
              `flex items-center p-2 rounded transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-800 font-semibold'
                  : 'text-gray-800 hover:bg-blue-50 hover:text-blue-800'}`
            }
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            Manage User
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/report"
            className={({ isActive }) =>
              `flex items-center p-2 rounded transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-800 font-semibold'
                  : 'text-gray-800 hover:bg-blue-50 hover:text-blue-800'}`
            }
          >
            <ClipboardMinus className="w-5 h-5 mr-3" />
            Report
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/aboutus"
            className={({ isActive }) =>
              `flex items-center p-2 rounded transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-800 font-semibold'
                  : 'text-gray-800 hover:bg-blue-50 hover:text-blue-800'}`
            }
          >
            <UsersRound className="w-5 h-5 mr-3" />
            Our Team
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>  

  );
};

export default Sidebar;
