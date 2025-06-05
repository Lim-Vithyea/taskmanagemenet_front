import { Children, createContext, useContext, useState } from "react";

const Authprops = createContext([])

export const useAuthprops = () => useContext(Authprops);

export const AuthstateContext = ({children}) => {

    const [users,setUsers] = useState([]);
    return(
        <Authprops.Provider value={{users,setUsers}}>
            {children}
        </Authprops.Provider>
    )
}