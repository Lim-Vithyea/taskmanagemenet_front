import React, { useEffect, useState } from 'react';
import AssignTask from './AssignTask';
import SetEditscreen from './SetEditscreen';
import IconDelete from "../assets/icon-delete.svg"
import IconEdit from "../assets/icon-edit.svg"
import IconDetail from "../assets/icon-detail.svg"
import IconDone from "../assets/icon-done.svg"
import IconGoing from "../assets/icon-ongoing.svg"
import Viewtask from './Viewtask';
import DeleteScreen from './DeleteScreen';
import profilePic from "../assets/pfpic.jpg"
import axios from 'axios';



const TestTable = () => {

  const [selectUser,setSelecteduser] = useState(null);
  const [isEdit,setEdit] = useState(false);
  const [isView,setView] = useState(false);
  const [isDelete,setDelete] = useState(false);
  const [taskData,setTaskData] = useState([]);

  useEffect(()=>{
    const API = import.meta.env.VITE_LARAVEL_API_URL;
    const getTaskData = async () => {
    try{
        const res = await axios(`${API}get_task`);
        setTaskData(res.data);
      }
     catch (err) {
        console.error("Fetch error:", err);
    }
  }
  getTaskData();
  },[])

  const closeEdit = () => {
    setEdit(false);
  }

  const closeView = () => {
    setView(false);
  }

  const viewTask = (datauser) => {
    setSelecteduser(datauser);
    setView(true);
  }
  const deleteTask = () => {
    setDelete(true);
  }
  const closeDelete = () => {
    setDelete(false);
  }
  return (
    <div className="p-4">
      <div className="overflow-x-autos shadow">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-blue-500 border-b">
            <tr>
              <th className="px-3 py-3">No</th>
              <th className="px-3 py-3 text-center">Priority</th>
              <th className="px-3 py-3">Task title</th>
              <th className="px-3 py-3">Profile</th>
              <th className="px-3 py-3">🖊️Assigned to</th>
              <th className="px-3 py-3 text-center">🗓️Start-Time</th>
              <th className="px-3 py-3 text-center">completed-Time</th>
              <th className="px-3 py-3 text-center">📄Status</th>
              <th className="px-3 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((data, index) => (
              <tr key={data.id} className="bg-white border-b-2 border-blue-200 hover:bg-gray-50">
                <td className="px-3 py-4 text-center">{index + 1}</td>
                <td className="px-3 py-4 text-center">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center gap-2 w-[80px] font-semibold text-center p-2 text-white rounded-sm 
                        ${data.priority.level.toLowerCase() === "low" ? 'bg-green-500' : 
                          data.priority.level.toLowerCase() === "medium" ? 'bg-orange-500' : 'bg-red-500'}`}>
                      <span className="flex-1">{data.priority.level}</span>
                    </div>
                  </div>
                </td>
               
                <td className="font-semibold ">
                  <div className='px-2 py-4 w-[150px] truncate'>
                          {data.task_title}
                  </div>
                </td>
                <td className="px-3 py-4 text-cen"><img className='rounded-[100px] w-10 h-10' src={data.pf || profilePic}/></td>
                <td className="px-3 py-4 text-blue-600 font-bold whitespace-nowrap">{data.employee.name}</td>
                <td className="px-3 py-4 font-semibold text-green-500 text-center">{data.start_date}</td>
                <td className="px-3 py-4 font-semibold text-red-500 text-center">{data.end_date}</td>
                <td className=" hidden px-3 py-4 font-semibold max-w-[200px] truncate overflow-hidden whitespace-nowrap">{data.task_desc}</td>
                <td className="px-3 py-4 text-center">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center gap-2 w-[120px] font-semibold text-center p-2 text-white rounded-sm 
                        ${data.status.name === "Completed" ? 'bg-green-500' : 
                          data.status.name === "Pending" ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                      <img
                        src={data.status.name === 'Completed' ? IconDone : IconGoing}
                        alt="status icon"
                        className="w-4 -4"
                      />
                      <span className="flex-1">{data.status.name}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 flex space-x-3">
                  <button onClick={()=>{
                    setSelecteduser(data);
                    setEdit(true);
                  }} className=" w-10 h-10 bg-blue-600 text-white rounded-[6px] cursor-pointer">
                    <div className='flex justify-center'>
                      <img src={IconEdit} className='w-5 -5'/>
                    </div>
                    </button>
                  <button className=" w-10 h-10 bg-red-600 text-white rounded-[6px] cursor-pointer"
                  onClick={()=>deleteTask()}>
                    <div className='flex justify-center'>
                      <img src={IconDelete} className='w-5 -5'/>
                    </div>
                  </button>
                  <button className=" w-10 h-10 bg-yellow-500 text-white rounded-[6px] cursor-pointer" 
                  onClick={() => viewTask(data)}>
                    <div className='flex justify-center'>
                      <img src={IconDetail} className='w-5 -5'/>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* Edit screen */}
      {isEdit && <SetEditscreen closeEditFunction={closeEdit} userData={selectUser}/>}
      {isView && <Viewtask closeView={closeView} dataView={selectUser} />}
      {isDelete && <DeleteScreen closeDelete={closeDelete}/>}
      </div>
    </div>
  );
};

export default TestTable;
