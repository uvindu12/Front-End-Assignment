"use client"

import { useAuthStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage()  {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const { login, isAuthenticated} = useAuthStore()
    const router = useRouter()

    useEffect (() => {
        if (isAuthenticated) {
            router.push ("/dashboard")
        }
    }, [isAuthenticated, router])

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Validate email and password
        if (email || !password) {
            setError ("Please enter a valid email and password")
            return
        }
        
        if (!validateEmail(email)) {
            setError ("Please enter a valid email address")
            return
        }
        if (password.length < 6) {
            setError ("Password must be at least 6 characters long")
            return
        }
        setLoading(true)

        // Simulate an API call
        
        setTimeout(() => {
            if (email === "test@visionexdigital.com.au" && password === "password123") {
                login(email, rememberMe)
                router.push("/dashboard")
            }
            else {
                setError ("Invalid email address or password")
            }
            setLoading(false)
        }, 1000)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

  return (
    <div className= "flex min-h-screen bg-black">
        <div className = "flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12">
            <div className ="mb-8">
                <div className ="flex items-center gap-2">
                    <div className ="flex h-10 w-10 items-center rounded-md bg-purple-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                            <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                            <path d="M3 9h4" />
                            <path d="M17 9h4" />
                            <path d="M13 13v4" />
                            <path d="M13 13h4" />
                            <path d="M13 17h4" />
                        </svg>
                    </div>
                    <span className ="text-xl font-bold text-white">ROOM.ME</span>
                </div>
            </div>

            <div className ="mb-8">
                <h1 className ="mb-2 text-4xl font-bold text-white">Welcome back to Room.me!</h1>
                <p className =" text-gray-400">
                    Room.me is an innovative video conference product that revolutionizes virtual meetings.
                </p>
            </div>

            <form onSubmit={handleSubmit} className ="space-y-6">
                {error && <div className ="rounded-xl bg-red-500/10 p-3 text-sm text-red-500">{error}</div>}

                <div className ="space-y-2">
                    <label htmlFor="email" className ="block text-sm font-medium text-white">
                        Email address
                    </label>
                    <Input 
                        id ="email"
                        type =" email"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder = "Enter your email address"
                        className ="h-12 bg-gray-900 text-white placeholder:text-gray-500"/>
                </div>

                <div className=" space-y-2">
                    <label htmlFor ="password" className =" block text-sm font-medium text-white">Passowrd</label>
                    <div className ="relative">
                        <Input 
                            id= "password"
                            type={showPassword ? "text "  : "password"}
                            value = {password}
                            onChange= {(e) => setPassword(e . target.value)}
                            placeholder = "Enter Your Password"
                            className =" h-12 bg-gray-900 pr-10 text-white placeholder:text-gray-500"/>
                            <Button 
                                type ="button"
                                onClick= {togglePasswordVisibility}
                                className =" absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-gray-900">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20}/>}
                            </Button> 
                    </div>
                </div>

                <Button type="submit" disabled={loading} className= "h-12 w-full bg-purple-600 text-white hover:bg-purple-700">
                    {loading ? " Signing in ..." : "Sign in"}
                </Button>

                <Button 
                    type =" button"
                    variant = "outline"
                    className = "flex h-12 w-full items-center justify-center gap-2 border-gray-700 bg-transparent text-white hover:bg-gray-800">
                        <img src="images/google.png" alt=""  className="max-w-5 mr-2"/>
                        Sign in with Google
                </Button>

                
            </form>
        </div>
    </div>
  )
}


