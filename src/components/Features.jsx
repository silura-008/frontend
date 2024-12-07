import React from 'react'
import Card from './Card'

function Features() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-[#edf1d6] '>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
  )
}

export default Features