import React, { useState } from 'react';
import LoginPic from "../assets/login.jpg";
import NUM from "../assets/NUM.png";
import { useNavigate } from 'react-router-dom';
import ParticlesComponent from '../components/Particle';
import "../components/particle.css";
import { useAuthprops } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const { setUsers } = useAuthprops();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,[name]: value
    }));
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const API = import.meta.env.VITE_LARAVEL_API_URL;
    const response = await axios.post(`${API}login`, formData);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    navigate("/dashboard");
  } catch (error) {
    if (error.response) {
      console.error("Login failed:", error.response.data.message);
    } else {
      console.error("Login error:", error.message);
    }
  }
};

  return (
    <div>
      <ParticlesComponent id="particles"/>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-[900px] z-10 h-[500px] bg-white pl-[30px] rounded-2xl shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex' >
          <div className='w-[400px] h-[450px] bg-white m-auto rounded-2xl shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'>
            <div className='mt-[40px]'>
              <div className='flex justify-center'>
                <img src={NUM} className='w-[50px] h-[50px]' alt='logo'/>
              </div>
              <h1 className='text-center font-bold text-[20px] mb-2'>Task Management System</h1>
              <h1 className='text-center font-semibold text-xl text-blue-500'>Login</h1>
            </div>
            <form className='flex justify-center' onSubmit={handleLogin}>
              <div className='flex justify-center flex-col'>
                <div className='flex flex-col'>
                  <label>Email</label>
                  <input 
                    type='email' 
                    name='email' 
                    value={formData.email} 
                    onChange={handleInputChange}
                    className='w-[300px] h-[50px] p-2 rounded-[5px] border-3 border-blue-500' 
                    placeholder='Enter your username'
                  />
                  <label className='mt-5'>Password</label>
                  <input 
                    type='password' 
                    name='password' 
                    value={formData.password} 
                    onChange={handleInputChange}
                    className='w-[300px] h-[50px] p-2 rounded-[5px] border-3 border-blue-500' 
                    placeholder='Enter your password'
                  />
                </div>
                <button className='max-w-[300px] h-[50px] cursor-pointer bg-blue-500 rounded-[5px] mt-10 hover:bg-blue-300 transition-all duration-300'>
                  <span className='font-bold text-white'>Login</span>
                </button>
              </div>
            </form>
          </div>
          <div className='ml-[30px]'>
            <img src={LoginPic} className='w-[500px] h-[500px] rounded-2xl' alt='login-illustration'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
