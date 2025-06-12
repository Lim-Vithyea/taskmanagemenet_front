import React, { useState } from 'react'

import IconDelete from "../assets/icon-delete.svg"
import IconEdit from "../assets/icon-edit.svg"
import IconDetail from "../assets/icon-detail.svg"
import { useEffect } from 'react'
import axios from 'axios'
import UserDelete from './userDelete';
import UserEdit from './user/UserEdit'
import ViewuserDetail from './ViewuserDetail'
import { LoadingAnimation } from './TestTable'

const AdminTable = () => {

  const [AdminData,setAdminData] = useState([]);
  const [err,setErr] = useState('');
  const [isSelectedUser,setSelectedUser] = useState(false);
  const [isViewUser,setViewUser] = useState(false);
  const [isDelete,setDelete] =useState(false);
  const [userEdit,setUserEdit] = useState(false);
  const [loading,setLoading] = useState(false)

   const openUserDetail = (userViewData) => {
    setSelectedUser(userViewData);
    setViewUser(true)
  }
  const closeDetailView = () => {
    setViewUser(false);
  }
  const showDelete = (user) => {
    setSelectedUser(user)
    setDelete(true);
  }
  const closeDelete = () => {
    setDelete(false)
  }
  const openEdit = () => {
    setUserEdit(true)
  }
  const closeEdit = () => {
    setUserEdit(false);
  }
  

   useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const API = import.meta.env.VITE_LARAVEL_API_URL;
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}adminuser`,
         { 
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        }
      );
      console.log("Fetched inside fetch:", response.data);
      setAdminData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setErr(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchUsers();
}, []);
  return (
     <div className="px-4 pb-4">
          <div className="overflow-x-autos shadow">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-blue-500 border-b">
                <tr>
                  <th className="px-6 py-3">Index</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Created at</th>
                  <th className="px-6 py-3 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                 <tr>
                    <td colSpan="9" className="text-center py-6 text-blue-600 font-semibold">
                      <div className="flex justify-center items-center py-10">
                        <img src={LoadingAnimation} alt="Loading..." className="w-20 h-20" />
                      </div>
                    </td>
                 </tr>
                ):
                AdminData.map((data,index)=>(
                  <tr key={data.id} className="bg-white border-b-2 border-blue-200 hover:bg-gray-50">
                    <td className='px-6 py-4'>{index + 1}</td>
                    <td className='px-6 py-4 text-red-500 font-semibold'>{data.name}</td>
                     <td className="px-3 py-2">{data.role == '1'? "Admin" : "User"}</td>
                    <td className='px-6 py-4'>{data.email}</td>
                    <td className="px-3 py-2"> {new Date(data.created_at).toLocaleDateString('en-GB')}</td>
                    <td className="px-3 flex justify-center gap-2 py-2">
                      <button className=" w-10 h-10 bg-blue-500 text-white rounded-[6px] cursor-pointer">
                        <div className='flex justify-center 'onClick={()=>openEdit()}>
                          <img src={IconEdit} className='w-5 h-5'/>
                        </div>
                        </button>
                      <button className=" w-10 h-10 bg-red-500 text-white rounded-[6px] cursor-pointer"
                      onClick={()=>showDelete(data)}>
                        <div className='flex justify-center'>
                          <img src={IconDelete} className='w-5 h-5'/>
                        </div>
                      </button>
                      <button className=" w-10 h-10 bg-yellow-500 text-white rounded-[6px] cursor-pointer"
                      onClick={()=>
                        openUserDetail(data)
                        }>
                        <div className='flex justify-center'>
                          <img src={IconDetail} className='w-5 h-5'/>
                        </div>
                      </button>
                  </td>      
                </tr>
                ))}
              </tbody>
            </table>
            {isViewUser && <ViewuserDetail onClose={closeDetailView} userViewData={isSelectedUser}/>}
            {isDelete && <UserDelete closeDelete={closeDelete} userViewData={isSelectedUser} onDeleteSuccess={() => {
              setDelete(false);
            }}/>}
            {userEdit && <UserEdit closeEditUser={closeEdit} />}
          </div>
        </div>
  )
}

export default AdminTable