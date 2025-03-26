"use client"

import { useState, useEffect } from "react"
import { 
  Trophy, 
  Gift, 
  Lock, 
  Sparkles, 
  HelpCircle, 
  CheckCircle,
  BarChart2, 
  Moon, 
  Headphones as HeadphonesIcon
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

export function Rewards() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [totalPoints, setTotalPoints] = useState(320)
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false)
  const [infoDialogOpen, setInfoDialogOpen] = useState(false)
  const [darkModeUnlocked, setDarkModeUnlocked] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Check if dark mode was previously unlocked
    const darkUnlocked = localStorage.getItem("darkmode-unlocked") === "true"
    setDarkModeUnlocked(darkUnlocked)
  }, [])

  const premiumFeatures = [
    {
      id: 1,
      name: "Custom Challenge Templates",
      description: "Create your own challenge templates",
      pointsRequired: 200,
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
      isAvailable: true,
    },
    {
      id: 2,
      name: "Advanced Analytics",
      description: "Unlock detailed activity insights",
      pointsRequired: 350,
      icon: <BarChart2 className="h-5 w-5 text-blue-500" />,
      isAvailable: false,
    },
    {
      id: 3,
      name: "Priority Support",
      description: "Get faster support from our team",
      pointsRequired: 500,
      icon: <HeadphonesIcon className="h-5 w-5 text-green-500" />,
      isAvailable: false,
    },
    {
      id: 4,
      name: "Dark Theme",
      description: "Unlock the dark theme for the app",
      pointsRequired: 150,
      icon: <Moon className="h-5 w-5 text-purple-500" />,
      isAvailable: !darkModeUnlocked,
      isUnlocked: darkModeUnlocked,
    },
  ]

  const handleRewardSelect = (reward: any) => {
    setSelectedReward(reward)
    setRewardDialogOpen(true)
  }

  const handleUnlockReward = () => {
    if (selectedReward && selectedReward.pointsRequired <= totalPoints) {
      setTotalPoints(totalPoints - selectedReward.pointsRequired)
      
      // Handle dark theme unlock
      if (selectedReward.id === 4) {
        setDarkModeUnlocked(true)
        localStorage.setItem("darkmode-unlocked", "true")
        setTheme("dark")
        toast({
          title: "Dark Mode Unlocked!",
          description: "You can now switch between light and dark themes in your profile settings.",
          duration: 5000,
        })
      } else {
        toast({
          title: `${selectedReward.name} Unlocked!`,
          description: "You've successfully unlocked this premium feature.",
          duration: 5000,
        })
      }
    }
    setRewardDialogOpen(false)
  }

  // Don't render until client-side to avoid hydration mismatch
  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="border-b pb-3 mb-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Rewards</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setInfoDialogOpen(true)}
                >
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>How points are calculated</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-muted-foreground text-sm">Earn points and unlock premium features</p>
      </div>

      <Card className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-xl overflow-hidden border-none">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 left-0 h-1/2 bg-white/5 backdrop-blur-sm" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute right-10 bottom-2 w-16 h-16 bg-white/10 rounded-full" />
            <div className="absolute left-10 top-10 w-8 h-8 bg-white/10 rounded-full" />
          </div>
          
          <div className="relative flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-1">You have</h2>
              <div className="text-4xl font-bold flex items-center">
                {totalPoints} <Trophy className="ml-2 h-6 w-6 text-yellow-200" />
              </div>
              <p className="text-white/80 mt-1">Fitness Points</p>
            </div>
            <div className="bg-white/20 p-4 rounded-full">
              <Gift className="h-12 w-12 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Premium Features</h2>
          <Badge variant="outline" className="bg-primary/10">
            <Sparkles className="h-3 w-3 mr-1 text-primary" />4 Available
          </Badge>
        </div>

        {premiumFeatures.map((feature) => (
          <Card
            key={feature.id}
            className={`cursor-pointer hover:shadow-md transition-all ${
              feature.pointsRequired <= totalPoints ? "border-green-200 dark:border-green-800" : ""
            } ${feature.isUnlocked ? "bg-primary/5" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-background">{feature.icon}</div>
                  <div>
                    <h3 className="font-medium">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>

                {feature.isUnlocked ? (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
                    Unlocked
                  </Badge>
                ) : feature.pointsRequired <= totalPoints ? (
                  <Button size="sm" className="shrink-0" onClick={() => handleRewardSelect(feature)}>
                    Unlock
                  </Button>
                ) : (
                  <div className="text-right shrink-0">
                    <div className="flex items-center text-muted-foreground">
                      <Lock className="h-3 w-3 mr-1" />
                      <span className="text-sm">{feature.pointsRequired - totalPoints} more</span>
                    </div>
                    <Progress value={(totalPoints / feature.pointsRequired) * 100} className="h-1.5 w-20 mt-1" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={rewardDialogOpen} onOpenChange={setRewardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedReward?.name}</DialogTitle>
            <DialogDescription>
              {selectedReward?.pointsRequired <= totalPoints
                ? "Confirm that you want to unlock this reward"
                : "You don't have enough points yet"}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center py-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              {selectedReward?.icon}
            </div>
          </div>

          <div className="text-center">
            <p className="mb-2">{selectedReward?.description}</p>
            <div className="flex items-center justify-center text-sm font-medium">
              <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
              <span>{selectedReward?.pointsRequired} points required</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRewardDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={selectedReward?.pointsRequired > totalPoints}
              onClick={handleUnlockReward}
            >
              {selectedReward?.pointsRequired <= totalPoints ? "Confirm" : "Not Enough Points"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How Points Are Calculated</DialogTitle>
            <DialogDescription>
              Points are earned through various activities and achievements in the app
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Daily Streaks</h3>
                <p className="text-sm text-muted-foreground">10 points per day of maintained streak</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Completed Challenges</h3>
                <p className="text-sm text-muted-foreground">25-50 points depending on challenge difficulty</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Community Engagement</h3>
                <p className="text-sm text-muted-foreground">5 points for sharing achievements</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Weekly Goals</h3>
                <p className="text-sm text-muted-foreground">20 points for completing all weekly goals</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setInfoDialogOpen(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

