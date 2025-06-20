import React from 'react'
import { useState } from 'react';
import { X } from 'lucide-react';

const UserProfileEdit = ({closeEdit}) => {
    
    const [show,setShow] = useState(false);

  return (
    <div>
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/25 backdrop-blur-[5px]'>
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <div className='flex justify-between'>
          <div className='w-5 h-5'></div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Coming soon....</h2>
          <X onClick={closeEdit} className='cursor-pointer'/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserProfileEdit
