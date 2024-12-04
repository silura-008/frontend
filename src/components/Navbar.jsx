import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='flex items-center justify-between font-comfortaa  p-5 pt-4  bg-[#00413d] '>
        <h3 className=' md:pl-10 text-xl font-black  text-white md:ml-5'>MindCare</h3>
        <div className='hidden md:flex mr-5'>
        <Link to={"/Register"}>
          <button className=" bg-white  p-3 mr-5 lbtn">
          Register
          </button>
          </Link>
          <Link to={"/Login"}>
            <button className="lbtn bg-white">
            Login
            </button>
          </Link>
        </div>
    </div>
  )
}
// f0f8ff alice white
// 00413d main bg
export default Navbar