import React from 'react'
import { NavLink, } from 'react-router-dom'
import ProFilePic from "../assets/NUM.png"
import { useAuthprops } from '../context/AuthContext'
import profile from "../assets/pfpic.jpg"

const Sidebar = () => {
    const {users, setUsers} = useAuthprops();
  return (
    <div>
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 " aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-800 pt-5 ">
            <ul className="space-y-5 font-medium">
                <div className='flex justify-center'>
                <li>
                    <div className='flex justify-center'>
                         <img src={ProFilePic} className='w-20 h-20'/>
                    </div>
                    <h1 className='text-center font-semibold text-white'>National University of Management</h1>  
                </li>
                </div>
                <li>
                    <div className='flex justify-center'>
                    <img src={profile} className='w-20 h-20 rounded-full'/>
                    </div>
                    <h1 className='text-white text-center font-bold'>Hi, {users?.name || 'Guest'}</h1>
                    {/* <h2 className='text-white text-center text-sm italic'>{users?.role && `(${users.role})`}</h2> */}
                </li>
                <li>
                    <NavLink to="/dashboard/taskmanage" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="w-5 h-5 text-white transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                    </svg>
                    <span className="ms-3">Task Managing</span>
                   </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/usersection" className={`${users.role === "user" ? "hidden" : "flex"} items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                    <svg className="shrink-0 w-5 h-5 text-white transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Manage User</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="shrink-0 w-5 h-5 text-white transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                    </NavLink>
                </li>
            </ul>
        </div>
       
        </aside>
    </div>
  )
}

export default Sidebar