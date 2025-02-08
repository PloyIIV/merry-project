import React, { useState } from 'react'
import { useRegister } from '../../contexts/registerContext'
// input[type="date"]::-webkit-calendar-picker-indicator {
//     background-color: yellow;
// }

export const StepOne = () => {
    const { data, setData } = useRegister();
    const [confirmPassword, setConfirmPassword] = useState('')

    const onChangeHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setData((data) => ({ ...data, [name]: value }))
    }

  return (
    <div>
        <h1 className='mb-3 text-xl text-ppurple-500 font-bold'>Basic Information</h1>
        <div className='bg-purple-300/0 grid grid-cols-2'>
            <div className='mr-5 mb-5'>
                <p>Name</p>
                <input className='border w-full rounded-xl py-2 px-3' onChange={onChangeHandler} value={data.name} type="text" name='name' id='name' placeholder='John Snow' />
            </div>
            <div className='ml-5 mb-5'>
                <p>Date of birth</p>
                <input className='border w-full rounded-xl py-2 px-3' onChange={onChangeHandler} value={data.dateOfBirth} type="date" name='dateOfBirth' id='dateOfBirth' />
            </div>
            <div className='mr-5 mb-5'>
                <p>Location</p>
                <input className='border w-full rounded-xl py-2 px-3' onChange={onChangeHandler} value={data.location} type="text" name='location' id='location' placeholder='Thailand' />
            </div>
            <div className='ml-5 mb-5'>
                <p>City</p>
                <input className='border w-full rounded-xl py-2 px-3' onChange={onChangeHandler} value={data.city} type="text" name='city' id='city' placeholder='Bangkok' />
            </div>
            <div className='mr-5 mb-5'>
                <p>Username</p>
                <input className='border w-full rounded-xl py-2 px-3' onChange={onChangeHandler} value={data.username} type="text" name='username' id='username' placeholder='At least 6 character' />
            </div>
            <div className='ml-5 mb-5'>
                <p>Email</p>
                <input className='border w-full rounded-xl py-2 px-3' onChange={onChangeHandler} value={data.email} type="email" name='email' id='email' placeholder='name@website.com' />
            </div>
            <div className='mr-5 mb-5'>
                <p>Password</p>
                <input className='border w-full rounded-xl py-2 px-3' onChange={onChangeHandler} value={data.password} type="password" name='password' id='password' placeholder='At least 8 charactors' />
            </div>
            <div className='ml-5 mb-5'>
                <p>Confirm password</p>
                <input className='border w-full rounded-xl py-2 px-3' onChange={onChangeHandler} value={data.confirmPassword} type="password" name='confirmPassword' id='confirmPassword' placeholder='At least 8 charactors' />
            </div>
        </div>
    </div>
  )
}

export const StepTwo = () => {
    const { data, setData, tags, setTags } = useRegister();
    const [inputValue, setInputValue] = useState("")

    const onChangeHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setData((data) => ({ ...data, [name]: value }))
    }
    const addTag = (event) => {
        if(event.key === 'Enter') {
            const newString = event.target.value
            let newArray = tags
            let haveTag = tags.indexOf(newString)
            if(newString && tags.length < 10 && haveTag === -1) {
                newArray.push(newString.trim())
            }
            setTags(newArray)
            setInputValue("")
        }
    }
    const removeTag = (targetTag) => {
        const newArray = tags.filter((tag) => tag !== targetTag)
        setTags(newArray)
    }

    const sexOptions = (
        <>
            <option className='hidden' value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </>
    )

  return (
    <div>
        <h1 className='mb-3 text-xl text-ppurple-500 font-bold'>Identities and Interests</h1>
        <div className='bg-purple-300/0 grid grid-cols-2'>
            <div className='mr-5 mb-5'>
                <p>Sexual Identities</p>
                    <select className={`w-full border rounded-xl p-2`} value={data.sexIdentities} onChange={onChangeHandler} name="sexIdentities" id="sexIdentities">
                        {sexOptions} 
                    </select>
            </div>
            <div className='ml-5 mb-5'>
                <p>Sexual Preferences</p>
                
                    <select  className={`w-full border rounded-xl p-2`} value={data.sexPreferences} onChange={onChangeHandler} name="sexPreferences" id="sexPreferences">
                        {sexOptions}
                    </select>
            </div>
            <div className='mr-5 mb-5'>
                <p>Racial Preferences</p>
                
                    <select required className={`w-full border rounded-xl p-2`} value={data.racialPreferences} onChange={(event) =>  setData({racialPreferences: event.target.value}) } name="racialPreferences" id="racialPreferences">
                        <option value="asian">Asian</option>
                        <option value="europe">Europe</option>
                        <option value="africa">Africa</option>
                        <option value="america">America</option>
                        <option value="other">Other</option>
                    </select>
            </div>
            <div className='ml-5 mb-5'>
                <p>Meeting Interests</p>
                
                    <select  className={`w-full border rounded-xl p-2`} value={data.meetingInterests} onChange={(event) =>  setData({meetingInterests: event.target.value}) } name="meetingInterests" id="meetingInterests">
                        <option value="friend">Friend</option>
                        <option value="boyfriend">Boyfriend / Girlfriend</option>
                        <option value="casual">Casual</option>
                        <option value="other">Other</option>
                    </select>
            </div>
        </div>
        <div className=''>
            <p>Hobbies / Interests (Maximum 10)</p>
            <div className='flex items-center flex-wrap border p-2 rounded-xl gap-2'>
                {tags.map((tag, index) => {
                    return (
                        <div key={index} className='flex items-center rounded-xl h-8 px-3 bg-ppurple-100 text-ppurple-600 font-semibold'>
                            {tag}
                            <div onClick={() => removeTag(tag)} className='ml-2 cursor-pointer'>✖</div>
                        </div>
                    )
                })}
                <input className='flex-1 border-none outline-none p-1' onKeyUp={addTag} onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text" name='tags' id='tags' placeholder='Series' />
            </div>
        </div>
    </div>
  )
}

export const StepThree = () => {
  return (
    <div>StepThree</div>
  )
}

