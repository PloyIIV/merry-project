import React from 'react'
import Logo from '../../components/ui/Logo'

const Navbar = () => {
  return (
    <div className='flex justify-around h-20 items-center'>
        <Logo />
        <div>
            <button className='font-bold text-putility-600'><a href='#why-merry'>Start Matching!</a></button>
            <button className='font-bold text-putility-600 px-8'><a href='#how-to'>Merry Membership</a></button>
            
        </div>
    </div>
  )
}

export default Navbar