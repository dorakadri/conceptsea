import React from 'react'
import HomeCard from './HomeCard'

const Feed = () => {
  return (
    <div className='mt-16 '>
<div className="grid grid-cols-4 gap-4 text-center">
  {[1,2,3,4,5,6].map((e,i) =>(

    <HomeCard key={i}/>
  ))}
    
</div>
    

    </div>
  )
}

export default Feed