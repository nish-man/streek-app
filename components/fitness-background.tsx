"use client"

import { motion } from "framer-motion"
import { Dumbbell, Trophy, Heart, Activity, TrendingUp, Medal } from "lucide-react"

interface FitnessBackgroundProps {
  density?: number
  className?: string
}

export function FitnessBackground({ density = 15, className = "" }: FitnessBackgroundProps) {
  const icons = [
    <Dumbbell key="dumbbell" />,
    <Trophy key="trophy" />,
    <Heart key="heart" />,
    <Activity key="activity" />,
    <TrendingUp key="trending-up" />,
    <Medal key="medal" />
  ]

  return (
    <div className={`absolute inset-0 z-0 opacity-10 overflow-hidden ${className}`}>
      {[...Array(density)].map((_, i) => {
        const Icon = () => icons[Math.floor(Math.random() * icons.length)]
        const size = Math.random() * 60 + 20 // Size between 20px and 80px
        const xPos = Math.random() * 100
        const yPos = Math.random() * 100
        const duration = Math.random() * 20 + 15
        const delay = Math.random() * 10
        
        return (
          <motion.div
            key={i}
            className="absolute text-primary"
            style={{
              width: size,
              height: size,
              left: `${xPos}%`,
              top: `${yPos}%`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [0.7, 1, 0.7],
              rotate: [0, 360, 0],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut"
            }}
          >
            <Icon />
          </motion.div>
        )
      })}
    </div>
  )
} 