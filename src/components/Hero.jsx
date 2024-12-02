import React from 'react'

function Hero() {
  return (
    <div className='p-11 pt-28 lg:p-48 lg:pt-36 text-center lg:text-left'>
      <h1 className=' mb-3 lg:mb-5 text-4xl lg:text-6xl'>Your Personal Mental Wellness Assistant</h1>
      <p className='text-gray-700 lg:text-xl'>Experience 24/7 emotional support, personalized coping strategies, <br/> and mood tracking to improve your mental well-being.</p>
      <div className='mt-8'>
        <button className='mr-4 border rounded font-bold p-3 bg-[#2563eb] text-white'>Get Started</button>
        <button className='border border-[#2563eb] rounded font-bold p-3 px-5 text-[#2563eb] hover:bg-[#2563eb] hover:text-white duration-300 ease-in-out'>Login</button>
      </div>
    </div>
  )
}

export default Hero