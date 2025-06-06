import React, { useState } from 'react'
import { useEffect } from 'react';
import Button from '../Button';

const UserEdit = ({closeEditUser}) => {
  const [show,setShow] = useState(false);

  useEffect(() => {
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    }, []);
  return (
    <div className={`transition-all duration-500 ease-out 
      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
      flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-sm z-50`}>
        <div className='w-[700px] h-auto bg-white rounded-2xl shadow-2xl px-10 py-8'>
          <h1 className=' text-center font-bold text-2xl text-blue-600 mb-6'>🖊️User edit</h1>
           <div className="flex justify-end gap-4 pt-8">
            <button
              type="button"
              onClick={closeEditUser}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
              Cancel
            </button>
            <Button name="Save" color="bg-blue-500 hover:bg-blue-600" type="submit" />
          </div>
        </div>
       
    </div>
  )
}

export default UserEdit;
