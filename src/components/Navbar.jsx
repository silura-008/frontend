import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex items-center justify-between font-comfortaa p-5 pt-4 bg-white'>
      {/* lg:pl-36 */}
      <h3 className=' md:pl-10  text-xl font-black text-[#00413d] md:ml-5'>MindCare</h3>
      <div className='hidden md:flex mr-5'>
        <Link to={"/Register"}>
          <button className="bg-[#00413d] p-3 mr-5 lbtn text-white hover:bg-white hover:text-[#00413d] hover:border-[#00413d] border">
            Register
          </button>
        </Link>
        <Link to={"/Login"}>
          <button className="lbtn bg-[#00413d] text-white hover:bg-white  hover:text-[#00413d] hover:border-[#00413d] border">
            Login
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
