import React from 'react'
import Logo from '../../components/ui/Logo'
import { useNavigate } from 'react-router-dom'


const NavbarUnauthen = () => {
    const navigate = useNavigate();
    // const url = 'http://localhost:5173'
    const url = 'https://merry-project-frontend.vercel.app'
  return (
    <div className='flex justify-around h-20 items-center shadow-xl relative z-10'>
        <Logo />
        <div>
            <button className='font-bold text-ppurple-800 hidden md:inline'><a href={`${url}/#why-merry`}>Why Merry Match?</a></button>
            <button className='font-bold text-ppurple-800 hidden md:inline px-8'><a href={`${url}/#how-to`}>How to Merry</a></button>
            <button onClick={() => navigate('/login')} className='bg-pred-500 text-white font-bold rounded-full w-24 h-12'>Login</button>
        </div>
    </div>
  )
}

export default NavbarUnauthen