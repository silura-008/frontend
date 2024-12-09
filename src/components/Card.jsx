import React from 'react'

function Card({ icon, title, description }) {
  return (
    <div className='p-5 rounded-lg border text-center text-green-950 border-white bg-white shadow-lg'>
      <div className='mb-4'>
        <center>{icon}</center>
      </div>
      <h2 className='text-xl font-semibold py-2'>{title}</h2>
      <p className='font-normal text-base'>{description}</p>
    </div>
  )
}

export default Card
