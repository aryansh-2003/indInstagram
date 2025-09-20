import React from 'react'
import {Container,Logo,Logoutbtn} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const userData = useSelector((state)=> state.auth.userData)
    const navigate = useNavigate();

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          image: (
            <svg aria-label="Home" className="w-6 h-6 hover:text-gray-700 text-white" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
              <title>Home</title>
              <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
            </svg>
          ),
          active: true
        }, 
        {
          name: "Create",
          slug: "/add-post",
          image: (
            <svg aria-label="New post" className="w-6 h-6 hover:text-gray-700 text-white" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
              <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
            </svg>
          ),
          active: authStatus,
        },
        {
          name: "Login",
          slug: "/login",
          image: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" role="img" aria-labelledby="loginCircleTitle" className="icon w-6 h-6 text-white">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                  <path d="M18 24h14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 18l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
          ),
          active: !authStatus,
        },
        {
          name: "Signup",
          slug: "/signup", 
          image: (
             <svg aria-label="New post" className="w-6 h-6 hover:text-gray-700 text-white" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
              <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
            </svg>
                 ),
          active: !authStatus,
        },
        {
          name: "All Posts",
          slug: "/all-posts",
          image: (
            <svg aria-label="Profile" className="w-6 h-6 text-white hover:text-gray-700" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
              <circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle>
              <path d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></path>
              <circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle>
            </svg>
          ),
          active: authStatus,
        },
        {
          name: "Profile",
          slug: `/user/${userData ? userData.$id : null}`,
          image: (
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          ),
          active: authStatus
        }
      ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-[20%] bg-black border-r border-gray-800 flex-col z-50">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="block">
            <Logo width="120px"/>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="flex items-center gap-4 w-full p-3 text-white hover:text-gray-300 hover:bg-gray-900 rounded-lg transition-colors duration-200 group"
                  >
                    {item.image && (
                      <div className="text-current transition-colors">
                        {item.image}
                      </div>
                    )}
                    <span className="font-medium text-base">{item.name}</span>
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </nav>

        {/* Logout Section */}
        {authStatus && (
          <div className="px-3 py-4 border-t border-gray-800">
            <Logoutbtn />
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <nav className="px-3 py-2">
          <ul className="flex justify-around items-center">
            {navItems.map((item) => 
              item.active && item.name !== "Profile" ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="flex flex-col items-center gap-1 p-2 text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    {item.image && (
                      <div className="text-current">
                        {item.image}
                      </div>
                    )}
                  </button>
                </li>
              ) : null
            )}
            {/* Profile and Logout for mobile */}
            {authStatus && (
              <>
                <li>
                  <button
                    onClick={() => navigate('/user')}
                    className="flex flex-col items-center gap-1 p-2 text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </button>
                </li>
                <li>
                  <div className="flex flex-col items-center gap-1 p-2">
                    <Logoutbtn />
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header