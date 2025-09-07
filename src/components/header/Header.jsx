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
          image:<svg aria-label="Home" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path></svg>,
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      {
        name: "User",
        slug: `/user/{${userData ? userData.$id : null}}`,
        active: authStatus
      }
      ]
      


  return (
    <header className='bg-black p-5 w-[25%] shadow text-white font-bold'>
            <nav className='flex flex- gap-4'>
           <div className='flex items-center justify-center flex-col w-full'>
                <div className='w-full pt-4 pb-4 '>
                    <Link to="">
                        <Logo width="80px"/>
                     </Link>
                </div>
                <ul className='flex flex-col  w-full'>
                    {navItems.map((item)=> 
                    item.active ? (
                        <li key={item.name}>
                            <button
                            onClick={()=>navigate(item.slug)}
                            className=' flex w-full mt-1 mb-1 items-center gap-2  p-3 w- duration-200 hover:bg-blue-100 rounded-xl'>
                                {item.image}{item.name}</button>

                        </li>
                    ) : null
                    )}
                    {authStatus && (
                        <li className=' flex  mt-1 mb-1  gap-2  p-3 w- duration-200 hover:bg-blue-100 rounded-full'> 
                            <Logoutbtn/>
                        </li>
                    )}
                </ul>
            </div>
            </nav>
    </header>
  )
}

export default Header