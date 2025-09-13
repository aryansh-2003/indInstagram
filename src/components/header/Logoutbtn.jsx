import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function Logoutbtn() {
    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    
    return (
        <button
            onClick={logoutHandler}
            className="flex items-center gap-4 w-full p-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
        >
            <svg aria-label="Logout" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium text-base">Logout</span>
        </button>
    )
}

export default Logoutbtn