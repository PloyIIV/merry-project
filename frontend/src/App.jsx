import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './pages/Navbar/Navbar'
import NavbarUnauthen from './pages/Navbar/NavbarUnauthen'
import UnauthenApp from './pages/Unauthenticated/UnauthenApp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <UnauthenApp />
      <ToastContainer />
    </>
  )
}

export default App
