import { Clock, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Activity } from "@shared/schema";

interface ActivityCardProps {
  activity: Activity;
  onSelect?: (activity: Activity) => void;
  isHighlighted?: boolean;
}

const vibeEmojis: Record<string, string> = {
  family: "👨‍👩‍👧",
  spiritual: "🕉️",
  temple: "🛕",
  shopping: "🛍️",
  party: "🎉",
  nightlife: "🌙",
  adventure: "🏔️",
};

const vibeLabels: Record<string, string> = {
  family: "Family",
  spiritual: "Spiritual",
  temple: "Temple",
  shopping: "Shopping",
  party: "Party",
  nightlife: "Nightlife",
  adventure: "Adventure",
};

export function ActivityCard({ activity, onSelect, isHighlighted }: ActivityCardProps) {
  return (
    <Card
      className={`p-4 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 ${
        isHighlighted ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => onSelect?.(activity)}
      data-testid={`activity-card-${activity.id}`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold">{activity.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {activity.description}
            </p>
          </div>
          <Badge variant="outline" className="shrink-0">
            {vibeEmojis[activity.vibe]} {vibeLabels[activity.vibe]}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{activity.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span>{activity.rating}</span>
            </div>
          </div>
          <Button size="sm" variant="outline" data-testid={`button-learn-more-${activity.id}`}>
            Learn More
          </Button>
        </div>
      </div>
    </Card>
  );
}
