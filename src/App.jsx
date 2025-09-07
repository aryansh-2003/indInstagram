import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import {login, logout,} from './store/authSlice'
import {Header} from './components'
import {Footer} from './components'
import { Outlet } from 'react-router-dom'



function App() {

  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
      
    })
    .finally(
      ()=>setloading(false)
    )
  },[])

 
  return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full flex flex-row'>
    <Header/>
    <Outlet/>
    </div>
    <Footer/>
  </div>
) : null
}

export default App
