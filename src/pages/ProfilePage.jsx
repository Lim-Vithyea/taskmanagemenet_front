import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import profilePic from "../assets/pfpic.jpg"
import UploadProfile from '../components/user/UploadProfile';


const ProfilePage = () => {
    const [addProfile,setAddProfile] = useState(false);
    const {API_PIC,user} = useAuth();

    const openAddProfile = () => {
        setAddProfile(true);
    }
    const closeAddProFile = () => {
        setAddProfile(false)
    }

  return (
    <div className="w-full bg-white rounded-md shadow-md overflow-hidden">
      <div className="relative h-48 bg-cover bg-center">
         <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800"></div>

        <div className="absolute -bottom-12 left-[44%] ">
          <img 
            className="w-[150px] h-[150px] rounded-full object-cover border-5 border-white"
            src={user?.image?.image_path ? `${API_PIC}/storage/${user.image.image_path}` : profilePic}/>
        </div>
      </div>

      <div className="pt-16 px-6 pb-6">
        <h2 className="text-xl text-center font-semibold">{user?.name}</h2>
        <p className="text-sm text-center text-gray-500">{user?.email}</p>
        <p className="text-sm text-center text-gray-500 py-2">
            {new Date(user?.created_at).toLocaleDateString('en-GB')}
        </p>
   
        <div className="mt-2 flex space-x-3 justify-center">
          <button onClick={openAddProfile} className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">New Profile</button>
          <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded-md hover:bg-blue-50">Edit username</button>
        </div>
        <div className='flex gap-3 py-5 '>
            <div className='w-full h-[80px] bg-green-600 rounded-sm'>
                <h2 className='font-semibold text-white py-2 px-2'>Task completed</h2>
                <p className='font-semibold text-white pl-[46%]'>50</p>
            </div>
            
            <div className='w-full h-[80px] bg-yellow-500 rounded-sm'>
                <h2 className='font-semibold text-white py-2 px-2'>Task in progress</h2>
                <p className='font-semibold text-white pl-[46%]'>50</p>
            </div>
            {/* <div className='w-full h-[80px] bg-green-500 rounded-sm'>
                <div className='w-full h-[80px] bg-blue-500 rounded-sm'>
                    <h2 className='font-semibold text-white py-2 px-2'>Task completed</h2>
                    <p className='font-semibold text-white pl-[46%]'>50</p>
                </div>
            </div> */}
        </div>
      </div>
      {addProfile && <UploadProfile closeUploadPF={closeAddProFile}/>}
    </div>
  )
}

export default ProfilePage
