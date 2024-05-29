import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import boy from '../../../public/boy-complaint-form-page.png'
import axios from 'axios'
import { useAuth } from '../../contexts/authenContext'
import { toast } from 'react-toastify'

const Login = () => {
    const { login, url, loading } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({...data, [name]: value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const res = await login(data)
        if(res.message) {
            toast.error(res.message)
        }
        if(res.id) {
            toast("Welcome back")
        }
    }

    useEffect(() => {

    }, [loading])

  return (
    <div className='min-w-full h-[90vh] flex justify-center'>
        <div className='w-4/5 flex justify-evenly items-center'>
            <div className='md:w-1/4 xl:w-fit'>
                <img src={boy} alt="boy" />
            </div>
            <div className='w-1/3'>
                <div>
                    <h6 className='text-pbeige-700 font-semibold'>LOGIN</h6>
                    <div  className='text-ppurple-500 font-extrabold text-5xl mt-3'>
                        <h1>Welcome back to</h1>
                        <h1>Merry Match</h1>
                    </div>
                </div>
                {!loading ? <form onSubmit={onSubmitHandler}>
                    <div className='mt-6'>
                        <p>Username or Email</p>
                        <input onChange={onChangeHandler} value={data.username} name='username' type="text" className='rounded-lg border border-pgray-400 w-full h-10 pl-3 mt-1' placeholder='Enter Username or Email' required />
                    </div>
                    <div className='mt-6'>
                        <p>Password</p>
                        <input onChange={onChangeHandler} value={data.password} name='password' type="password" className='rounded-lg border border-pgray-400 w-full h-10 pl-3 mt-1' placeholder='Enter password' required />
                    </div>
                    <button className='bg-pred-500 text-white font-bold rounded-full w-full h-12 my-8'>Login</button>
                    <div className='flex'>
                        <p>Don't have an account?</p>
                        <button onClick={() => navigate('/register')} className='text-pred-500 font-bold px-2'>Register</button>
                    </div>
                </form> 
                : <p>Loading</p>}
            </div>
        </div>
    </div>
  )
}

export default Login