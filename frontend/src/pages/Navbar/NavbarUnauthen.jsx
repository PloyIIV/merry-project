import React from 'react'
import Logo from '../../components/ui/Logo'
import { useNavigate } from 'react-router-dom'


const NavbarUnauthen = () => {
    const navigate = useNavigate();
  return (
    <div className='flex justify-around h-20 items-center shadow-xl'>
        <Logo />
        <div>
            <button className='font-bold text-ppurple-800'><a href='#why-merry'>Why Merry Match?</a></button>
            <button className='font-bold text-ppurple-800 px-8'><a href='#how-to'>How to Merry</a></button>
            <button onClick={() => navigate('/login')} className='bg-pred-500 text-white font-bold rounded-full w-24 h-12'>Login</button>
        </div>
    </div>
  )
}

export default NavbarUnauthen