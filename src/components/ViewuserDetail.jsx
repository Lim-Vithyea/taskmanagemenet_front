import React, { useState } from 'react'
import { useEffect } from 'react';
import person from "../assets/person.svg"


const ViewuserDetail = ({onClose,userViewData}) => {
    const[name,setName] = useState('')
    const[profile,setProfile] = useState();
    const[email,setEmail] = useState();
 
    const [show,setShow] = useState(false)
    useEffect(()=>{
        if(userViewData){
            setName(userViewData.name),
            setEmail(userViewData.email),
            setProfile(userViewData.pf)
        }
    })
    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 10);
        return () => clearTimeout(timer);
      }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm 
    transition-all duration-500 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl  sm:p-10">
        <h1 className='text-center font-bold text-2xl text-blue-600'>📄User profile</h1>
        <div className='flex justify-center py-4'>
            <img src={profile} className='w-30 h-30 rounded-[100px]'/>
        </div>
        <div className='flex justify-center'>
            {/* <img src={person} className='w-10 h-10'/> */}
             <h1 className='text-center font-semibold text-xl py-2 px-1'>{name}</h1>
        </div>
        <h1 className='text-center font-normal text-[15px]'>📧{email}</h1>
         <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition">
            🔙 Back
          </button>
        </div>
        </div>  
    </div>
  )
}

export default ViewuserDetail
