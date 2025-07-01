import React from 'react'
import ProfileCard from '../components/ProfileCard'
import Vithyeapic from "../assets/Vithyea.jpg"
import Samaunpic from '../assets/samaun.jpg'
import Pfpic from "../assets/pfpic.jpg"

const TeamData = [
  { id: 1, name: "Lim Vithyea", pic: Vithyeapic, facebooklink: "https://www.facebook.com/lim.vithyea.58", github: "https://github.com/Lim-Vithyea" },
  { id: 2, name: "Doem Samaun", pic: Samaunpic, facebooklink: "https://www.facebook.com/z90xfiu4u1", github: "https://github.com/Lim-Vithyea" },
  { id: 3, name: "Vannon", pic: Pfpic, facebooklink: "https://www.facebook.com/lim.vithyea.58", github: "https://github.com/Lim-Vithyea" },
  { id: 4, name: "Thuon Sithun", pic: Pfpic, facebooklink: "https://www.facebook.com/lim.vithyea.58", github: "https://github.com/Lim-Vithyea" },
]

const OurTeam = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center py-5 px-4">
        <h1 className="text-2xl font-semibold text-center mb-2">Meet our awesome Team</h1>
        <p className='text-justify p-5'>
          Behind this Task Management System is a small yet powerful team dedicated to creating a reliable, user-friendly, and efficient platform for managing daily work and projects. Our goal is simple: to help organizations and individuals stay organized, productive, and in control.
          We come from different backgrounds—development, UI/UX design, data management, and user support—but we share one mission: to simplify task tracking and improve team collaboration.
          From building secure APIs and responsive interfaces to testing features and listening to user feedback, we work together to ensure everything runs smoothly.
          Whether you're a team leader tracking progress or a user organizing your day, we're here to support your journey—every step of the way.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {TeamData.map((data) => (
            <ProfileCard
              key={data.id}
              name={data.name}
              pic={data.pic}
              facbookLink={data.facebooklink}
              githubLink={data.github}
            />
          ))}
        </div>
      </div>

      {/* Footer pushed to bottom */}
      <div className='flex justify-center py-2'>
        <p className='italic text-sm text-gray-500'>By Lim Vithyea © 2025</p>
      </div>
    </div>
  )
}

export default OurTeam
