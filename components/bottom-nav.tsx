"use client"

import { Home, BarChart2, Trophy, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50 shadow-lg">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab("challenges")}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              activeTab === "challenges" ? "text-primary font-medium" : "text-muted-foreground",
            )}
          >
            <Home className={cn("h-5 w-5", activeTab === "challenges" && "fill-primary")} />
            <span className="text-xs mt-1">Challenges</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              activeTab === "analytics" ? "text-primary font-medium" : "text-muted-foreground",
            )}
          >
            <BarChart2 className={cn("h-5 w-5", activeTab === "analytics" && "fill-primary text-primary")} />
            <span className="text-xs mt-1">Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              activeTab === "rewards" ? "text-primary font-medium" : "text-muted-foreground",
            )}
          >
            <Trophy className={cn("h-5 w-5", activeTab === "rewards" && "fill-primary text-primary")} />
            <span className="text-xs mt-1">Rewards</span>
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              activeTab === "community" ? "text-primary font-medium" : "text-muted-foreground",
            )}
          >
            <Users className={cn("h-5 w-5", activeTab === "community" && "fill-primary text-primary")} />
            <span className="text-xs mt-1">Community</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              activeTab === "profile" ? "text-primary font-medium" : "text-muted-foreground",
            )}
          >
            <User className={cn("h-5 w-5", activeTab === "profile" && "fill-primary text-primary")} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

