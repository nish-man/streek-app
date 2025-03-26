"use client"

import { useState, useEffect } from "react"
import { Edit, Medal, Trophy, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

export function Profile() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  
  // Only show UI once mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Check if notifications were previously enabled
    const notificationsStatus = localStorage.getItem("notifications-enabled") === "true"
    setNotificationsEnabled(notificationsStatus)
  }, [])
  
  const [user, setUser] = useState({
    name: "Alex Johnson",
    username: "alexfitness",
    bio: "Fitness enthusiast. Working on becoming the best version of myself.",
    avatar: "/placeholder.svg?height=100&width=100",
    goal: "Train 5 days a week",
    totalStreaks: 42,
    longestStreak: 14,
    totalWorkouts: 87,
  })

  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleSaveProfile = () => {
    setUser(editedUser)
    setEditProfileOpen(false)
  }

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleNotifications = (enabled: boolean) => {
    setNotificationsEnabled(enabled)
    localStorage.setItem("notifications-enabled", enabled.toString())
    
    if (enabled) {
      // Request permission if not already granted
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            toast({
              title: "Notifications Enabled",
              description: "You'll receive reminders for your activities",
              duration: 3000,
            })
          } else {
            // If permission denied, revert the switch
            setNotificationsEnabled(false)
            localStorage.setItem("notifications-enabled", "false")
            toast({
              title: "Permission Denied",
              description: "Please enable notifications in your browser settings",
              variant: "destructive",
              duration: 3000,
            })
          }
        })
      }
    } else {
      toast({
        title: "Notifications Disabled",
        description: "You won't receive activity reminders anymore",
        duration: 3000,
      })
    }
  }

  // Don't render settings that depend on client-side features until mounted
  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="border-b pb-3 mb-2">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </div>
            <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>Update your profile information.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="mx-auto">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={editedUser.avatar} />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                      <Label htmlFor="avatar-upload" className="text-sm text-primary cursor-pointer">
                        Change Photo
                      </Label>
                      <Input id="avatar-upload" type="file" className="hidden" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editedUser.username}
                      onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editedUser.bio}
                      onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="goal">Fitness Goal</Label>
                    <Input
                      id="goal"
                      value={editedUser.goal}
                      onChange={(e) => setEditedUser({ ...editedUser, goal: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditProfileOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">{user.bio}</p>
              <p className="text-sm font-medium mt-2">Goal: {user.goal}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="p-4 pb-2 text-center">
            <CardTitle className="text-2xl font-bold">{user.totalStreaks}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-center">
            <p className="text-xs text-muted-foreground">Total Streaks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2 text-center">
            <CardTitle className="text-2xl font-bold">{user.longestStreak}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-center">
            <p className="text-xs text-muted-foreground">Longest Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2 text-center">
            <CardTitle className="text-2xl font-bold">{user.totalWorkouts}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-center">
            <p className="text-xs text-muted-foreground">Total Workouts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="achievements" className="mt-4 space-y-4">
          <h2 className="text-lg font-semibold">Your Achievements</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                <p className="font-medium text-center">7-Day Streak</p>
                <p className="text-xs text-muted-foreground text-center">Completed a 7-day streak</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Medal className="h-8 w-8 text-blue-500 mb-2" />
                <p className="font-medium text-center">Early Bird</p>
                <p className="text-xs text-muted-foreground text-center">Completed 5 morning workouts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Award className="h-8 w-8 text-green-500 mb-2" />
                <p className="font-medium text-center">Consistency King</p>
                <p className="text-xs text-muted-foreground text-center">Completed 30 workouts total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Trophy className="h-8 w-8 text-purple-500 mb-2" />
                <p className="font-medium text-center">Fitness Fanatic</p>
                <p className="text-xs text-muted-foreground text-center">Logged 10 different activities</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="mt-4 space-y-4">
          <h2 className="text-lg font-semibold">App Settings</h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Get reminders for your activities</p>
                </div>
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={toggleNotifications} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch checked={theme === "dark"} onCheckedChange={toggleDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Offline Mode</p>
                  <p className="text-sm text-muted-foreground">Log activities without internet</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Social Sharing</p>
                  <p className="text-sm text-muted-foreground">Share your achievements on social media</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

