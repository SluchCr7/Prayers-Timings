import React from 'react'
import Image from 'next/image'
const Prayer = (props) => {
  return (
      <div className='prayer bg-white flex flex-col items-start gap-3 h-[350px]'>
        <Image src={props.img} alt='prayer' width={100} height={100} className='w-full h-[150px]' />
        <div className='flex flex-col items-start gap-6 p-4 justify-center'>
        <span className='font-sans text-black font-bold tracking-[0.2em] text-3xl'>{props.name}</span>
            <h1 className='font-sans text-accent text-5xl font-black'>{props.time}</h1>
        </div>
    </div>
  )
}

export default Prayer