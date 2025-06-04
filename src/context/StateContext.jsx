import { createContext, useContext, useState } from "react";
const StateProps = createContext([])

export const useStateProps = () => useContext(StateProps);

export const StateContext = ({children}) =>{

    const [isOpen,setIsOpen] = useState(false);
    const [isOpentask,setIsopenTask] = useState(false);
    const openAdd = () => {
        setIsOpen(true);
    }
    const isCloseAdd = () => {
        setIsOpen(false);
    }
    const isOpenTask =()=>{
        setIsopenTask(true)
    }

    
    return(
        <StateProps.Provider value={{isOpen,openAdd,isCloseAdd}}>
            {children}
        </StateProps.Provider>
    )
}