import { useState } from "react";
import { Heart, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Destination } from "@shared/schema";

interface DestinationCardProps {
  destination: Destination;
  onLike?: (id: string) => void;
  onSkip?: (id: string) => void;
  onViewStays?: (destination: Destination) => void;
}

export function DestinationCard({
  destination,
  onLike,
  onSkip,
  onViewStays,
}: DestinationCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(destination.id);
  };

  const handleSkip = () => {
    onSkip?.(destination.id);
  };

  const handleViewStays = () => {
    onViewStays?.(destination);
  };

  return (
    <Card className="overflow-hidden border shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold" data-testid={`text-destination-name-${destination.id}`}>
            {destination.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1" data-testid={`text-destination-meta-${destination.id}`}>
            {destination.duration} · ₹{destination.price.toLocaleString()}
          </p>
        </div>

        <div className="flex items-start gap-2 bg-ai-accent/10 rounded-lg px-3 py-2">
          <Sparkles className="h-4 w-4 text-ai-accent mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium text-ai-accent" data-testid={`text-ai-reason-${destination.id}`}>
            {destination.aiReason}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={cn(
                "rounded-full",
                isLiked && "text-chart-3 hover:text-chart-3"
              )}
              data-testid={`button-like-${destination.id}`}
            >
              <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="rounded-full"
              data-testid={`button-skip-${destination.id}`}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <Button
            onClick={handleViewStays}
            className="gap-2"
            data-testid={`button-view-stays-${destination.id}`}
          >
            View Stays
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
