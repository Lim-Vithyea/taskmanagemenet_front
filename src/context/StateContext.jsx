import { createContext, useContext, useState } from "react";
const StateProps = createContext([])

export const useStateProps = () => useContext(StateProps);

export const StateContext = ({children}) =>{

    const [isOpen,setIsOpen] = useState(false);
    const [isOpentask,setIsopenTask] = useState(false);
    const [show,setShow] = useState(false)
    const openAdd = () => {
        setIsOpen(true);
    }
    const isCloseAdd = () => {
        setIsOpen(false);
    }
    const showPanel = () => {
        setShow(true);
    }
    const unShowPanel = () => {
        setShow(false)
    }
    
    return(
        <StateProps.Provider value={{
            isOpen,
            openAdd,
            isCloseAdd,
            unShowPanel,
            showPanel,
            show,
            setShow
            }}>
            {children}
        </StateProps.Provider>
    )
}