import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import profilePic from '../../assets/pfpic.jpg';

const Header = ({ onSidebarToggle }) => {
  const { user, logout, API_PIC } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const profileImage = user?.image?.image_path
    ? `${API_PIC}/storage/${user.image.image_path}`
    : profilePic;

  return (
    <header className="flex justify-between items-center bg-white px-4 py-2 shadow-md sm:px-6">
      {/* Hamburger for mobile */}
      <button
        className="sm:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onSidebarToggle}
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      <div className="text-lg font-semibold text-gray-700 flex-1 text-center sm:text-left">
        Welcome
      </div>

      {/* User Profile*/}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-3 text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={toggleUserMenu}
        >
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            src={profileImage}
            alt="Profile"
          />
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.role === '1' ? 'Admin' : 'User'}</div>
          </div>
          <ChevronDown size={18} />
        </button>
        {userMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-30">
            <NavLink
              to="/dashboard/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </NavLink>
            <div className="border-t border-gray-100 my-1"></div>
            <NavLink
              to="/"
              onClick={logout}
              className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
