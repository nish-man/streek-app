"use client"

import { useState, useEffect } from "react"
import { Plus, Camera, CheckCircle, AlertCircle, Share2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { StreakCounter } from "@/components/streak-counter"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { ShareDialog } from "@/components/share-dialog"

interface Challenge {
  id: string
  name: string
  type: string
  frequency: string
  streak: number
  lastCompleted: Date | null
  proofRequired: boolean
  points: number
}

export function Challenges() {
  const { toast } = useToast()
  const [activeFilter, setActiveFilter] = useState("all")
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      name: "Morning Run",
      type: "running",
      frequency: "daily",
      streak: 5,
      lastCompleted: new Date(Date.now() - 86400000),
      proofRequired: true,
      points: 25,
    },
    {
      id: "2",
      name: "Gym Workout",
      type: "gym",
      frequency: "alternate",
      streak: 3,
      lastCompleted: new Date(),
      proofRequired: true,
      points: 15,
    },
    {
      id: "3",
      name: "Yoga Session",
      type: "yoga",
      frequency: "weekly",
      streak: 8,
      lastCompleted: new Date(Date.now() - 86400000 * 2),
      proofRequired: true,
      points: 20,
    },
    {
      id: "4",
      name: "Evening Ride",
      type: "cycling",
      frequency: "daily",
      streak: 12,
      lastCompleted: new Date(Date.now() - 86400000 * 1),
      proofRequired: true,
      points: 20,
    },
    {
      id: "5",
      name: "Swimming",
      type: "other",
      frequency: "weekly",
      streak: 4,
      lastCompleted: new Date(Date.now() - 86400000 * 3),
      proofRequired: false,
      points: 30,
    },
  ])

  // Filter challenges based on the selected type
  const filteredChallenges = challenges.filter(
    (challenge) => activeFilter === "all" || challenge.type === activeFilter
  )

  const [addActivityOpen, setAddActivityOpen] = useState(false)
  const [markDoneOpen, setMarkDoneOpen] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [newActivity, setNewActivity] = useState({
    name: "",
    type: "running",
    frequency: "daily",
    proofRequired: true,
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [today] = useState(new Date())
  const [currentDate, setCurrentDate] = useState("")

  // Format date as "Monday, March 25, 2024"
  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    setCurrentDate(today.toLocaleDateString("en-US", options))
  }, [today])

  const handleAddActivity = () => {
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      name: newActivity.name,
      type: newActivity.type,
      frequency: newActivity.frequency,
      streak: 0,
      lastCompleted: null,
      proofRequired: newActivity.proofRequired,
      points: Math.floor(Math.random() * 10) + 10, // Random points between 10-20
    }

    setChallenges([...challenges, newChallenge])
    setAddActivityOpen(false)
    setNewActivity({
      name: "",
      type: "running",
      frequency: "daily",
      proofRequired: true,
    })

    toast({
      title: "Activity Added!",
      description: `${newActivity.name} has been added to your challenges.`,
      variant: "default",
      duration: 3000,
    })
  }

  const handleMarkDone = (satisfied: boolean) => {
    if (!selectedChallenge) return

    // Check if already completed today
    if (selectedChallenge.lastCompleted) {
      const lastCompletedDate = new Date(selectedChallenge.lastCompleted)
      const isToday = lastCompletedDate.toDateString() === today.toDateString()

      if (isToday) {
        toast({
          title: "Already Completed",
          description: "You've already completed this challenge today!",
          variant: "destructive",
          duration: 3000,
        })
        setMarkDoneOpen(false)
        setSelectedChallenge(null)
        return
      }
    }

    if (satisfied) {
      setChallenges(
        challenges.map((challenge) =>
          challenge.id === selectedChallenge.id
            ? {
                ...challenge,
                streak: challenge.streak + 1,
                lastCompleted: new Date(),
              }
            : challenge,
        ),
      )
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

      // Show completion notification with points
      toast({
        title: "Challenge Completed! 🎉",
        description: `You earned ${selectedChallenge.points} points for completing ${selectedChallenge.name}!`,
        variant: "default",
        duration: 5000,
      })

      // If reaching a milestone, show special notification
      if ((selectedChallenge.streak + 1) % 7 === 0) {
        setTimeout(() => {
          toast({
            title: "Milestone Reached! 🏆",
            description: `Incredible! You've maintained a ${selectedChallenge.streak + 1}-day streak for ${selectedChallenge.name}!`,
            variant: "default",
            duration: 5000,
          })
        }, 1000)
      }
    }

    setMarkDoneOpen(false)
    setSelectedChallenge(null)
  }

  const openShareDialog = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
    setShareDialogOpen(true)
  }

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "running":
        return "bg-blue-500"
      case "gym":
        return "bg-green-500"
      case "yoga":
        return "bg-purple-500"
      case "cycling":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  const getActivityTypeBorderColor = (type: string) => {
    switch (type) {
      case "running":
        return "border-l-blue-500"
      case "gym":
        return "border-l-green-500"
      case "yoga":
        return "border-l-purple-500"
      case "cycling":
        return "border-l-amber-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getCompletedBgColor = (type: string) => {
    switch (type) {
      case "running":
        return "bg-blue-50/50 dark:bg-blue-900/20"
      case "gym":
        return "bg-green-50/50 dark:bg-green-900/20"
      case "yoga":
        return "bg-purple-50/50 dark:bg-purple-900/20"
      case "cycling":
        return "bg-amber-50/50 dark:bg-amber-900/20"
      default:
        return "bg-gray-50/50 dark:bg-gray-900/20"
    }
  }

  const getCompletedBorderColor = (type: string) => {
    switch (type) {
      case "running":
        return "border-l-blue-500 dark:border-l-blue-400"
      case "gym":
        return "border-l-green-500 dark:border-l-green-400"
      case "yoga":
        return "border-l-purple-500 dark:border-l-purple-400"
      case "cycling":
        return "border-l-amber-500 dark:border-l-amber-400"
      default:
        return "border-l-gray-500 dark:border-l-gray-400"
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "running":
        return "bg-blue-500 dark:bg-blue-600"
      case "gym":
        return "bg-green-500 dark:bg-green-600"
      case "yoga":
        return "bg-purple-500 dark:bg-purple-600"
      case "cycling":
        return "bg-amber-500 dark:bg-amber-600"
      default:
        return "bg-gray-500 dark:bg-gray-600"
    }
  }

  const getButtonCompletedStyle = (type: string) => {
    switch (type) {
      case "running":
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700"
      case "gym":
        return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700"
      case "yoga":
        return "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700"
      case "cycling":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-700"
    }
  }

  const isCompletedToday = (challenge: Challenge) => {
    if (!challenge.lastCompleted) return false
    const lastCompleted = new Date(challenge.lastCompleted)
    return lastCompleted.toDateString() === today.toDateString()
  }

  return (
    <div className="space-y-4">
      <div className="border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Your Challenges</h1>
        <p className="text-muted-foreground">{currentDate}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="inline-flex flex-wrap gap-2 w-full max-w-[70%]">
          <Badge 
            variant={activeFilter === "all" ? "default" : "outline"} 
            className={`cursor-pointer rounded-full px-4 py-1.5 ${
              activeFilter === "all" 
                ? "bg-primary text-primary-foreground"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </Badge>
          <Badge 
            variant={activeFilter === "running" ? "default" : "outline"} 
            className={`cursor-pointer rounded-full px-4 py-1.5 ${
              activeFilter === "running" 
                ? "bg-blue-500 text-white"
                : "bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
            }`}
            onClick={() => setActiveFilter("running")}
          >
            Running
          </Badge>
          <Badge 
            variant={activeFilter === "gym" ? "default" : "outline"} 
            className={`cursor-pointer rounded-full px-4 py-1.5 ${
              activeFilter === "gym" 
                ? "bg-green-500 text-white"
                : "bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
            }`}
            onClick={() => setActiveFilter("gym")}
          >
            Gym
          </Badge>
          <Badge 
            variant={activeFilter === "yoga" ? "default" : "outline"} 
            className={`cursor-pointer rounded-full px-4 py-1.5 ${
              activeFilter === "yoga" 
                ? "bg-purple-500 text-white"
                : "bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
            }`}
            onClick={() => setActiveFilter("yoga")}
          >
            Yoga
          </Badge>
          <Badge 
            variant={activeFilter === "cycling" ? "default" : "outline"} 
            className={`cursor-pointer rounded-full px-4 py-1.5 ${
              activeFilter === "cycling" 
                ? "bg-amber-500 text-white"
                : "bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
            }`}
            onClick={() => setActiveFilter("cycling")}
          >
            Cycling
          </Badge>
          <Badge 
            variant={activeFilter === "other" ? "default" : "outline"} 
            className={`cursor-pointer rounded-full px-4 py-1.5 ${
              activeFilter === "other" 
                ? "bg-rose-500 text-white"
                : "bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
            }`}
            onClick={() => setActiveFilter("other")}
          >
            Other
          </Badge>
        </div>

        <Dialog open={addActivityOpen} onOpenChange={setAddActivityOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-primary hover:bg-primary-dark flex items-center gap-2 rounded-full h-10">
              <Plus className="h-5 w-5" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
              <DialogDescription>Create a new activity to track and build your streak.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Activity Name</Label>
                <Input
                  id="name"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                  placeholder="e.g., Morning Run"
                />
              </div>
              <div className="grid gap-2">
                <Label>Activity Type</Label>
                <Select
                  value={newActivity.type}
                  onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="gym">Gym</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="cycling">Cycling</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Frequency</Label>
                <Select
                  value={newActivity.frequency}
                  onValueChange={(value) => setNewActivity({ ...newActivity, frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="alternate">Alternate Days</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Proof Required</Label>
                <RadioGroup
                  defaultValue="yes"
                  onValueChange={(value) => setNewActivity({ ...newActivity, proofRequired: value === "yes" })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="proof-yes" />
                    <Label htmlFor="proof-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="proof-no" />
                    <Label htmlFor="proof-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddActivityOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddActivity}
                disabled={!newActivity.name}
                className="bg-primary hover:bg-primary-dark"
              >
                Add Activity
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {showSuccess && (
        <Alert className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 shadow-sm dark:bg-gradient-to-r dark:from-primary-900/20 dark:to-primary-800/20 dark:border-primary-800">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary-foreground">Success!</AlertTitle>
          <AlertDescription className="text-primary-foreground/90">Great job! Your streak has been updated.</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <Card
              key={challenge.id}
              className={`border-l-4 ${
                isCompletedToday(challenge) 
                  ? getCompletedBorderColor(challenge.type) + " " + getCompletedBgColor(challenge.type)
                  : getActivityTypeBorderColor(challenge.type)
              } transition-all hover:shadow-md`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between">
                  <span className="flex items-center">
                    {challenge.name}
                    {isCompletedToday(challenge) && (
                      <Badge variant="default" className={`ml-2 ${getBadgeColor(challenge.type)} text-white`}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Done
                      </Badge>
                    )}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {challenge.frequency === "daily"
                      ? "Daily"
                      : challenge.frequency === "alternate"
                        ? "Alternate Days"
                        : "Weekly"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${getActivityTypeColor(challenge.type)}`} />
                      <span className="capitalize">{challenge.type}</span>
                      <span className="ml-4 text-xs flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {challenge.lastCompleted
                          ? isCompletedToday(challenge)
                            ? "Today"
                            : new Date(challenge.lastCompleted).toLocaleDateString()
                          : "Not started"}
                      </span>
                    </p>
                    <div className="mt-2 mb-1">
                      <StreakCounter streak={challenge.streak} activityType={challenge.type} />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openShareDialog(challenge)} className="h-8 w-8">
                      <Share2 className="h-4 w-4 text-primary" />
                    </Button>

                    <Dialog
                      open={markDoneOpen && selectedChallenge?.id === challenge.id}
                      onOpenChange={(open) => {
                        setMarkDoneOpen(open)
                        if (!open) setSelectedChallenge(null)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant={isCompletedToday(challenge) ? "outline" : "default"}
                          onClick={() => setSelectedChallenge(challenge)}
                          disabled={isCompletedToday(challenge)}
                          className={
                            isCompletedToday(challenge)
                              ? getButtonCompletedStyle(challenge.type)
                              : "bg-primary hover:bg-primary-dark"
                          }
                        >
                          {isCompletedToday(challenge) ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Completed
                            </>
                          ) : (
                            "Mark as Done"
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Complete {challenge.name}</DialogTitle>
                          <DialogDescription>Upload proof of your activity to mark it as complete.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {challenge.proofRequired && (
                            <div className="grid gap-2">
                              <Label>Upload Proof</Label>
                              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Click to upload a photo or video</p>
                                <Input type="file" className="hidden" accept="image/*,video/*" id="proof-upload" />
                                <Label htmlFor="proof-upload">
                                  <Button variant="outline" className="mt-4" type="button">
                                    Upload
                                  </Button>
                                </Label>
                              </div>
                              <div className="text-xs text-muted-foreground text-center">
                                Earn {challenge.points} points for completing this activity!
                              </div>
                            </div>
                          )}
                          <div className="text-center pt-4">
                            <p className="font-medium">Are you satisfied with today's session?</p>
                          </div>
                        </div>
                        <DialogFooter className="flex-col sm:flex-row gap-2">
                          <Button variant="outline" onClick={() => handleMarkDone(false)}>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            No, Skip
                          </Button>
                          <Button onClick={() => handleMarkDone(true)} className="bg-primary hover:bg-primary-dark">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Yes, Complete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                {challenge.streak >= 7 && (
                  <p className="text-sm text-primary font-medium flex items-center">
                    <span className="mr-2">🔥</span>
                    Amazing! You've maintained this streak for {challenge.streak} days!
                  </p>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No challenges found</h3>
            <p className="text-muted-foreground mb-4">You don't have any {activeFilter} challenges yet.</p>
            <Button size="sm" onClick={() => setAddActivityOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add {activeFilter !== "all" ? activeFilter : ""} challenge
            </Button>
          </div>
        )}
      </div>

      <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} challenge={selectedChallenge} />
    </div>
  )
}

