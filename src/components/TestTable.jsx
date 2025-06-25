import React, { useEffect, useState } from 'react';
import AssignTask from './AssignTask';
import SetEditscreen from './SetEditscreen';
import IconDelete from "../assets/icon-delete.svg";
import IconEdit from "../assets/icon-edit.svg";
import IconDetail from "../assets/icon-detail.svg";
import IconDone from "../assets/icon-done.svg";
import IconGoing from "../assets/icon-ongoing.svg";
import Viewtask from './Viewtask';
import DeleteScreen from './DeleteScreen';
import profilePic from "../assets/pfpic.jpg";
import axios from 'axios';
import Loading from "../assets/loading.gif";
import { useAuth } from '../context/AuthContext';

export const LoadingAnimation = Loading;

const TestTable = () => {
  const [selectUser, setSelectedUser] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [isView, setView] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { API_PIC } = useAuth();

  const fetchTasks = async () => {
    const API = import.meta.env.VITE_LARAVEL_API_URL;
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const res = await axios.get(`${API}get_task`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTaskData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const closeEdit = () => {
    setEdit(false);
    fetchTasks();
  };

  const closeView = () => setView(false);
  const closeDelete = () => setDelete(false);

  const handleView = (task) => {
    setSelectedUser(task);
    setView(true);
  };

  const handleDelete = (task) => {
    setSelectedUser(task);
    setDelete(true);
  };

  return (
    <div className="w-full">
      <div className="overflow-x rounded-lg shadow border border-gray-200 bg-white">
        <div className='overflow-x-auto'>
        <table className="min-w-full overflow-x text-sm sm:text-sm text-gray-800">
          <thead className="bg-gray-100 text-blue-600 uppercase">
            <tr className="text-left">
              <th className="px-3 py-3">No</th>
              <th className="px-3 py-3 text-center">Priority</th>
              <th className="px-3 py-3">Task Title</th>
              <th className="px-3 py-3 text-center">Profile</th>
              <th className="px-3 py-3 text-center">Assigned To</th>
              <th className="px-3 py-3 text-center">By</th>
              <th className="px-3 py-3 text-center">Start Date</th>
              <th className="px-3 py-3 text-center">End Date</th>
              <th className="px-3 py-3 text-center">Status</th>
              <th className="px-3 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="py-10 text-center">
                  <img src={LoadingAnimation} alt="Loading..." className="mx-auto w-16 h-16" />
                </td>
              </tr>
            ) : (
              taskData.map((task, index) => (
                <tr
                  key={task.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-4 text-center">{index + 1}</td>
                  <td className="px-3 py-4 text-center">
                    <span
                      className={`inline-block w-20 text-sm text-white font-semibold py-1 px-2 rounded ${
                        task.priority.level.toLowerCase() === 'low'
                          ? 'bg-green-500': task.priority.level.toLowerCase() === 'medium'? 'bg-yellow-500': 'bg-red-500'}`}>
                      {task.priority.level}
                    </span>
                  </td>
                  <td className="px-3 py-4 max-w-[180px] truncate">{task.task_title}</td>
                  <td className="px-3 py-4 text-center">
                    <img
                      className="w-10 h-10 rounded-full object-cover mx-auto"
                      src={task.employee.image?.image_path? `${API_PIC}/storage/${task.employee.image.image_path}`: profilePic}
                      alt="Employee"
                      />
                  </td>
                  <td className="px-3 py-4 text-center font-semibold text-blue-600">
                    {task.employee.name}
                  </td>
                  <td className="px-3 py-4 text-center font-medium">{task.assigned_by.name}</td>
                  <td className="px-3 py-4 text-center text-blue-600">{task.start_date}</td>
                  <td className="px-3 py-4 text-center text-red-500">{task.end_date}</td>
                  <td className="px-3 py-4 text-center">
                    <div
                      className={`inline-flex items-center gap-2 text-white px-2 py-1 rounded text-sm ${
                        task.status.name === 'Completed'
                          ? 'bg-green-500'
                          : task.status.name === 'Pending'
                          ? 'bg-orange-500'
                          : 'bg-yellow-500'
                      }`}>
                      <img src={task.status.name === 'Completed' ? IconDone : IconGoing} alt="status" className="w-4 h-4"/>
                      {task.status.name}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(task);
                          setEdit(true);
                        }}
                        className="p-2 bg-blue-500 rounded hover:bg-blue-600"
                      >
                        <img src={IconEdit} className="w-4 h-4" alt="Edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(task)}
                        className="p-2 bg-red-500 rounded hover:bg-red-600"
                      >
                        <img src={IconDelete} className="w-4 h-4" alt="Delete" />
                      </button>
                      <button
                        onClick={() => handleView(task)}
                        className="p-2 bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        <img src={IconDetail} className="w-4 h-4" alt="View" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>

        {isEdit && (<SetEditscreen closeEditFunction={closeEdit} userData={selectUser} />)}
        {isView && <Viewtask closeView={closeView} dataView={selectUser} />}
        {isDelete && (<DeleteScreen closeDelete={closeDelete} userTaskData={selectUser} onDelete={fetchTasks}/>
        )}
      </div>
    </div>
  );
};

export default TestTable;
