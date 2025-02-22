import React from 'react'
import {Link} from 'react-router-dom'
import image1 from '../assets/draw-love-hand1.png'

function Hero() {
  return (
    <div className='p-10  pt-8 lg:p-48 lg:pt-36  lg:pl-20  md:text-center lg:text-left  font-comfortaa bg-white relative'>
      {/* tablet view */}
      <div className='md:flex mb-16 hidden '>
      <div className='lg:hidden md:ml-12 md:w-80 md:h-80 '>
        <img className="mb-16" src={image1} alt="image"/>
      </div>
      <div className='lg:hidden ml-1 md:w-80 md:h-80 '>
        <img className="mb-16 scale-x-[-1]" src={image1} alt="image"/>
      </div>
      </div>
      {/* mobile view */}
      <div className='md:hidden ml-1  '>
        <img className="mb-16" src={image1} alt="image"/>
      </div>
      {/* computer view */}
      <div className='hidden lg:block lg:absolute  right-36 top-2'>
        <div className=' w-96 h-96 mix-blend-multiply '><img className=" scale-x-[-1]" src={image1} alt="image"/></div>
      </div>

      <div className='lg:pl-20'>
        <h1 className=' mb-3 md:mb-5 text-4xl lg:text-6xl md:text-5xl text-[#00413d] font-black tracking-wide'>Your Personal Mental Wellness Assistant</h1>
      <p className='text-gray-600 lg:text-xl md:text-lg'>Experience 24/7 emotional support, personalized coping strategies, <br/> and mood tracking to improve your mental well-being.</p>
      <div className='mt-8'>
        <Link to={"/Register"}>
          <button className='mr-5 border rounded font-bold p-3 border-[#00413d] text-[#00413d] hover:bg-[#00413d] hover:text-white'>Get Started</button>
        </Link>
        <Link to={"/Login"}>
          <button className='lbtn bg-[#00413d] border-[#00413d] text-white hover:bg-white hover:border-[#00413d] hover:text-[#00413d]'>Login</button>
        </Link>
      </div>
      
      </div>
    </div>
  )
}

export default Hero
