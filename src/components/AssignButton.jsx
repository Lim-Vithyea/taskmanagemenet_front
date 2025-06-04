import IconAssign from "../assets/icon-edit.svg"
const AssignButton = ({setisAddStuff,name}) => {


  return (
    <>
    <button onClick={setisAddStuff} className=' w-[200px] cursor-pointer h-[50px] bg-blue-700 rounded-[7px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]
     hover:bg-blue-900 transition-all duration-100'>
      <div className="flex justify-center">
        <img src={IconAssign} className="w-7 h-7 pt-2"/>
        <span className='font-bold text-white p-2'>{name}</span>
      </div>
        
    </button>
    </>
  )
}

export default AssignButton