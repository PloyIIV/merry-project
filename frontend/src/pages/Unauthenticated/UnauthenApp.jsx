import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NavbarUnauthen from '../Navbar/NavbarUnauthen'
import Test from '../Test'
import { ToastContainer, toast } from 'react-toastify';

const UnauthenApp = () => {
  return (
    <>
        <ToastContainer />
        <NavbarUnauthen />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/test' element={<Test />} />
            <Route path='*' element={<Login />} />
        </Routes>
    </>
  )
}

export default UnauthenApp