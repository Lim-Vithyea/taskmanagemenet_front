import React from 'react';
import { LoadingAnimation } from './TestTable';

const LoginLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/25 backdrop-blur-[5px]">
      <div className="p-4 flex justify-center items-center rounded-lg bg-gray-50 w-[500px] h-[200px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
        <h1 className='text-center font-semibold'>Login in</h1>
        <img src={LoadingAnimation} alt="Loading..." className="w-20 h-20" />
      </div>
    </div>
  )
}

export default LoginLoading
