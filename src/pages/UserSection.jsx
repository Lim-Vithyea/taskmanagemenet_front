import React, { useState } from 'react'
import UserTable from '../components/UserTable'
import AddEmployee from '../components/AddEmployee'
import AssignButton from '../components/AssignButton'
import { useStateProps } from '../context/StateContext'
import AdminTable from '../components/AdminTable'

const UserSection = () => {
    const { openAdd,isOpen } = useStateProps();
    const [view,setView] = useState("admin")

  return (
    <>
    <div className='flex justify-center'>
      <div className='flex justify-center absolute'>
      {isOpen && <AddEmployee/>}
      </div>
    </div>
    <div className='w-full h-auto rounded-[5px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'>
        {view === "admin" ? 
        <div className='p-5'>
            <AssignButton setisAddStuff={openAdd} name={"Add admin"}/>
        </div> : 
         <div className='p-5'>
            <AssignButton setisAddStuff={openAdd} name={"Add Employee"}/>
        </div>
        }
        
        <div>
            {view === 'admin' ? 
            <h1 className='text-center font-semibold text-3xl py-5 pr-3 pl-5  text-red-500'>Admin</h1>:
            <h1 className='text-center font-semibold text-3xl py-5 pr-3 pl-5 text-blue-500'>Employees</h1>
            }
            <div className='px-9'>
                <div className='w-full flex justify-between'>
                   <button onClick={() => setView('admin')}
                        className={`w-1/2 py-2 font-bold text-white transition-colors duration-200 hover:cursor-pointer ${
                            view === 'admin' 
                            ? 'bg-blue-900 border-b-3 border-green-400' 
                            : 'bg-blue-700 hover:bg-blue-800'}`}>
                        Manage Admin
                        </button>
                    <button onClick={() => setView('user')}
                    className={`w-1/2 py-2 font-bold text-white transition-colors duration-200 hover:cursor-pointer ${
                        view === 'user' 
                        ? 'bg-blue-900 border-b-3 border-green-400' 
                        : 'bg-blue-700 hover:bg-blue-800'
                    }`}>
                    Manage Employees
                    </button>
                </div>
            </div>
            <div className='px-5'>
                {view === 'admin' ? <AdminTable/> : <UserTable/>}
                
            </div>
        </div>
    </div>
    </>
  )
}

export default UserSection