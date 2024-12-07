import React from 'react'
import {Link} from 'react-router-dom'

function Hero() {
  return (
    <div className='p-11 pt-28 lg:p-48 lg:pt-36 md:pl-20 text-center md:text-left font-comfortaa bg-[#00413d] '>
      <h1 className=' mb-3 md:mb-5 text-4xl lg:text-6xl md:text-5xl text-white font-black tracking-wide '>Your Personal Mental Wellness Assistant</h1>
      <p className='text-gray-400 lg:text-xl md:text-lg'>Experience 24/7 emotional support, personalized coping strategies, <br/> and mood tracking to improve your mental well-being.</p>
      <div className='mt-8'>
        <Link to={"/Register"}>
          <button className='mr-5 border rounded font-bold p-3 bg-[#00413d]  hover:text-[#00413d] hover:bg-white  text-white'>Get Started</button>
        </Link>
        <Link to={"/Login"}>
          <button className='lbtn bg-white border-white'>Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Hero