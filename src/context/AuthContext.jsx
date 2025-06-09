import { createContext, useContext,  useEffect, useState } from "react";
import axios from "axios";

const Authprops = createContext([])

export const useAuthprops = () => useContext(Authprops);

export const AuthstateContext = ({children}) => {

    const [users,setUsers] = useState([]);
    useEffect(()=>{
        const storeUser = localStorage.getItem("user");
        if(storeUser){
            setUsers(JSON.parse(storeUser));
        }
    },[])
    const handleLogout = async () => {
    const API = import.meta.env.VITE_LARAVEL_API_URL;
    await axios.post(`${API}logout`);
    setUsers(null); 
    navigate('/login');
    };

    const logout = () => {
    setUsers(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
    return(
        <Authprops.Provider value={{users,setUsers,logout,handleLogout}}>
            {children}
        </Authprops.Provider>
    )
}