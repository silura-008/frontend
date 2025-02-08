import React from 'react'
import { Link } from 'react-router-dom'
import { 
    AlertTriangle
  } from 'lucide-react';

const Error = ({current}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50 text-red-600">
        <div className="text-center ">
          <AlertTriangle size={48} className="mx-auto mb-4" />
          <p className="text-xl text-bold">Something Went Wrong! </p>
          
          <Link to={`/${current}`}>
            <button className=" mt-5  py-3 px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02]">
            Try again
            </button>
          </Link>
        </div>
      </div>
  )
}

export default Error