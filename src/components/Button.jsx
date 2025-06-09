import React from 'react'

const Button = ({name,color,functionDelete}) => {

  return (
    <button onClick={functionDelete} className={`w-[120px] ml-2 cursor-pointer h-[40px] ${color} rounded-[7px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-blue-900 transition-all duration-100`}>
        <span className='font-bold text-white'>{name}</span>
    </button>
  )
}

export default Button