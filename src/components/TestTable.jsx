import React, { useState } from 'react';
import AssignTask from './AssignTask';
import SetEditscreen from './SetEditscreen';
import IconDelete from "../assets/icon-delete.svg"
import IconEdit from "../assets/icon-edit.svg"
import IconDetail from "../assets/icon-detail.svg"
import IconDone from "../assets/icon-done.svg"
import IconGoing from "../assets/icon-ongoing.svg"
import Viewtask from './Viewtask';


export const Data = [
  { id: 1, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 2, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },
  { id: 3, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 4, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },
  { id: 5, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 6, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },
  { id: 7, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 8, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },
  { id: 9, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 10, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },
  { id: 11, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 12, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },
  { id: 13, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 14, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },
  { id: 15, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 16, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },
  { id: 17, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 18, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },
  { id: 19, title: "Design UX/UI", name: "Sok Chandara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-1-10", timeE: "2025-2-10", status: "completed" },
  { id: 20, title: "Frontend Dev", name: "Sok Dara",desc: "lorem dahdach uavbau7 ugvbau8fah hfafabau gafhf", timeS: "2025-2-01", timeE: "2025-3-01", status: "In Progress" },

  // Add more with unique `id`s if needed
];

const TestTable = () => {

  const [selectUser,setSelecteduser] = useState(null);
  const [isEdit,setEdit] = useState(false);
  const [isView,setView] = useState(false);

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
  return (
    <div className="p-4">
      <div className="overflow-x-autos shadow">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-blue-500 border-b">
            <tr>
              <th className="px-3 py-3">No</th>
              <th className="px-3 py-3">Task title</th>
              <th className="px-3 py-3">Assigned to</th>
              <th className="px-3 py-3">Start-Time</th>
              <th className="px-3 py-3 text-center">completed-Time</th>
              <th className="px-3 py-3 text-center">Description</th>
              <th className="px-3 py-3 text-center">Status</th>
              <th className="px-3 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((data, index) => (
              <tr key={data.id} className="bg-white border-b-2 border-blue-200 hover:bg-gray-50">
                <td className="px-3 py-4 text-center">{index + 1}</td>
                <td className="px-3 py-4 font-semibold">{data.title}</td>
                <td className="px-3 py-4 text-blue-600 font-bold whitespace-nowrap">{data.name}</td>
                <td className="px-3 py-4 font-semibold text-green-500">{data.timeS}</td>
                <td className="px-3 py-4 font-semibold text-red-500 text-center">{data.timeE}</td>
                <td className="px-3 py-4 font-semibold max-w-[200px] truncate overflow-hidden whitespace-nowrap">{data.desc}</td>
                <td className="px-3 py-4 text-center">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center gap-2 w-[120px] font-semibold text-center p-2 text-white rounded-sm 
                        ${data.status.toLowerCase() === "completed" ? 'bg-green-500' : 'bg-yellow-500'}`}
                    >
                      <img
                        src={data.status.toLowerCase() === 'completed' ? IconDone : IconGoing}
                        alt="status icon"
                        className="w-4 -4"
                      />
                      <span className="flex-1">{data.status}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 flex space-x-3">
                  <button onClick={()=>{
                    setSelecteduser(data);
                    setEdit(true);
                  }} className=" w-10 h-10 bg-blue-600 text-white rounded-[6px]">
                    <div className='flex justify-center'>
                      <img src={IconEdit} className='w-5 -5'/>
                    </div>
                    </button>
                  <button className=" w-10 h-10 bg-red-600 text-white rounded-[6px]">
                    <div className='flex justify-center'>
                      <img src={IconDelete} className='w-5 -5'/>
                    </div>
                  </button>
                  <button className=" w-10 h-10 bg-yellow-500 text-white rounded-[6px]" 
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
      </div>
    </div>
  );
};

export default TestTable;
