import React from 'react'
function Navbar() {
  return (
    <div className='flex items-center justify-between p-5 pt-4 bg-blue-600'>
        <h3 className='text-xl font-semibold text-white  lg:ml-5'>MindCare</h3>
        <div className='hidden lg:flex mr-5'>
        <button className="font-bold rounded border border-white p-3 px-4 bg-blue-800 shadow-inner text-white mr-6 hover:bg-blue-500  hover:ring-blue-300 duration-300 ease-in-out">
          Register
        </button>
        <button className="font-bold rounded border border-white p-3 px-6 bg-blue-800 shadow-inner text-white hover:bg-blue-500  hover:ring-blue-300 duration-300 ease-in-out">
          Login
        </button>
        </div>
    </div>
  )
}

export default Navbar