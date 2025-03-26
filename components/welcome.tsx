"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FcGoogle } from "react-icons/fc"
import { Dumbbell, Trophy, CheckCircle2, ArrowRight, MailIcon, LockIcon } from "lucide-react"
import { AnimatedLogo } from "./animated-logo"
import { FitnessBackground } from "./fitness-background"
import { signIn } from "next-auth/react"

interface WelcomeProps {
  onLogin: (email: string, password: string) => Promise<void>
}

export function Welcome({ onLogin }: WelcomeProps) {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error("Google login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onLogin(email, password)
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex-1 container max-w-md mx-auto px-4 pb-20 pt-4">
        <div className="relative">
          {/* Fitness themed background */}
          <FitnessBackground density={20} />
          
          {/* Main content container */}
          <div className="relative z-10 bg-background/95 dark:bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50">
            {/* App header */}
            <div className="pt-8 pb-4 px-6 flex flex-col items-center border-b border-border/50">
              <AnimatedLogo size="md" className="mb-3" />
              <h1 className="text-2xl font-bold text-foreground mb-1">Streek</h1>
              <p className="text-sm text-muted-foreground">Your fitness accountability partner</p>
            </div>

            {/* App body */}
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-0">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          id="email" 
                          placeholder="name@example.com" 
                          type="email" 
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                      </div>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          id="password" 
                          type="password" 
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary-dark" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Please wait
                        </>
                      ) : (
                        <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
                      {loading ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent"></div>
                      ) : (
                        <FcGoogle className="mr-2 h-5 w-5" />
                      )}
                      Google
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="mt-0">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input 
                        id="signup-name" 
                        placeholder="John Doe" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          id="signup-email" 
                          placeholder="name@example.com" 
                          type="email" 
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          id="signup-password" 
                          type="password" 
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary-dark" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Creating account
                        </>
                      ) : (
                        <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
                      <FcGoogle className="mr-2 h-5 w-5" />
                      Google
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>

            {/* App features footer */}
            <div className="px-6 py-4 bg-background/80 dark:bg-background/70 border-t border-border/50">
              <div className="space-y-2">
                {[
                  { icon: <Trophy className="h-4 w-4 text-primary" />, text: "Build consistent habits through streaks" },
                  { icon: <Dumbbell className="h-4 w-4 text-primary" />, text: "Track your fitness progress with ease" },
                  { icon: <CheckCircle2 className="h-4 w-4 text-primary" />, text: "Achieve goals and unlock rewards" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 mr-2 p-1 rounded-full bg-primary/10">{feature.icon}</div>
                    <p className="text-xs text-foreground">{feature.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 