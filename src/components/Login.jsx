import React from 'react'
import {useForm} from 'react-hook-form'
import {login as authLogin} from '../store/authSlice'
import { useDispatch } from 'react-redux'
import {Button, Input} from '../components'
import { useState } from 'react'
import authservice from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const dispatch = useDispatch()
  const { register, handleSubmit} = useForm()
  const [error, setError] = useState ("")
  const navigate = useNavigate()

  const login = async (data) => {
    console.log(data.email)
    setError("")
    try {
      const session = await authservice.login(data)
      console.log(session)
      if(session){
        const userData = await authservice.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/Home")
      }
    } catch (error) {
      setError(error.message)
    }
  }

 

    return (
      <>
        <div className="flex bg-black py-20  min-h-full flex-col justify-center px-6  lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="mx-auto h-10 w-auto"
            />

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(login)} method="POST" className="space-y-6">
              <div>
                
                <div className="mt-2">
                  <Input
                  label = "Email"
                  placeholder = "Enter your email"
                  type = "email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  {...register("email",{
                    required: true,
                    validate:{
                      matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                    }
                  })}
                  >
                   
                  </Input>
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <Input
                  label = "Password"
                  type = "password"
                  placeholder = "Enter your password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  {...register("password", {
                    required: true,
                })}
                  />
                 
                </div>
              </div>
  
              <div>
              <Button
                  type='submit'
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >Sign In
              </Button>
                
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-400">
              Not a member?{' '}
              <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  