import { useEffect, useState } from 'react'
// import { Data } from './TestTable'
import IconDelete from "../assets/icon-delete.svg"
import IconEdit from "../assets/icon-edit.svg"
import IconDetail from "../assets/icon-detail.svg"
import ViewuserDetail from './user/ViewuserDetail'
import UserEdit from './user/UserEdit'
import axios from 'axios'
import UserDelete from './user/UserDelete'
import { LoadingAnimation } from './TestTable'
import profilePic from "../assets/pfpic.jpg"
import { useAuth } from '../context/AuthContext'

const UserTable = () => {
  const [isSelectedUser,setSelectedUser] = useState(false);
  const [isViewUser,setViewUser] = useState(false);
  const [isDelete,setDelete] =useState(false);
  const [userEdit,setUserEdit] = useState(false);
  const [Userdata,setUserData] = useState([])
  const [err, setErr] = useState("");
  const [loading,setLoading] = useState(false)
  const {API_PIC,API,token} = useAuth();

  //get user data
  useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API}getuser`,
         { 
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        }
      );
      console.log("Fetched inside fetch:", response.data);
      setUserData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setErr(err.response?.data?.error || err.message);
    } finally {
      setLoading(false)
    }
  };
  fetchUsers();
}, []);

 const fetchUsers = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`${API}getuser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserData(response.data);
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};

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
  const openEdit = (userEditdata) => {
    setSelectedUser(userEditdata)
    setUserEdit(true)
  }
  const closeEdit = () => {
    setUserEdit(false);
    fetchUsers();
  }

  return (
     <div className="px-4 pb-4">
          <div className="overflow-x-autos shadow">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-blue-500 border-b">
                <tr>
                  <th className="px-3 py-2 text-center">Index</th>
                  <th className='px-3 py-2 text-center'>Profile</th>
                  <th className="px-3 py-2">Username</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Created at</th>
                  <th className="px-3 py-2 text-center ">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ?(
                  <tr>
                       <td colSpan="9" className="text-center py-6 text-blue-600 font-semibold">
                         <div className="flex justify-center items-center py-10">
                            <img src={LoadingAnimation} alt="Loading..." className="w-20 h-20" />
                        </div>
                    </td>
                  </tr>
                ):
                Userdata.map((data, index) => (
                  <tr key={data.id} className="bg-white border-b-2 border-blue-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">{index + 1}</td>
                    <td className="px-3 py-2">
                      <div className='flex justify-center'>
                          {/* <img className='rounded-[100px] w-10 h-10' src={data.pf}/> */}
                          <img 
                          className="rounded-[100px] w-10 h-10"
                          src={data?.image?.image_path ? `${API_PIC}/storage/${data.image?.image_path}` : profilePic}/>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-blue-600 font-bold whitespace-nowrap">{data.name}</td>
                    <td className="px-3 py-2">{data.role == '1'? "Admin" : "User"}</td>
                    <td className="px-3 py-2">{data.email}</td>
                    <td className="px-3 py-2"> {new Date(data.created_at).toLocaleDateString('en-GB')}</td>
                    <td className="px-3 flex justify-center gap-2 py-2">
                      <button className=" w-10 h-10 bg-blue-500 text-white rounded-[6px] cursor-pointer">
                        <div className='flex justify-center 'onClick={()=>openEdit(data)}>
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
            {isDelete && <UserDelete closeDelete={closeDelete} userViewData={isSelectedUser} onDeleteSuccess={() => {setDelete(false)}}/>}
            {userEdit && <UserEdit closeEditUser={closeEdit} userEditData={isSelectedUser}/>}
          </div>
        </div>
  )
}

export default UserTable