import React from 'react';
import { useAuthprops } from '../../context/AuthContext';
import ProfilePic from '../../assets/pfpic.jpg'

const Header = () => {
  const { users } = useAuthprops(); 
  
  return (
    <header className="flex items-center justify-end bg-white px-6 py-1 shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <h2 className="text-gray-700 font-semibold">{users?.name || "Username"}</h2>
          <p className="text-sm text-gray-500">{users?.role || "Role"}</p>
        </div>
        <img
          src={ProfilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
        />
      </div>
    </header>
  );
};

export default Header;
