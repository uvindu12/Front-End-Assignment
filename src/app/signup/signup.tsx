// app/signup/page.tsx
"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

interface AuthStore {
  signup: (name: string, email: string, password: string) => void;
  isAuthenticated: boolean;
}

const useAuthStore = (): AuthStore => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signup = (name: string, email: string, password: string) => {
    // Simulate signup logic
    setIsAuthenticated(true);
    localStorage.setItem('email', email);
  };
  return { signup, isAuthenticated };
};

export default function SignUpPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const { signup, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form fields
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }

    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      try {
        signup(name, email, password);
        router.push("/dashboard");
      } catch (err) {
        setError("An error occurred during signup. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen bg-black font-poppins">
      {/* Left Column - Sign Up Form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-8 lg:p-12 bg-black rounded-l-3xl">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-600">
                <img src="/images/door.png" alt="Room.me Logo" className="max-w-6" />
              </div>
              <span className="text-xl font-semibold text-white">ROOM.ME</span>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="mb-2 text-4xl font-bold text-white">Join Room.me Today!</h1>
            <p className="text-gray-400 text-sm font-light">
              Room.me is an innovative video conference product that revolutionizes virtual meetings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                role="alert"
                className="rounded-xl bg-red-500/10 p-3 text-sm text-red-500"
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 bg-gray-800 border-gray-700 pr-10 text-white placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500"
                />
                <Button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent hover:bg-transparent"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="h-12 bg-gray-800 border-gray-700 pr-10 text-white placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500"
                />
                <Button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent hover:bg-transparent"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full bg-purple-600 text-white hover:bg-purple-700 font-medium"
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>

            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 border-gray-600 bg-white text-black hover:bg-gray-100 font-medium"
            >
              <img src="/images/google.png" alt="Google Logo" className="max-w-5" />
              Sign up with Google
            </Button>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  className="border-gray-600 data-[state=checked]:bg-purple-600"
                />
                <label
                  htmlFor="terms"
                  className="text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-light"
                >
                  I accept the{" "}
                  <Link href="/terms" className="text-purple-500 hover:text-purple-400">
                    terms and conditions
                  </Link>
                </label>
              </div>
            </div>

            <div className="text-center text-sm text-gray-400 font-light">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-500 hover:text-purple-400 font-light">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Image and Testimonial */}
      <div className="hidden lg:flex w-1/2 bg-black rounded-r-3xl">
        <div className="flex flex-col justify-center w-full px-8">
          <div className="relative h-screen flex items-center">
            <img
              src="/images/team-collaboration.jpg"
              alt="Team Collaboration"
              className="rounded-3xl h-[80%] w-full object-cover shadow-2xl shadow-black"
            />
            <div className="absolute bg-black/30 p-6 rounded-2xl w-[80%] bottom-12 left-1/2 -translate-x-1/2">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                <blockquote className="text-lg text-white leading-relaxed font-light">
                  "We love the screen sharing and whiteboarding features, which have improved our presentations. Room.me has become an essential tool for our team, allowing us to collaborate effectively. Highly recommended!"
                  <div className="mt-4">
                    <footer className="text-white text-base font-light">
                      Sarah Markivoc - Project Manager
                    </footer>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}