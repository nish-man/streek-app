"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Users, Heart, MessageCircle, Trophy, Calendar, Filter, Medal, Award, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function Community() {
  const { toast } = useToast()
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("week")
  const [showFilters, setShowFilters] = useState(false)
  const [joinedActivities, setJoinedActivities] = useState<number[]>([])

  const leaderboardUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarahfit",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 42,
      challengesCompleted: 87,
      rank: 1,
      badge: "Elite Athlete",
      badgeIcon: <Award className="h-4 w-4 text-yellow-500" />,
    },
    {
      id: 2,
      name: "Mike Thompson",
      username: "@mike_fitness",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 38,
      challengesCompleted: 72,
      rank: 2,
      badge: "Fitness Master",
      badgeIcon: <Medal className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      name: "Emily Wong",
      username: "@emily_w",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 35,
      challengesCompleted: 68,
      rank: 3,
      badge: "Consistent Runner",
      badgeIcon: <Trophy className="h-4 w-4 text-green-500" />,
    },
    {
      id: 4,
      name: "Alex Smith",
      username: "@alexsmith",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 32,
      challengesCompleted: 64,
      rank: 4,
      badge: "Gym Enthusiast",
      badgeIcon: <Medal className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 5,
      name: "Jessica Lee",
      username: "@jess_lee",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 29,
      challengesCompleted: 55,
      rank: 5,
      badge: "Yoga Pro",
      badgeIcon: <Award className="h-4 w-4 text-teal-500" />,
    },
  ]

  const posts = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        username: "@sarahfit",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      content: "Just completed my 42-day running streak! 🏃‍♀️ Feeling stronger every day! #RunningStreak #Fitness",
      activity: "Running Streak",
      type: "running",
      streakDays: 42,
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      user: {
        name: "Mike Thompson",
        username: "@mike_fitness",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      content: "Hit a new PR on the bench press today! 💪 Consistency is key! #GymLife #FitnessJourney",
      activity: "Gym Workout",
      type: "gym",
      streakDays: 38,
      timestamp: "5 hours ago",
      likes: 18,
      comments: 3,
      image: null,
    },
    {
      id: 3,
      user: {
        name: "Emily Wong",
        username: "@emily_w",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      content: "Morning yoga session completed! Starting the day with mindfulness and movement. #Yoga #MorningRoutine",
      activity: "Yoga Session",
      type: "yoga",
      streakDays: 35,
      timestamp: "8 hours ago",
      likes: 15,
      comments: 2,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 4,
      user: {
        name: "Alex Rodriguez",
        username: "@alexcycles",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      content: "Beautiful 20 mile ride through the mountains today! #CyclingLife #OutdoorFitness",
      activity: "Cycling",
      type: "cycling",
      streakDays: 25,
      timestamp: "12 hours ago",
      likes: 27,
      comments: 6,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 5,
      user: {
        name: "Jordan Smith",
        username: "@j_smith",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      content: "Tried rock climbing for the first time today! A completely different kind of workout! #NewExperiences",
      activity: "Rock Climbing",
      type: "other",
      streakDays: 15,
      timestamp: "1 day ago",
      likes: 32,
      comments: 8,
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  // Filter posts based on activeFilter and searchQuery
  const filteredPosts = posts.filter(post => {
    // Filter by activity type
    if (activeFilter !== "all" && post.type !== activeFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.content.toLowerCase().includes(query) ||
        post.user.name.toLowerCase().includes(query) ||
        post.user.username.toLowerCase().includes(query) ||
        post.activity.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const trendingActivities = [
    {
      id: 1,
      name: "10K Challenge",
      description: "342 people joined this week",
      icon: <TrendingUp className="h-4 w-4 text-blue-600" />,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 2,
      name: "30-Day Yoga",
      description: "287 people joined this week",
      icon: <TrendingUp className="h-4 w-4 text-green-600" />,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      id: 3,
      name: "Gym Consistency",
      description: "253 people joined this week",
      icon: <TrendingUp className="h-4 w-4 text-purple-600" />,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ]

  const handleJoinActivity = (activityId: number) => {
    if (joinedActivities.includes(activityId)) {
      setJoinedActivities(joinedActivities.filter(id => id !== activityId))
      toast({
        title: "Left activity",
        description: `You've left the ${trendingActivities.find(a => a.id === activityId)?.name}`,
        duration: 3000,
      })
    } else {
      setJoinedActivities([...joinedActivities, activityId])
      toast({
        title: "Joined activity",
        description: `You've joined the ${trendingActivities.find(a => a.id === activityId)?.name}`,
        duration: 3000,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Community</h1>
        <p className="text-muted-foreground">Connect with fitness friends</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <DropdownMenu open={showFilters} onOpenChange={setShowFilters}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveFilter("all")} className={activeFilter === "all" ? "bg-muted" : ""}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("running")} className={activeFilter === "running" ? "bg-muted" : ""}>
                Running
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("gym")} className={activeFilter === "gym" ? "bg-muted" : ""}>
                Gym
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("yoga")} className={activeFilter === "yoga" ? "bg-muted" : ""}>
                Yoga
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("cycling")} className={activeFilter === "cycling" ? "bg-muted" : ""}>
                Cycling
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("other")} className={activeFilter === "other" ? "bg-muted" : ""}>
                Other
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {activeFilter !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              {activeFilter}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setActiveFilter("all")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </Badge>
          )}
        </div>
      </div>

      <div className="relative">
        <Input 
          placeholder="Search community posts and users..." 
          className="pl-9" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {searchQuery && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6" 
            onClick={() => setSearchQuery("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Button>
        )}
      </div>

      <Tabs defaultValue="feed">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-4 space-y-4">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-muted stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-medium">No posts found</h3>
                <p className="mt-1">Try adjusting your search or filter settings</p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{post.user.name}</CardTitle>
                        <CardDescription>
                          {post.user.username} · {post.timestamp}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      <Trophy className="h-3 w-3 mr-1" />
                      {post.streakDays} day streak
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="mb-3">{post.content}</p>
                  {post.image && (
                    <div className="rounded-lg overflow-hidden mb-2">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.activity}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="trending" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trending Activities</CardTitle>
              <CardDescription>See what's popular in the community this week</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {trendingActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${activity.iconBg}`}>
                        <div className={activity.iconColor}>{activity.icon}</div>
                      </div>
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant={joinedActivities.includes(activity.id) ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleJoinActivity(activity.id)}
                    >
                      {joinedActivities.includes(activity.id) ? (
                        <>
                          <Check className="h-3.5 w-3.5 mr-1.5" />
                          Joined
                        </>
                      ) : (
                        "Join"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trending Hashtags</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">#FitnessJourney</Badge>
                <Badge variant="secondary">#MorningWorkout</Badge>
                <Badge variant="secondary">#RunningCommunity</Badge>
                <Badge variant="secondary">#YogaEveryday</Badge>
                <Badge variant="secondary">#StreakGoals</Badge>
                <Badge variant="secondary">#FitFam</Badge>
                <Badge variant="secondary">#ConsistencyWins</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Top Streakers</h2>
            <Select 
              defaultValue={timeFilter} 
              onValueChange={(value) => setTimeFilter(value)}
            >
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {leaderboardUsers.map((user, index) => (
            <Card key={user.id} className={index === 0 ? "border-yellow-300 bg-yellow-50/50 dark:border-yellow-500 dark:bg-yellow-500/10" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg w-6 text-center text-muted-foreground">{user.rank}</div>
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.username}</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2 text-xs">
                          {user.badgeIcon}
                          <span className="ml-1">{user.badge}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-primary">{user.streakDays}</span>
                      <span className="text-xs text-muted-foreground">day streak</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.challengesCompleted} challenges completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            View Full Leaderboard
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

