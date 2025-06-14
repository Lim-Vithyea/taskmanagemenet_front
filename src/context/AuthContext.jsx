import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [userProfile,setUserProfile] = useState([]);

  const API_PIC = import.meta.env.VITE_API_PIC;
  const API = import.meta.env.VITE_LARAVEL_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    //store token and user as json
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
//login Auth
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
//logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

 

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, API_PIC ,API, token}}>
      {children}
    </AuthContext.Provider>
  );
};