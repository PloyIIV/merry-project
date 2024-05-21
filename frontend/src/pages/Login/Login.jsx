import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
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

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='min-w-full bg-slate-500 flex justify-center'>
        <div className='w-4/5 flex justify-between'>
            <div className='bg-red-300 w-1/3'>
                <p>asd</p>
            </div>
            <div className='bg-yellow-300 w-1/2'>
                <div>
                    <h6>LOGIN</h6>
                    <h1>Welcome back to</h1>
                    <h1>Merry Match</h1>
                </div>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <p>Username or Email</p>
                        <input onChange={onChangeHandler} value={data.username} name='username' type="text" placeholder='Enter Username or Email' required />
                    </div>
                    <div>
                        <p>Password</p>
                        <input onChange={onChangeHandler} value={data.password} name='password' type="password" placeholder='Enter password' required />
                    </div>
                    <button className='bg-pred-500 text-white font-bold rounded-full w-24 h-12'>Login</button>
                    <div className='flex'>
                        <p>Don't have an account?</p>
                        <button onClick={() => navigate('/register')} className='text-pred-500 font-bold px-2'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login