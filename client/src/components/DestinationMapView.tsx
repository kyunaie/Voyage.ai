import { useState } from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Activity, VibeZone } from "@shared/schema";

interface DestinationMapViewProps {
  activities: Activity[];
  vibeZones: VibeZone[];
  onActivitySelect?: (activity: Activity) => void;
  selectedActivityId?: string;
  onVibeFilter?: (vibe: string | null) => void;
  activeVibeFilter?: string | null;
}

const vibeColors: Record<string, string> = {
  family: "from-green-400/40 to-emerald-400/40",
  spiritual: "from-purple-400/40 to-violet-400/40",
  temple: "from-amber-400/40 to-yellow-400/40",
  shopping: "from-pink-400/40 to-rose-400/40",
  party: "from-blue-400/40 to-cyan-400/40",
  nightlife: "from-indigo-400/40 to-purple-400/40",
  adventure: "from-orange-400/40 to-red-400/40",
};

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

export function DestinationMapView({
  activities,
  vibeZones,
  onActivitySelect,
  selectedActivityId,
  onVibeFilter,
  activeVibeFilter,
}: DestinationMapViewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredVibe, setHoveredVibe] = useState<string | null>(null);

  return (
    <Card className="h-full p-0 overflow-hidden relative bg-muted/20">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10" />

      {/* Map Title */}
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-lg font-semibold">Activity Map</h3>
        <p className="text-sm text-muted-foreground">Click zones to filter</p>
      </div>

      {/* Vibe Zones */}
      <div className="relative w-full h-full">
        {vibeZones.map((zone, index) => (
          <div
            key={`zone-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${zone.center.x}%`,
              top: `${zone.center.y}%`,
              width: `${zone.radius * 2}%`,
              height: `${zone.radius * 2}%`,
            }}
            onClick={() => {
              onVibeFilter?.(activeVibeFilter === zone.vibe ? null : zone.vibe);
            }}
            onMouseEnter={() => setHoveredVibe(zone.vibe)}
            onMouseLeave={() => setHoveredVibe(null)}
            data-testid={`vibe-zone-${zone.vibe}`}
          >
            {/* Vibe circle */}
            <div
              className={`w-full h-full rounded-full bg-gradient-to-br ${
                vibeColors[zone.vibe]
              } blur-xl transition-all duration-300 ${
                hoveredVibe === zone.vibe || activeVibeFilter === zone.vibe
                  ? "scale-125 opacity-90"
                  : "scale-100 opacity-50"
              }`}
            />

            {/* Vibe emoji and label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-3xl">{vibeEmojis[zone.vibe]}</div>
              <Badge
                variant="outline"
                className={`mt-2 text-xs transition-all ${
                  hoveredVibe === zone.vibe || activeVibeFilter === zone.vibe
                    ? "bg-background/90"
                    : "bg-background/60"
                }`}
              >
                {vibeLabels[zone.vibe]}
              </Badge>
            </div>
          </div>
        ))}

        {/* Activity Pins */}
        {activities.map((activity) => {
          const isSelected = selectedActivityId === activity.id;
          const isHovered = hoveredId === activity.id;

          return (
            <div
              key={activity.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{ left: `${activity.location.x}%`, top: `${activity.location.y}%` }}
              onMouseEnter={() => setHoveredId(activity.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onActivitySelect?.(activity)}
              data-testid={`activity-pin-${activity.id}`}
            >
              {/* Pin */}
              <div
                className={`relative z-10 transition-all duration-200 ${
                  isHovered || isSelected ? "scale-125" : "scale-100"
                }`}
              >
                <MapPin
                  className={`w-6 h-6 ${
                    isSelected
                      ? "text-primary fill-primary"
                      : isHovered
                      ? "text-primary"
                      : "text-foreground"
                  } drop-shadow-lg`}
                />
              </div>

              {/* Info popup on hover */}
              {isHovered && (
                <Card className="absolute top-8 left-1/2 -translate-x-1/2 p-3 min-w-48 z-30 shadow-xl animate-in fade-in zoom-in duration-200">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">{activity.name}</h4>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-xs">
                        {vibeEmojis[activity.vibe]} {vibeLabels[activity.vibe]}
                      </Badge>
                      <span className="text-muted-foreground">⭐ {activity.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.duration}</p>
                  </div>
                </Card>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Filter Badge */}
      {activeVibeFilter && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="gap-2">
            <span>{vibeEmojis[activeVibeFilter]}</span>
            <span>Filtering: {vibeLabels[activeVibeFilter]}</span>
          </Badge>
        </div>
      )}
    </Card>
  );
}
