import React from 'react'
import { useAuth } from '../context/AuthContext'


const Dashboard = () => {
    const {user} = useAuth();

  return (
    <div className="p-5 w-full border-b border-gray-300 min-h-[80vh] flex flex-col flex-grow items-center justify-center text-center">
        <h1 className='text-4xl'>Welcome Back to Your Dashboard <br /><span className='font-bold'>{user.name.toUpperCase()}</span></h1>
    </div>
  )
}

export default Dashboard
