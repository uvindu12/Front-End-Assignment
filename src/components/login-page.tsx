"use client"


import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import Link from 'next/link'


interface AuthStore {
    login: (email: string, rememberMe: boolean) => void;
    isAuthenticated: boolean;
  }
  
  const useAuthStore = (): AuthStore => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = (email: string, rememberMe: boolean) => {
      // Simulate login logic
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem('email', email);
      }
    };
    return { login, isAuthenticated };
  };


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
    <div className= "flex justify-center h-full bg-white  items-center p-1">
        <div className = "flex  justify-center p-2 bg-black rounded-3xl">
            <div className = "flex flex-col justify-center p-8  bg-black rounded-l-3xl">
                <div className ="mb-8">
                    <div className ="flex items-center gap-2">
                        <div className ="flex h-10 w-10 items-center rounded-md bg-purple-600">
                            <img src="/images/door.png" alt="" className="max-w-6 ml-2 "/>
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
                    {error && <div className ="rounded-xl bg-red-500/10 p-3 text-sm text-red-500 ">{error}</div>}

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

                    <Button type="submit" disabled={loading} className= "h-12 w-full bg-purple-600 text-white hover:bg-purple-300 hover:text-purple-900">
                        {loading ? " Signing in ..." : "Sign in"}
                    </Button>

                    <Button 
                        variant = "outline"
                        className = "flex h-12 w-full items-center justify-center gap-2 border-gray-700 bg-transparent text-white hover:bg-purple-300">
                            <img src="images/google.png" alt=""  className="max-w-5 mr-2"/>
                            Sign in with Google
                    </Button>

                    <div className =" flex items-center justify-between">
                        <div className =" flex items-center space-x-2">
                            <Checkbox 
                                id="remember"
                                checked = {rememberMe}
                                onCheckedChange = {(checked) => setRememberMe (checked === true)}
                                className = "border-gray-600 data-[state = checked] : bg:purple-600"/>

                                <label 
                                    htmlFor = "remember"
                                    className = "text-sm font-medium leading-none text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Remember for 30 days
                                </label>
                        </div>
                        <Link href ="#" className ="text-sm text-purple-500 hover:text-purple-400">
                            Forgot password
                        </Link>
                    </div>

                    <div className =" text-center text-sm text-gray-400">
                        Doesn't have account? {" "}
                        <Link href="#" className =" text-purple-500 hover:text-purple-400 ">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
            <div className="flex flex-col justify-center bg-black rounded-r-3xl h-170 items-center mt-0 ">
                <div className="flex flex-col justify-center px-2 text-white">
                    <div className="flex flex-col justify-center px-2 py-10 h-screen relative">
                        <img
                        src="/images/Image.jpg"
                        alt="Login"
                        className="rounded-3xl h-160 shadow-2xl shadow-black"
                        />
                        <div className = " absolute bg-black/40 p-15 rounded-3xl justify-center items-center w-120 h-170">
                            <div className =" absolute bg-white/15 p-15 rounded-2xl justify-center items-center bottom-7 w-110 h-50 left-3 backdrop-blur-sm">
                                <blockquote className="text-xl font-small text-white absolute  top-3 left-3">
                                    "We love the screen sharing and whiteboarding features, which have improved our presentations. Room.me has
                                    become an essential tool for our team, allowing us to collaborate effectively. Highly recommended!"
                                    <div className ="mt-2 flex items-center space-x-2">
                                        <footer className="text-white font-light">Sarah Markivoc - Project Manager</footer>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
  )
}


