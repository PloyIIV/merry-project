import React from 'react'

const Button = ({ text, width, height }) => {
  return (
    <button className='bg-pred-500 text-white font-bold rounded-full w-24 h-12'>{text}</button>
  )
}

export default Button
