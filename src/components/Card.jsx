import React from 'react'

const Card = ({image}) => {
  return (
    <div className=' w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] cursor-pointer bg-[#030326] border-2 border-[#0000ff66]  hover:shadow-2xl hover:shadow-blue-950 hover:border-4 hover:border-white hover:scale-110  transition-all duration-200 rounded-2xl overflow-hidden'>
        <img src={image} alt="" className='h-full w-full object-cover' />

    </div>
  )
}

export default Card