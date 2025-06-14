import React from 'react'
import PieChart from '../components/chart/PieChart'
import { BarChart } from '../components/chart/BarChart'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Report = () => {
     const [taskCount,setTaskcount] = useState({});
     const {API,token} = useAuth();

     useEffect(()=>{
      const getTaskCount = async() => {
        try{
          const res = await axios(`${API}gettaskcount`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTaskcount(res.data);
          console.log(res.data)
        } catch(err) {
          console.log("Error:"+err)
        }
      }
      getTaskCount();
    },[])

  return (
        <div>
            <div className='py- grid grid-cols-2 '>
                <div className=' mx-2 py-3 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-[5px]'>
                    <h1 className='text-center pb-5 font-semibold'>User</h1>
                    <PieChart
                    title="Users by Role"
                    labels={['All task', 'completed','in progress']}
                    data={[
                        taskCount.total_task, 
                        taskCount.task_completed,
                        taskCount.task_inprogress
                    ]}
                    donut={true}
                />
                </div>
                <div className='mx-2 py-3 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-[5px]'>
                    <h1 className='text-center pb-5 font-semibold'>Example</h1>
                    <BarChart
                    title="User Statistics"
                    labels={['Admin', 'User', 'Guest']}
                    datasets={[
                        {
                        label: 'Count',
                        data: [10, 20, 5],
                        }
                    ]}
                    />
                </div>
            </div>
        </div>
  )
}

export default Report
