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
            <svg aria-label="Home" className="w-6 h-6" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
              <title>Home</title>
              <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
            </svg>
          ),
          active: true
        }, 
        // {
        //   name: "Search",
        //   slug: "/search",
        //   image: (
        //     <svg aria-label="Search" className="w-6 h-6" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        //       <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        //       <path d="m21 21-4.3-4.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        //     </svg>
        //   ),
        //   active: authStatus,
        // },
        // {
        //   name: "Explore",
        //   slug: "/explore",
        //   image: (
        //     <svg aria-label="Explore" className="w-6 h-6" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        //       <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
        //       <polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
        //     </svg>
        //   ),
        //   active: authStatus,
        // },
        // {
        //   name: "Reels",
        //   slug: "/reels",
        //   image: (
        //     <svg aria-label="Reels" className="w-6 h-6" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        //       <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line>
        //       <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line>
        //       <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line>
        //       <path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        //       <path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91-.001Z" fillRule="evenodd"></path>
        //     </svg>
        //   ),
        //   active: authStatus,
        // },
        // {
        //   name: "Messages",
        //   slug: "/messages",
        //   image: (
        //     <svg aria-label="Messages" className="w-6 h-6" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        //       <path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path>
        //       <path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path>
        //     </svg>
        //   ),
        //   active: authStatus,
        // },
        // {
        //   name: "Notifications",
        //   slug: "/notifications",
        //   image: (
        //     <svg aria-label="Notifications" className="w-6 h-6" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        //       <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
        //     </svg>
        //   ),
        //   active: authStatus,
        // },
        {
          name: "Create",
          slug: "/add-post",
          image: (
            <svg aria-label="New post" className="w-6 h-6" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
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
          image: null,
          active: !authStatus,
        },
        {
          name: "Signup",
          slug: "/signup", 
          image: null,
          active: !authStatus,
        },
        {
          name: "All Posts",
          slug: "/all-posts",
          image: (
            <svg aria-label="Profile" className="w-6 h-6" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
              <circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle>
              <path d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></path>
              <circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle>
            </svg>
          ),
          active: authStatus,
        },
        // {
        //   name: "Profile",
        //   slug: `/user/${userData ? userData.$id : ''}`,
        //   image: (
        //     <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
        //       <span className="text-white text-xs font-bold">
        //         {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
        //       </span>
        //     </div>
        //   ),
        //   active: authStatus
        // }
      ]

  return (
    <div className="md:fixed flex flex-row md:flex-col items-center bottom-0 w-full fixed   md:left-0 md:top-0 md:h-full md:w-60 bg-white border-r border-gray-200 z-200">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100  md:visible">
        <Link to="/" className="block">
          <Logo width="120px"/>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex px-3 py-4 w-full items-center">
        <ul className="space-y-1 w-full flex flex-row gap-4 md:flex-col">
          {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="flex items-center gap-4 w-full p-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                >
                  {item.image && (
                    <div className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item.image}
                    </div>
                  )}
                  <span className="font-medium text-base hidden md:block">{item.name}</span>
                </button>
              </li>
            ) : null
          )}
        </ul>
      </nav>

      {/* More Menu & Logout */}
      <div className="px-3 py-4 border-t  border-gray-100">
        <div className="space-y-1 flex flex-row items-center ">
          
          {authStatus && (
            <div className="">
              <Logoutbtn />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header