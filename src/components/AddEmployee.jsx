import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useStateProps } from '../context/StateContext';
import axios from 'axios';

const AddEmployee = () => {
  const [show, setShow] = useState(false);
  const { isCloseAdd } = useStateProps();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    password: '',
    role: '', 
  });

//litte animation
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const clearInput = () => {
    setEmployeeData({
      name: '',
      email: '',
      password: '',
      role: '',
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Employee Data:', employeeData);
  //   clearInput();
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_LARAVEL_API_URL;
      const response = await axios.post(`${API}adduser`, employeeData);
      // setMessage(response.data.message);
      setEmployeeData({ name: "", password: "", role: "", email: "" });
      console.log("user data",setEmployeeData);
    } catch (error) {
      console.error("Error submitting data:", error);
      const errorMsg = error.response?.data?.error || error.response?.data?.details || "Unknown error";
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } flex justify-center items-center fixed inset-0 bg-black/50 backdrop-blur-sm z-40`}
    >
      <div className="w-[600px] max-w-3xl bg-white rounded-2xl shadow-lg p-8 mx-4">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Add New Employee
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="name"
                value={employeeData.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="John"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={employeeData.password}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Select Role</label>
              <select
                name="role"
                value={employeeData.role}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required>
                <option value="">Select role</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={isCloseAdd}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
              Cancel
            </button>
            <Button name="Save" color="bg-blue-500 hover:bg-blue-600" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
