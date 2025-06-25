
import React, { useState } from 'react';
import LoginPic from "../assets/login.jpg";
import NUM from "../assets/NUM.png";
import { useNavigate, useLocation } from 'react-router-dom';
import ParticlesComponent from '../style/Particle';
import "../style/particle.css";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Mail } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { LoadingAnimation } from '../components/TestTable';
import LoginLoading from '../components/LoginLoading';

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const API = import.meta.env.VITE_LARAVEL_API_URL;
      await new Promise(resolve => setTimeout(resolve, 1000))
      const response = await axios.post(`${API}login`, formData);
      login(response.data.user, response.data.token);
      const to = location.state?.from?.pathname || "/dashboard";
      navigate(to);
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false)
    }
  };
  return (
    <div>
      <ParticlesComponent id="particles"/>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-[900px] z-10 h-[500px] bg-white pl-[30px] rounded-[5px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex' >
          <div className='w-[400px] h-auto bg-white m-auto rounded-[5px] '>
            <div className='mt-[40px]'>
              <div className='flex justify-center'>
                <img src={NUM} className='w-[50px] h-[50px]' alt='logo'/>
              </div>
              <h1 className='text-center font-bold text-[20px] mb-2'>Task Management System</h1>
              <h1 className='text-center font-semibold text-xl text-blue-500'>Login</h1>
            </div>
            {error && (
              <div className="mt-2 text-center text-red-500">
                {error}
              </div>
            )}
            <form className='flex justify-center w-full px-4 sm:px-0' onSubmit={handleLogin}>
              <div className='flex flex-col w-full max-w-xs'>
                <div className='flex flex-col'>
                  <label className='flex items-center'>
                    <Mail className='p-1' />Email
                  </label>
                  <input 
                    type='email' 
                    name='email' 
                    value={formData.email} 
                    onChange={handleInputChange}
                    className='w-full h-[50px] p-2 rounded-[5px] border-2 border-blue-500' 
                    placeholder='Enter your email'
                    required
                  />
                  <label className='mt-5 flex items-center'>
                    <LockKeyhole className='p-1' />Password
                  </label>
                  <input 
                    type='password' 
                    name='password' 
                    value={formData.password} 
                    onChange={handleInputChange}
                    className='w-full h-[50px] p-2 rounded-[5px] border-2 border-blue-500' 
                    placeholder='Enter your password'
                    required
                  />
                </div>
                <div className='py-10 flex justify-center'>
                  <button 
                    type="submit"
                    className='w-full max-w-xs px-10 py-[10px] cursor-pointer bg-blue-500 rounded-[5px] hover:bg-blue-600 transition-all duration-300'
                  >
                    <span className='font-bold text-white'>Login</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className='ml-[30px]'>
            <img src={LoginPic} className='w-[500px] h-[500px] rounded-2xl' alt='login-illustration'/>
          </div>
        </div>
      </div>
      {loading && (
        <LoginLoading/>
        )}
    </div>
  );
};

export default Login;