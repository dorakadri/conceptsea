import React from 'react'
import Image from 'next/image'
const HomeCard = ({concept}) => {
  return (
    <div className='flex flex-col' >
    <a className=' gap-3 rounded-xl relative ' href={`/Concept-detail?id=${concept._id}`}>
      <Image src={concept.image} className=' w-[405px]  h-[304px] rounded-xl object-fill' width={405} height={304}  alt=' '/>

      <div className="flex gap-2 absolute bottom-2 left-2 ">
            {concept.tags &&
              concept.tags.split(",").map((e, i) => (
                <div key={i} className=" rounded-full  drop-shadow-lg ship_gradient">
                  <p className="font-exo  text-[12px] text-white">#{e}</p>
                </div>
              ))}
          </div>
    
    </a>
    <div className='flex justify-between items-center pt-3'>
    <div className='flex  items-center justify-center gap-4 '>
    <Image src={concept.user.image} alt='user_image' width={24} height={24} className='rounded-full object-contain'/>
    <h3 className='font-exo text-sm light-gray'>{concept.user.firstName} {concept.user.lastName}</h3>
    </div>
    </div>  

    </div>
  )
}

export default HomeCard