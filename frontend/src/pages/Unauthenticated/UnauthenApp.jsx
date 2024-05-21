import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NavbarUnauthen from '../Navbar/NavbarUnauthen'

const UnauthenApp = () => {
  return (
    <>
        <NavbarUnauthen />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Login />} />
        </Routes>
    </>
  )
}

export default UnauthenApp