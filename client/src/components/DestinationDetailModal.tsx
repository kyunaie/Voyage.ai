import { useState } from "react";
import { X, Map as MapIcon, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DestinationMapView } from "./DestinationMapView";
import { ActivityCard } from "./ActivityCard";
import type { Destination, Activity, VibeZone } from "@shared/schema";

interface DestinationDetailModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock activities data - personalized based on destination
const getActivitiesForDestination = (destination: Destination): Activity[] => {
  const baseActivities: Record<string, Activity[]> = {
    "Varkala, Kerala": [
      {
        id: "v1",
        name: "Varkala Cliff Sunset Walk",
        category: "Scenic",
        vibe: "spiritual",
        duration: "2 hours",
        rating: 4.8,
        location: { x: 35, y: 45 },
        description: "Walk along the dramatic cliff overlooking the Arabian Sea during golden hour",
      },
      {
        id: "v2",
        name: "Beach Yoga Session",
        category: "Wellness",
        vibe: "spiritual",
        duration: "1.5 hours",
        rating: 4.7,
        location: { x: 30, y: 60 },
        description: "Morning yoga on pristine beach with experienced instructors",
      },
      {
        id: "v3",
        name: "Local Market Shopping",
        category: "Shopping",
        vibe: "shopping",
        duration: "3 hours",
        rating: 4.5,
        location: { x: 65, y: 40 },
        description: "Explore colorful local markets for handicrafts and spices",
      },
      {
        id: "v4",
        name: "Ayurvedic Spa Treatment",
        category: "Wellness",
        vibe: "spiritual",
        duration: "2 hours",
        rating: 4.9,
        location: { x: 50, y: 35 },
        description: "Traditional Kerala ayurvedic massage and treatments",
      },
      {
        id: "v5",
        name: "Beach Shack Dining",
        category: "Food",
        vibe: "nightlife",
        duration: "2 hours",
        rating: 4.6,
        location: { x: 40, y: 70 },
        description: "Fresh seafood and cocktails at beachfront restaurants",
      },
    ],
    "Bir Billing": [
      {
        id: "b1",
        name: "Paragliding Adventure",
        category: "Adventure",
        vibe: "adventure",
        duration: "3 hours",
        rating: 4.9,
        location: { x: 45, y: 30 },
        description: "World-class paragliding experience with certified instructors",
      },
      {
        id: "b2",
        name: "Monastery Visit",
        category: "Cultural",
        vibe: "temple",
        duration: "2 hours",
        rating: 4.7,
        location: { x: 60, y: 50 },
        description: "Explore Tibetan monasteries and learn about Buddhist culture",
      },
      {
        id: "b3",
        name: "Trek to Rajgundha",
        category: "Trekking",
        vibe: "adventure",
        duration: "6 hours",
        rating: 4.8,
        location: { x: 35, y: 65 },
        description: "Scenic trek through pine forests to a hidden valley",
      },
      {
        id: "b4",
        name: "Camping Under Stars",
        category: "Adventure",
        vibe: "adventure",
        duration: "Overnight",
        rating: 4.7,
        location: { x: 70, y: 40 },
        description: "Camping experience with bonfire and mountain views",
      },
      {
        id: "b5",
        name: "Local Cafe Hopping",
        category: "Food",
        vibe: "shopping",
        duration: "3 hours",
        rating: 4.5,
        location: { x: 50, y: 55 },
        description: "Visit cozy cafes serving organic food and local delicacies",
      },
    ],
    "Hampi": [
      {
        id: "h1",
        name: "Virupaksha Temple Tour",
        category: "Heritage",
        vibe: "temple",
        duration: "2 hours",
        rating: 4.9,
        location: { x: 40, y: 45 },
        description: "Visit the ancient temple dating back to 7th century",
      },
      {
        id: "h2",
        name: "Coracle Ride",
        category: "Adventure",
        vibe: "family",
        duration: "1 hour",
        rating: 4.6,
        location: { x: 30, y: 60 },
        description: "Traditional round boat ride across Tungabhadra River",
      },
      {
        id: "h3",
        name: "Boulder Climbing",
        category: "Adventure",
        vibe: "adventure",
        duration: "4 hours",
        rating: 4.7,
        location: { x: 65, y: 35 },
        description: "Rock climbing on Hampi's unique boulder formations",
      },
      {
        id: "h4",
        name: "Hippie Island Sunset",
        category: "Scenic",
        vibe: "party",
        duration: "2 hours",
        rating: 4.8,
        location: { x: 55, y: 70 },
        description: "Sunset views from laid-back cafes on the island",
      },
      {
        id: "h5",
        name: "Heritage Walk",
        category: "Cultural",
        vibe: "temple",
        duration: "3 hours",
        rating: 4.9,
        location: { x: 45, y: 50 },
        description: "Guided tour of UNESCO World Heritage ruins",
      },
    ],
  };

  // Default activities for other destinations
  const defaultActivities: Activity[] = [
    {
      id: "d1",
      name: "Local Sightseeing Tour",
      category: "Sightseeing",
      vibe: "family",
      duration: "4 hours",
      rating: 4.5,
      location: { x: 40, y: 45 },
      description: "Explore main attractions with local guide",
    },
    {
      id: "d2",
      name: "Cultural Workshop",
      category: "Cultural",
      vibe: "spiritual",
      duration: "2 hours",
      rating: 4.6,
      location: { x: 55, y: 60 },
      description: "Learn traditional crafts and local customs",
    },
    {
      id: "d3",
      name: "Food Walking Tour",
      category: "Food",
      vibe: "shopping",
      duration: "3 hours",
      rating: 4.7,
      location: { x: 65, y: 40 },
      description: "Taste authentic local cuisine at hidden gems",
    },
    {
      id: "d4",
      name: "Adventure Activity",
      category: "Adventure",
      vibe: "adventure",
      duration: "3 hours",
      rating: 4.8,
      location: { x: 35, y: 65 },
      description: "Exciting outdoor activities based on location",
    },
    {
      id: "d5",
      name: "Evening Entertainment",
      category: "Entertainment",
      vibe: "nightlife",
      duration: "2 hours",
      rating: 4.5,
      location: { x: 50, y: 55 },
      description: "Local music, dance, or cultural performances",
    },
  ];

  return baseActivities[destination.name] || defaultActivities;
};

// Vibe zones for each destination
const getVibeZonesForDestination = (destination: Destination): VibeZone[] => {
  const zoneMap: Record<string, VibeZone[]> = {
    "Varkala, Kerala": [
      { vibe: "spiritual", center: { x: 40, y: 45 }, radius: 15 },
      { vibe: "shopping", center: { x: 65, y: 40 }, radius: 12 },
      { vibe: "nightlife", center: { x: 40, y: 70 }, radius: 10 },
    ],
    "Bir Billing": [
      { vibe: "adventure", center: { x: 45, y: 40 }, radius: 18 },
      { vibe: "temple", center: { x: 60, y: 50 }, radius: 12 },
      { vibe: "shopping", center: { x: 50, y: 55 }, radius: 10 },
    ],
    "Hampi": [
      { vibe: "temple", center: { x: 45, y: 48 }, radius: 16 },
      { vibe: "adventure", center: { x: 60, y: 35 }, radius: 12 },
      { vibe: "family", center: { x: 35, y: 60 }, radius: 10 },
      { vibe: "party", center: { x: 55, y: 70 }, radius: 10 },
    ],
  };

  return (
    zoneMap[destination.name] || [
      { vibe: "family", center: { x: 35, y: 50 }, radius: 12 },
      { vibe: "spiritual", center: { x: 50, y: 40 }, radius: 12 },
      { vibe: "shopping", center: { x: 65, y: 55 }, radius: 12 },
    ]
  );
};

export function DestinationDetailModal({
  destination,
  isOpen,
  onClose,
}: DestinationDetailModalProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [vibeFilter, setVibeFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"activities" | "map">("activities");

  if (!destination) return null;

  const allActivities = getActivitiesForDestination(destination);
  const vibeZones = getVibeZonesForDestination(destination);
  
  const filteredActivities = vibeFilter
    ? allActivities.filter((a) => a.vibe === vibeFilter)
    : allActivities;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] p-0 overflow-hidden">
        {/* Header */}
        <div className="relative h-48 border-b">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <DialogHeader className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <DialogTitle className="text-2xl lg:text-3xl font-bold">
              Explore {destination.name}
            </DialogTitle>
            <p className="text-sm text-white/90 mt-1">
              Personalized recommendations based on your preferences
            </p>
          </DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            data-testid="button-close-detail-modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile: Tab Switcher */}
        <div className="lg:hidden flex gap-2 p-4 border-b">
          <Button
            variant={viewMode === "activities" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setViewMode("activities")}
            data-testid="view-activities"
          >
            <List className="h-4 w-4" />
            Things to Do
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setViewMode("map")}
            data-testid="view-detail-map"
          >
            <MapIcon className="h-4 w-4" />
            Map
          </Button>
        </div>

        {/* Content: Split View */}
        <div className="flex flex-col lg:flex-row h-[calc(90vh-12rem)] lg:h-[calc(90vh-14rem)]">
          {/* Activities List */}
          <div
            className={`flex-1 overflow-y-auto p-6 ${
              viewMode === "map" ? "hidden lg:block" : ""
            }`}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {vibeFilter
                    ? `${vibeFilter.charAt(0).toUpperCase() + vibeFilter.slice(1)} Activities`
                    : "Things to Do"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {filteredActivities.length} activities available
                  {vibeFilter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setVibeFilter(null)}
                      className="ml-2 h-auto p-0"
                    >
                      Clear filter
                    </Button>
                  )}
                </p>
              </div>

              <div className="space-y-3">
                {filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onSelect={setSelectedActivity}
                    isHighlighted={selectedActivity?.id === activity.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Map View */}
          <div
            className={`lg:w-1/2 lg:border-l ${
              viewMode === "activities" ? "hidden lg:block" : "h-full"
            }`}
          >
            <DestinationMapView
              activities={allActivities}
              vibeZones={vibeZones}
              onActivitySelect={setSelectedActivity}
              selectedActivityId={selectedActivity?.id}
              onVibeFilter={setVibeFilter}
              activeVibeFilter={vibeFilter}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
