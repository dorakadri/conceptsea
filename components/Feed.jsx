import React from 'react'
import HomeCard from './HomeCard'

const Feed = ({data}) => {
  return (
    <div className='my-12 '>
<div className="grid grid-cols-4 gap-6 text-center">
  {data?.map((concept,i) =>(

    <HomeCard key={i} concept={concept}   />
  ))}
    
</div>
    

    </div>
  )
}

export default Feed