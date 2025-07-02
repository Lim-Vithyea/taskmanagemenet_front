import React from 'react'
import Profilepic from "../assets/pfpic.jpg"
import { Facebook, Github } from 'lucide-react';

const ProfileCard = ({name,pic,facbookLink,githubLink}) => {
  return (
        <div className="w-[300px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm 
        transform transition-transform duration-300 hover:scale-105 hover:shadow-xl ">
            <div className="flex justify-end px-4 pt-4">
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={pic} alt="Bonnie image"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900">{name}</h5>
                <span className="text-sm text-blue-500 bg-blue-500/20 border-1 border-blue-500 rounded-[5px] px-3">IT Student</span>
                <p className='text-center text-sm py-2 text-gray-500'>Even though you don't give up doesn't mean you will make it</p>
                <div className="flex mt-4 md:mt-2">
                    <a href={facbookLink} className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Facebook className='w-5 h-5 mx-1'/>Faecbook</a>
                    <a href={githubLink} className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none flex 
                    rounded-lg border border-gray-800 bg-gray-800 hover:bg-gray-600 
                    focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                        <Github className='w-5 h-5 '/>
                    Github</a>
                </div>
            </div>
        </div>

  )
}

export default ProfileCard
