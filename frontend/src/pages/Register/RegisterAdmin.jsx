import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const RegisterAdmin = () => {
    const url = 'https://merry-project.vercel.app'
    const [inputValue, setInputValue] = useState({
        username: '',
        password: '',
        email: ''
    })

    const handleSubmit = async () => {
        const response = await axios.post(`${url}/admin/register`, inputValue)
        if(response.data.data) {
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='w-screen h-[85vh] flex justify-center items-center'>
            <ToastContainer theme='colored' />
            <div className='flex flex-col w-fit px-10 py-4 items-center justify-center rounded-3xl shadow-2xl'>
                <h1 className='font-bold text-pred-500'>Register for Admin user</h1>
                <label htmlFor="username" className='py-2 font-bold text-gray-500'>Username</label>
                <input onChange={(event) => setInputValue({...inputValue, username: event.target.value })} type="text" id='username' name='username' className='rounded-full px-3 py-2 shadow-inner border' />
                <label htmlFor="password" className='py-2 font-bold text-gray-500'>Password</label>
                <input onChange={(event) => setInputValue({...inputValue, password: event.target.value })} type="password" id='password' name='password' className='rounded-full px-3 py-2 shadow-inner border' />
                <label htmlFor="email" className='py-2 font-bold text-gray-500'>Email</label>
                <input onChange={(event) => setInputValue({...inputValue, email: event.target.value })} type="email" id='email' name='email' className='rounded-full px-3 py-2 shadow-inner border' />
                <button onClick={handleSubmit} className='bg-pred-500 rounded-full w-40 py-2 text-white font-bold my-5'>Register</button>
            </div>
        </div>
  )
}

export default RegisterAdmin