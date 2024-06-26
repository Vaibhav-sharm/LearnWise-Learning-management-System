import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5'>
      <Image src='/Panda.png' alt="panda" width={100} height={100}/>
      <div>
        <h2 className='font-bold text-[29px]'>Welcome to <span className='text-primary'>Vaibhav's</span> Academy</h2>
        <h2 className='text-gray-500'>Explore, Learn and build your Knowledge</h2>
      </div>
    </div>
  )
}

export default WelcomeBanner
