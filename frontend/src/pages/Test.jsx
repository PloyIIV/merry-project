import axios from 'axios'
import React, { useEffect } from 'react'

const Test = () => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3000/user/log')
        console.log(response);
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div>Test</div>
  )
}

export default Test