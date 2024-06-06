import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './pages/Navbar/Navbar'
import Login from './pages/Login/Login'
import Matching from './pages/Matching/Matching'
import PopupPreview from './pages/PopupPreview/PopupPreview'

const AuthenticatedApp = () => {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/matching' element={<Matching />} />
            <Route path='/login' element={<Login />} />
            <Route path='/:userId' element={<PopupPreview />} />
            <Route path='*' element={<Home />} />
        </Routes>
    </>
  )
}

export default AuthenticatedApp