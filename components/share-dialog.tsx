"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Facebook, Instagram, Twitter, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  challenge: {
    name: string
    streak: number
  } | null
}

export function ShareDialog({ open, onOpenChange, challenge }: ShareDialogProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  if (!challenge) return null

  const shareText = `I've kept a ${challenge.streak}-day streak for ${challenge.name} on Streek! 💪 Join me in staying accountable for your fitness goals!`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "Copied to clipboard!",
      description: "Share text copied to clipboard.",
      duration: 3000,
    })
  }

  const handleShare = (platform: string) => {
    toast({
      title: `Shared on ${platform}!`,
      description: `Your achievement has been shared on ${platform}.`,
      duration: 3000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Achievement</DialogTitle>
          <DialogDescription>Share your streak with friends and inspire others!</DialogDescription>
        </DialogHeader>

        <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border mb-4">
          <p className="font-medium text-sm">{shareText}</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <Button
            variant="outline"
            className="flex flex-col items-center h-auto py-3"
            onClick={() => handleShare("Facebook")}
          >
            <Facebook className="h-5 w-5 text-blue-600 mb-1" />
            <span className="text-xs">Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center h-auto py-3"
            onClick={() => handleShare("Instagram")}
          >
            <Instagram className="h-5 w-5 text-pink-600 mb-1" />
            <span className="text-xs">Instagram</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center h-auto py-3"
            onClick={() => handleShare("Twitter")}
          >
            <Twitter className="h-5 w-5 text-blue-400 mb-1" />
            <span className="text-xs">Twitter</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center h-auto py-3" onClick={handleCopy}>
            {copied ? (
              <CheckCircle className="h-5 w-5 text-green-500 mb-1" />
            ) : (
              <Copy className="h-5 w-5 text-gray-500 mb-1" />
            )}
            <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)} className="bg-primary hover:bg-primary-dark">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

