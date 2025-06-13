import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfilePic from '../../assets/pfpic.jpg'
import { useState } from 'react';
import { NavLink, useAsyncError } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import profilePic from '../../assets/pfpic.jpg';

const Header = () => {
  const { user,logout } = useAuth(); 
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const {API_PIC} = useAuth();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  
 
  
  return (
  <header className='flex items-center justify-end bg-white px-6 py-1 shadow-md'>
   <div className="relative">
          <button 
            className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={toggleUserMenu}>
              <img 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                src={user?.image?.image_path ? `${API_PIC}/storage/${user.image.image_path}` : profilePic}/>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.role === '1'?'Admin':'User'}</div>
            </div>
            <ChevronDown/>
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <NavLink to="/dashboard/profile"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</NavLink>
              <div className="border-t border-gray-100 my-1"></div>
              <NavLink to="/" onClick={logout} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-red-500 text-start">logout</NavLink>
            </div>
          )}
        </div>
        </header>
  );
};

export default Header;
