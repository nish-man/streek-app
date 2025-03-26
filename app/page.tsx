"use client"

import { useState } from "react"
import { Challenges } from "@/components/challenges"
import { Analytics } from "@/components/analytics"
import { Profile } from "@/components/profile"
import { BottomNav } from "@/components/bottom-nav"
import { Rewards } from "@/components/rewards"
import { Community } from "@/components/community"
import { Welcome } from "@/components/welcome"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const [activeTab, setActiveTab] = useState("challenges")
  const { isAuthenticated, isLoading, login } = useAuth()
  const { toast } = useToast()

  // Handle successful login
  const handleLogin = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      login(data.token, data.user)

      // Show welcome notification
      toast({
        title: "Welcome to Streek!",
        description: "Start tracking your fitness journey today.",
        duration: 5000,
      })

      // Mock push notification permission request
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setTimeout(() => {
              toast({
                title: "Push Notifications Enabled",
                description: "You'll receive daily reminders for your activities.",
                duration: 5000,
              })
            }, 2000)
          }
        })
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Welcome onLogin={handleLogin} />
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex-1 container max-w-md mx-auto px-4 pb-20 pt-4">
        {activeTab === "challenges" && <Challenges />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "rewards" && <Rewards />}
        {activeTab === "community" && <Community />}
        {activeTab === "profile" && <Profile />}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  )
}

