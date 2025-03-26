"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Challenges } from "@/components/challenges"
import { Analytics } from "@/components/analytics"
import { Profile } from "@/components/profile"
import { BottomNav } from "@/components/bottom-nav"
import { Rewards } from "@/components/rewards"
import { Community } from "@/components/community"
import { Welcome } from "@/components/welcome"

export default function Home() {
  const [activeTab, setActiveTab] = useState("challenges")
  const { data: session, status } = useSession({
    required: false,
  })

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!session) {
    return <Welcome />
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

