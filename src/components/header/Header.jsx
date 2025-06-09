import React from 'react';
import { useAuthprops } from '../../context/AuthContext';
import ProfilePic from '../../assets/pfpic.jpg'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const { users,setUsers,logout,handleLogout } = useAuthprops(); 
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
   
  };
  // const handleLogout = async () => {
  //   setUsers(null);
  //   localStorage.removeItem('user')
  //   localStorage.removeItem('token');
  //   navigate('/')
  // };

  
  return (
    // <header className="flex items-center justify-end bg-white px-6 py-1 shadow-md">
    //   <div className="flex items-center gap-4">
    //     <div className="text-right">
    //       <h2 className="text-gray-700 font-semibold">{users?.name || "Username"}</h2>
    //       <p className="text-sm text-gray-500">{users?.role == '1'? "Admin" : "User"}</p>
    //     </div>
    //     <img
    //       src={ProfilePic}
    //       alt="Profile"
    //       className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
    //     />
    //   </div>
    // </header>
  <header className='flex items-center justify-end bg-white px-6 py-1 shadow-md'>
   <div className="relative">
          <button 
            className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={toggleUserMenu}>
            <img
              src={ProfilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">{users?.name}</div>
              <div className="text-xs text-gray-500">{users?.role === '1'?'Admin':'User'}</div>
            </div>
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <div className="border-t border-gray-100 my-1"></div>
              <NavLink to="/" onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-red-500 text-start">logout</NavLink>
            </div>
          )}
        </div>
        </header>
  );
};

export default Header;
