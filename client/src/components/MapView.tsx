import { useState } from "react";
import { MapPin, Cloud, Sun, CloudRain, Plane, Train, Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Destination } from "@shared/schema";

interface MapViewProps {
  destinations: Destination[];
  onDestinationSelect?: (destination: Destination) => void;
  selectedDestinationId?: string;
}

// Map coordinates for Indian destinations (relative positioning)
const destinationCoordinates: Record<string, { x: number; y: number }> = {
  "Varkala, Kerala": { x: 48, y: 82 },
  "Bir Billing": { x: 45, y: 25 },
  "Hampi": { x: 52, y: 68 },
  "Udaipur": { x: 38, y: 42 },
  "Coorg": { x: 52, y: 75 },
  "Jaisalmer": { x: 35, y: 40 },
  "Nashik": { x: 44, y: 60 },
  "Gokarna": { x: 50, y: 72 },
};

const vibeColors: Record<string, string> = {
  Beach: "from-cyan-400/30 to-blue-400/30",
  Adventure: "from-purple-400/30 to-pink-400/30",
  Cultural: "from-amber-400/30 to-orange-400/30",
  Nature: "from-green-400/30 to-emerald-400/30",
  Desert: "from-yellow-400/30 to-amber-400/30",
  City: "from-indigo-400/30 to-violet-400/30",
  Wine: "from-rose-400/30 to-red-400/30",
};

const vibeEmojis: Record<string, string> = {
  Beach: "🏖️",
  Adventure: "🏔️",
  Cultural: "🏛️",
  Nature: "🌲",
  Desert: "🏜️",
  City: "🏙️",
  Wine: "🍷",
};

// Mock weather data
const getWeather = (name: string) => {
  const weathers = [
    { temp: 28, condition: "sunny", icon: Sun },
    { temp: 24, condition: "cloudy", icon: Cloud },
    { temp: 22, condition: "rainy", icon: CloudRain },
  ];
  return weathers[Math.floor(Math.random() * weathers.length)];
};

const getTravelOption = (name: string) => {
  const options = [
    { type: "flight", icon: Plane },
    { type: "train", icon: Train },
    { type: "road", icon: Car },
  ];
  return options[Math.floor(Math.random() * options.length)];
};

export function MapView({ destinations, onDestinationSelect, selectedDestinationId }: MapViewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Card className="h-full p-0 overflow-hidden relative bg-muted/20">
      {/* Map Background - Simple India outline */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M 70 20 Q 80 15, 90 20 L 95 30 Q 100 35, 95 40 L 90 50 Q 85 55, 85 60 L 90 70 Q 95 80, 90 85 L 80 95 Q 75 100, 70 100 L 65 110 Q 60 115, 55 110 L 50 100 Q 45 90, 50 85 L 55 75 Q 50 70, 45 70 L 40 65 Q 35 60, 40 55 L 45 45 Q 50 40, 45 35 L 50 25 Q 60 20, 70 20 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Map Title */}
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-lg font-semibold">Destination Map</h3>
        <p className="text-sm text-muted-foreground">Hover pins to see details</p>
      </div>

      {/* Destinations on map */}
      <div className="relative w-full h-full">
        {destinations.map((destination) => {
          const coords = destinationCoordinates[destination.name] || { x: 50, y: 50 };
          const weather = getWeather(destination.name);
          const travel = getTravelOption(destination.name);
          const isSelected = selectedDestinationId === destination.id;
          const isHovered = hoveredId === destination.id;

          return (
            <div
              key={destination.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              onMouseEnter={() => setHoveredId(destination.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onDestinationSelect?.(destination)}
              data-testid={`map-pin-${destination.id}`}
            >
              {/* Vibe circle */}
              <div
                className={`absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${
                  vibeColors[destination.category] || vibeColors.Nature
                } blur-lg transition-all duration-300 ${
                  isHovered || isSelected ? "scale-150 opacity-80" : "scale-100 opacity-40"
                }`}
              />

              {/* Vibe emoji */}
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-full text-2xl">
                {vibeEmojis[destination.category] || "📍"}
              </div>

              {/* Pin */}
              <div
                className={`relative z-10 transition-all duration-200 ${
                  isHovered || isSelected ? "scale-125" : "scale-100"
                }`}
              >
                <MapPin
                  className={`w-8 h-8 ${
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
                <Card className="absolute top-12 left-1/2 -translate-x-1/2 p-3 min-w-48 z-20 shadow-xl animate-in fade-in zoom-in duration-200">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{destination.name}</h4>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <weather.icon className="w-4 h-4" />
                        <span>{weather.temp}°C</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <travel.icon className="w-4 h-4" />
                        <span className="capitalize">{travel.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {destination.category}
                      </Badge>
                      <span className="text-sm font-semibold">₹{destination.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
        <p className="text-xs font-semibold">Legend</p>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <Sun className="w-3 h-3" />
            <span>Weather</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-3 h-3" />
            <span>Travel</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400/50 to-blue-400/50" />
            <span>Vibe</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
