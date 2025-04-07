"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const { isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-foreground">Welcome, you're logged in.</h1>
        <p className="text-center text-muted-foreground">You have successfully authenticated with Room.me.</p>
        <Button onClick={handleLogout} className="w-full bg-purple-600 hover:bg-purple-700">
          Logout
        </Button>
      </div>
    </div>
  )
}

