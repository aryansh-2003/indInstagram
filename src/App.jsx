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

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(
      () => setloading(false)
    )
  }, [])

  return !loading ? (
    <div className='min-h-screen bg-gray-50'>
      {/* Main Layout Container */}
      <div className='flex'>
        {/* Left Sidebar - Fixed position on desktop, bottom nav on mobile */}
        <Header />
        
        {/* Main Content Area - Takes remaining space */}
        <div className='flex-1 md:ml-[20%]  md:mb-0'>
          <main className='w-full'>
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Footer - Hidden on mobile, shown only when needed */}
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default App