import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import {Input} from '../components'
import { login } from '../store/authSlice'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        setLoading(true)
        try {
            // Create the account first
            const newAccount = await authService.createNewAccount(data)
            
            if(newAccount) {
                // Get the current user data after account creation
                const userData = await authService.getCurrentUser()
                
                if (userData) {
                    // Dispatch login action with correct payload structure
                    dispatch(login(userData)) // Remove the extra object wrapping
                    
                    // Navigate to home page
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
            console.error('Signup error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Instagram Logo */}
                <div className="flex justify-center mb-8">
                    <svg className="w-44 h-12 text-white" viewBox="32 4 113 32" fill="currentColor">
                        <path clipRule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Z" fillRule="evenodd"></path>
                    </svg>
                </div>

                <div className="bg-gray-900 py-8 px-6 shadow-lg border border-gray-800 sm:rounded-lg sm:px-10">
                    <div className="text-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-300 mb-4">
                            Sign up to see photos and videos from your friends.
                        </h2>
                        
                        <button className="w-full flex justify-center items-center space-x-2 py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span>Log in with Facebook</span>
                        </button>

                        <div className="my-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-700" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-900 text-gray-400">OR</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-md">
                            <p className="text-red-300 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(create)} className="space-y-4">
                        <div>
                            <Input
                                label=""
                                placeholder="Mobile Number or Email"
                                type="email"
                                className="w-full px-3 py-3 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-gray-500 focus:outline-none text-sm"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                    }
                                })}
                            />
                        </div>

                        <div>
                            <Input
                                label=""
                                placeholder="Full Name"
                                className="w-full px-3 py-3 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-gray-500 focus:outline-none text-sm"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                        </div>

                        <div>
                            <Input
                                label=""
                                placeholder="Username"
                                className="w-full px-3 py-3 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-gray-500 focus:outline-none text-sm"
                                {...register("username", {
                                    required: false,
                                })}
                            />
                        </div>

                        <div>
                            <Input
                                label=""
                                type="password"
                                placeholder="Password"
                                className="w-full px-3 py-3 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-gray-500 focus:outline-none text-sm"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </div>

                        <div className="text-center text-xs text-gray-400 py-4 leading-4">
                            People who use our service may have uploaded your contact information to Instagram. 
                            <a href="#" className="text-blue-400 hover:underline"> Learn More</a>
                        </div>

                        <div className="text-center text-xs text-gray-400 leading-4">
                            By signing up, you agree to our 
                            <a href="#" className="text-blue-400 hover:underline"> Terms</a>, 
                            <a href="#" className="text-blue-400 hover:underline"> Privacy Policy</a> and 
                            <a href="#" className="text-blue-400 hover:underline"> Cookies Policy</a>.
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-gray-900 border border-gray-800 py-4 px-6 shadow-lg mt-3 sm:rounded-lg sm:px-10 text-center">
                    <p className="text-sm text-gray-300">
                        Have an account?{' '}
                        <a href="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp