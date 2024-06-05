import React from 'react'
import Logo from '../../components/ui/Logo'

const Navbar = () => {
  return (
    <div className='flex justify-around h-20 items-center shadow-md'>
        <Logo />
        <div>
            <button className='font-bold text-putility-600'><a href='/matching'>Start Matching!</a></button>
            <button className='font-bold text-putility-600 px-8'><a href='#how-to'>Merry Membership</a></button>
        </div>
    </div>
  )
}

export default Navbar