"use client"

import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AnimatedLogo({ size = "md", className = "" }: AnimatedLogoProps) {
  const sizes = {
    sm: {
      container: "w-16 h-16",
      icon: "h-8 w-8"
    },
    md: {
      container: "w-20 h-20",
      icon: "h-10 w-10"
    },
    lg: {
      container: "w-24 h-24",
      icon: "h-12 w-12"
    }
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <motion.div
        className={`relative ${sizes[size].container} rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center`}
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ 
          scale: [0.9, 1, 0.9],
          rotate: [0, 5, 0],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Trophy className={`${sizes[size].icon} text-white`} />
        </motion.div>
      </motion.div>
    </div>
  )
} 