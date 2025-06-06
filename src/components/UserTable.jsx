import { useEffect, useState } from 'react'
// import { Data } from './TestTable'
import IconDelete from "../assets/icon-delete.svg"
import IconEdit from "../assets/icon-edit.svg"
import IconDetail from "../assets/icon-detail.svg"
import ViewuserDetail from './ViewuserDetail'
import DeleteScreen from './DeleteScreen'
import UserEdit from './user/UserEdit'
import axios from 'axios'


const UserTable = () => {
  const [isSelectedUser,setSelectedUser] = useState(false);
  const [isViewUser,setViewUser] = useState(false);
  const [isDelete,setDelete] =useState(false);
  const [userEdit,setUserEdit] = useState(false);
  const [Userdata,setUserData] = useState([])
  const [err, setErr] = useState("");

  //get user data
  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const API = import.meta.env.VITE_LARAVEL_API_URL;
      console.log("API URL:", API);
      const response = await axios.get(`${API}getuser`);
      console.log("Fetched inside fetch:", response.data);
      setUserData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setErr(err.response?.data?.error || err.message);
    }
  };
  fetchUsers();
}, []);

  const openUserDetail = (userViewData) => {
    setSelectedUser(userViewData);
    setViewUser(true)
  }
  const closeDetailView = () => {
    setViewUser(false);
  }
  const showDelete = () => {
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

  return (
     <div className="px-4 pb-4">
          <div className="overflow-x-autos shadow">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-blue-500 border-b">
                <tr>
                  <th className="px-3 py-2">Index</th>
                  <th className='px-3 py-2 text-center'>Profile</th>
                  <th className="px-3 py-2">Username</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Created at</th>
                  <th className="px-3 py-2 text-center ">Action</th>
                </tr>
              </thead>
              <tbody>
                {Userdata.map((data, index) => (
                  <tr key={data.id} className="bg-white border-b-2 border-blue-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">{index + 1}</td>
                    <td className="px-3 py-2">
                      <div className='flex justify-center'>
                          {/* <img className='rounded-[100px] w-10 h-10' src={data.pf}/> */}
                           <img className='rounded-[100px] w-10 h-10'/>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-blue-600 font-bold whitespace-nowrap">{data.name}</td>
                    <td className="px-3 py-2">{data.role == '1'? "Admin" : "User"}</td>
                    <td className="px-3 py-2">{data.email}</td>
                    <td className="px-3 py-2"> {new Date(data.created_at).toLocaleDateString('en-GB')}</td>
                    <td className="px-3 flex justify-center gap-2 py-2">
                      <button className=" w-10 h-10 bg-blue-600 text-white rounded-[6px] cursor-pointer">
                        <div className='flex justify-center 'onClick={()=>openEdit()}>
                          <img src={IconEdit} className='w-5 h-5'/>
                        </div>
                        </button>
                      <button className=" w-10 h-10 bg-red-600 text-white rounded-[6px] cursor-pointer"
                      onClick={()=>showDelete()}>
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
            {isDelete && <DeleteScreen closeDeleteUser={closeDelete}/>}
            {userEdit && <UserEdit closeEditUser={closeEdit}/>}
          </div>
        </div>
  )
}

export default UserTable