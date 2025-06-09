import React from 'react'
import ProfileCard from '../components/ProfileCard'
import Vithyeapic from "../assets/Vithyea.jpg"
import Samaunpic from '../assets/samaun.jpg'
import Pfpic from "../assets/pfpic.jpg"

const TeamData = [
    {id:1,name:"Lim Vithyea",pic:Vithyeapic},
    {id:2,name:"Doem Samaun",pic:Samaunpic},
    {id:3,name:"Vannon",pic:Pfpic},
    {id:4,name:"Thuon Sithun",pic:Pfpic},
]

const OurTeam = () => {
  return (
    <div className="flex flex-col items-center py-5 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Meet our Team</h1>
      <div className="grid grid-cols-2 gap-6">
       {TeamData.map((data) => (
            <ProfileCard key={data.id} name={data.name} pic={data.pic} />
        ))}  
      </div>
    </div>
  )
}

export default OurTeam
