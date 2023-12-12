import React from 'react'
import Image from 'next/image'
const HomeCard = () => {
  return (
    <div className='flex flex-col'>
    <div className='w-full gap-3 bg-black rounded-xl'>
      <Image src="/assets/images/grid.svg" width={500} height={500} alt=' '/>
    </div>
    <div className='flex justify-between items-center pt-3'>
    <div className='flex  items-center justify-center gap-4 '>
    <Image src="/assets/images/logo.svg" alt='user_image' width={24} height={24} className='rounded-full object-contain'/>
    <h3 className='font-exo text-sm light-gray'>kadri dorra</h3>
    </div>
    </div>
    </div>
  )
}

export default HomeCard