import { cn } from "@/lib/utils"
import { Trophy } from "lucide-react"

interface StreakCounterProps {
  streak: number
  activityType?: string
}

export function StreakCounter({ streak, activityType = "default" }: StreakCounterProps) {
  // Calculate filled segments based on streak value - different scale for different streak ranges
  const getFilledSegments = () => {
    if (streak <= 5) {
      return streak;
    } else if (streak <= 10) {
      return Math.ceil((streak - 5) / 5 * 5);
    } else if (streak <= 20) {
      return Math.ceil((streak - 10) / 10 * 5);
    } else {
      return 5;
    }
  };

  // Get color based on activity type
  const getActivityColor = () => {
    switch (activityType) {
      case "running":
        return "bg-blue-500";
      case "gym":
        return "bg-green-500";
      case "yoga":
        return "bg-purple-500";
      case "cycling":
        return "bg-amber-500";
      case "other":
        return "bg-rose-500";
      default:
        return "bg-primary";
    }
  };

  // Get trophy color based on activity type
  const getTrophyColor = () => {
    switch (activityType) {
      case "running":
        return "text-blue-500";
      case "gym":
        return "text-green-500";
      case "yoga":
        return "text-purple-500";
      case "cycling":
        return "text-amber-500";
      case "other":
        return "text-rose-500";
      default:
        return streak >= 30 ? "text-red-500" : "text-yellow-500";
    }
  };

  // Get label text based on streak
  const getStreakLabel = () => {
    if (streak < 3) return "New";
    if (streak < 7) return "Starting";
    if (streak < 14) return "Good";
    if (streak < 21) return "Great";
    if (streak < 30) return "Amazing";
    return "Legendary";
  };

  const filledSegments = getFilledSegments();
  const activityColor = getActivityColor();
  const trophyColor = getTrophyColor();

  return (
    <div className="flex flex-col">
      <div className="flex items-center mt-1 relative">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 w-6 rounded-sm transition-all", 
                i < filledSegments ? activityColor : "bg-muted"
              )}
            />
          ))}
        </div>
        <div className="flex items-center ml-2 text-sm font-medium">
          <Trophy className={cn("h-3 w-3 mr-1", trophyColor)} />
          <span>{streak} day streak</span>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-xs text-muted-foreground ml-1 mt-1">{getStreakLabel()}</span>
        {streak >= 7 && (
          <span className="text-xs ml-2 mt-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
            {streak >= 30 ? "30+" : streak >= 21 ? "21+" : streak >= 14 ? "14+" : "7+"}
          </span>
        )}
      </div>
    </div>
  )
}

