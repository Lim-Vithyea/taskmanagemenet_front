import React from 'react'
import { Data } from './TestTable'
import IconDelete from "../assets/icon-delete.svg"
import IconEdit from "../assets/icon-edit.svg"
import IconDetail from "../assets/icon-detail.svg"

const UserTable = () => {
  return (
     <div className="px-4 pb-4">
          <div className="overflow-x-autos shadow">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-blue-500 border-b">
                <tr>
                  <th className="px-6 py-2">Index</th>
                  <th className="px-6 py-2">Username</th>
                  <th className="px-6 py-2">Email</th>
                  <th className="px-6 py-2">password</th>
                  <th className="px-6 py-2 text-center ">Action</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((data, index) => (
                  <tr key={data.id} className="bg-white border-b-2 border-blue-200 hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 text-blue-600 font-bold whitespace-nowrap">{data.name}</td>
                    <td className="px-6 py-4">Example@gmail.com</td>
                    <td className="px-6 py-4">pa$$w0rd</td>
                    <td className="px-6 flex justify-center gap-2 py-2">
                      <button className=" w-10 h-10 bg-blue-600 text-white rounded-xl">
                        <div className='flex justify-center '>
                          <img src={IconEdit} className='w-5 h-5'/>
                        </div>
                        </button>
                      <button className=" w-10 h-10 bg-red-600 text-white rounded-xl">
                        <div className='flex justify-center'>
                          <img src={IconDelete} className='w-5 h-5'/>
                        </div>
                      </button>
                      <button className=" w-10 h-10 bg-yellow-500 text-white rounded-xl">
                        <div className='flex justify-center'>
                          <img src={IconDetail} className='w-5 h-5'/>
                        </div>
                      </button>
                  </td>                     
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default UserTable