import { useState } from "react";
import { RefreshCw, Map as MapIcon, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "./DestinationCard";
import { DestinationDetailModal } from "./DestinationDetailModal";
import { AIChatBar } from "./AIChatBar";
import { MapView } from "./MapView";
import { EnhancedNavbar } from "./EnhancedNavbar";
import type { Destination } from "@shared/schema";

import beachImg from "@assets/stock_images/beautiful_beach_dest_1f26de4d.jpg";
import mountainImg from "@assets/stock_images/mountain_landscape_a_7f0cf1fb.jpg";
import templeImg from "@assets/stock_images/ancient_temple_archi_8a147735.jpg";
import cityImg from "@assets/stock_images/colorful_city_street_05501028.jpg";
import lakeImg from "@assets/stock_images/serene_lake_with_for_8584f25a.jpg";
import desertImg from "@assets/stock_images/desert_landscape_wit_6bd98828.jpg";
import countrysideImg from "@assets/stock_images/countryside_villa_wi_ea7bc9ff.jpg";
import coastalImg from "@assets/stock_images/coastal_cliff_villag_af08d6ae.jpg";

const allDestinations: Destination[] = [
  {
    id: "1",
    name: "Varkala, Kerala",
    location: "Kerala, India",
    imageUrl: beachImg,
    duration: "4 Days / 3 Nights",
    price: 18000,
    category: "Beach",
    aiReason: "Because you loved beaches and calm getaways",
    description: "Best for solo travelers seeking tranquility. Perfect 4-day trip ideal in winter months.",
  },
  {
    id: "2",
    name: "Bir Billing",
    location: "Himachal Pradesh, India",
    imageUrl: mountainImg,
    duration: "3 Days / 2 Nights",
    price: 15000,
    category: "Adventure",
    aiReason: "Based on your love for adventure sports and mountains",
    description: "Perfect for adventure enthusiasts. Paragliding capital of India with stunning valley views.",
  },
  {
    id: "3",
    name: "Hampi",
    location: "Karnataka, India",
    imageUrl: templeImg,
    duration: "3 Days / 2 Nights",
    price: 12000,
    category: "Cultural",
    aiReason: "You enjoy historical sites and cultural experiences",
    description: "Ideal for history buffs. Ancient ruins and temples perfect for a 3-day cultural immersion.",
  },
  {
    id: "4",
    name: "Udaipur",
    location: "Rajasthan, India",
    imageUrl: cityImg,
    duration: "4 Days / 3 Nights",
    price: 22000,
    category: "City",
    aiReason: "Matches your preference for romantic city breaks",
    description: "City of lakes and palaces. Perfect for couples seeking luxury and culture.",
  },
  {
    id: "5",
    name: "Coorg",
    location: "Karnataka, India",
    imageUrl: lakeImg,
    duration: "3 Days / 2 Nights",
    price: 16000,
    category: "Nature",
    aiReason: "Because you loved nature escapes and budget-friendly trips",
    description: "Scotland of India. Coffee plantations and misty hills ideal for nature lovers.",
  },
  {
    id: "6",
    name: "Jaisalmer",
    location: "Rajasthan, India",
    imageUrl: desertImg,
    duration: "3 Days / 2 Nights",
    price: 19000,
    category: "Desert",
    aiReason: "Based on your interest in unique landscapes and experiences",
    description: "Golden city with sand dunes. Camel safaris and desert camping under the stars.",
  },
  {
    id: "7",
    name: "Nashik",
    location: "Maharashtra, India",
    imageUrl: countrysideImg,
    duration: "2 Days / 1 Night",
    price: 14000,
    category: "Wine",
    aiReason: "Matches your taste for wine regions and relaxation",
    description: "Wine capital of India. Vineyard tours and tastings in scenic countryside.",
  },
  {
    id: "8",
    name: "Gokarna",
    location: "Karnataka, India",
    imageUrl: coastalImg,
    duration: "4 Days / 3 Nights",
    price: 17000,
    category: "Beach",
    aiReason: "Similar to beaches you loved but less crowded",
    description: "Peaceful alternative to Goa. Pristine beaches and cliff-top views.",
  },
];

// Intent detection function
function parseIntent(query: string): {
  category?: string;
  maxBudget?: number;
  vibe?: string;
  duration?: string;
} {
  const lowerQuery = query.toLowerCase();
  const intent: any = {};

  // Detect category
  if (lowerQuery.includes("beach") || lowerQuery.includes("coastal") || lowerQuery.includes("sea")) {
    intent.category = "Beach";
  } else if (lowerQuery.includes("mountain") || lowerQuery.includes("hill") || lowerQuery.includes("trek")) {
    intent.category = "Adventure";
  } else if (lowerQuery.includes("temple") || lowerQuery.includes("cultural") || lowerQuery.includes("heritage") || lowerQuery.includes("historical")) {
    intent.category = "Cultural";
  } else if (lowerQuery.includes("nature") || lowerQuery.includes("forest") || lowerQuery.includes("wildlife")) {
    intent.category = "Nature";
  } else if (lowerQuery.includes("desert") || lowerQuery.includes("sand")) {
    intent.category = "Desert";
  } else if (lowerQuery.includes("city") || lowerQuery.includes("urban")) {
    intent.category = "City";
  }

  // Detect budget
  const budgetMatch = lowerQuery.match(/(?:under|below|less than|max|budget)\s*(?:₹|rs\.?|rupees?)?\s*(\d+)k?/i);
  if (budgetMatch) {
    const amount = parseInt(budgetMatch[1]);
    intent.maxBudget = amount > 100 ? amount : amount * 1000;
  } else if (lowerQuery.includes("budget") || lowerQuery.includes("cheap") || lowerQuery.includes("affordable")) {
    intent.maxBudget = 18000;
  } else if (lowerQuery.includes("luxury") || lowerQuery.includes("premium")) {
    intent.maxBudget = 50000;
  }

  // Detect vibe
  if (lowerQuery.includes("romantic") || lowerQuery.includes("couple")) {
    intent.vibe = "romantic";
  } else if (lowerQuery.includes("family")) {
    intent.vibe = "family";
  } else if (lowerQuery.includes("solo") || lowerQuery.includes("alone")) {
    intent.vibe = "solo";
  } else if (lowerQuery.includes("adventure") || lowerQuery.includes("thrill")) {
    intent.vibe = "adventure";
  }

  // Detect duration
  if (lowerQuery.includes("weekend") || lowerQuery.includes("2 day") || lowerQuery.includes("short")) {
    intent.duration = "short";
  } else if (lowerQuery.includes("week") || lowerQuery.includes("5 day") || lowerQuery.includes("6 day") || lowerQuery.includes("7 day")) {
    intent.duration = "long";
  }

  return intent;
}

export function AIRecommendationsPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>(
    allDestinations.slice(0, 6)
  );
  const [currentQuery, setCurrentQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [mapSelectedId, setMapSelectedId] = useState<string | undefined>(undefined);

  const handleAISearch = (query: string) => {
    setCurrentQuery(query);
    setIsProcessing(true);

    const intent = parseIntent(query);
    
    setTimeout(() => {
      let filtered = [...allDestinations];

      if (intent.category) {
        filtered = filtered.filter(d => d.category === intent.category);
      }

      if (intent.maxBudget !== undefined) {
        filtered = filtered.filter(d => d.price <= intent.maxBudget!);
      }

      if (intent.vibe === "romantic") {
        filtered = filtered.filter(d => 
          d.category === "City" || d.category === "Beach" || d.name.includes("Udaipur")
        );
      } else if (intent.vibe === "adventure") {
        filtered = filtered.filter(d => 
          d.category === "Adventure" || d.category === "Desert"
        );
      } else if (intent.vibe === "family") {
        filtered = filtered.filter(d => 
          d.category === "Nature" || d.category === "Cultural"
        );
      }

      if (intent.duration === "short") {
        filtered = filtered.filter(d => 
          d.duration.includes("2 Night") || d.duration.includes("1 Night")
        );
      } else if (intent.duration === "long") {
        filtered = filtered.filter(d => 
          d.duration.includes("4 Days") || d.duration.includes("5 Days")
        );
      }

      const results = filtered.length > 0 ? filtered : allDestinations;
      const shuffled = [...results].sort(() => Math.random() - 0.5);
      setDestinations(shuffled.slice(0, 6));
      setIsProcessing(false);
    }, 800);
  };

  const handleRegenerate = () => {
    if (currentQuery) {
      handleAISearch(currentQuery);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        const shuffled = [...allDestinations].sort(() => Math.random() - 0.5);
        setDestinations(shuffled.slice(0, 6));
        setIsProcessing(false);
      }, 800);
    }
  };

  const handleLike = (id: string) => {
    console.log("Liked destination:", id);
  };

  const handleSkip = (id: string) => {
    console.log("Skipped destination:", id);
  };

  const handleViewStays = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const handleMapSelect = (destination: Destination) => {
    setMapSelectedId(destination.id);
    const element = document.getElementById(`destination-${destination.id}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <EnhancedNavbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <AIChatBar onSearch={handleAISearch} isProcessing={isProcessing} />

        {/* Mobile: Tab Switcher */}
        <div className="lg:hidden flex gap-2 mb-4 mt-4">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setViewMode("grid")}
            data-testid="view-grid"
          >
            <Grid3x3 className="h-4 w-4" />
            Cards
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setViewMode("map")}
            data-testid="view-map"
          >
            <MapIcon className="h-4 w-4" />
            Map
          </Button>
        </div>

        {/* Desktop: Split View, Mobile: Conditional View */}
        <div className="flex gap-6 mt-6">
          {/* Cards Section */}
          <div className={`flex-1 ${viewMode === "map" ? "hidden lg:block" : ""}`}>
            {isProcessing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-96 bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destinations.map((destination) => (
                  <div
                    key={destination.id}
                    id={`destination-${destination.id}`}
                    className={`transition-all duration-300 ${
                      mapSelectedId === destination.id ? "ring-2 ring-primary rounded-lg" : ""
                    }`}
                  >
                    <DestinationCard
                      destination={destination}
                      onLike={handleLike}
                      onSkip={handleSkip}
                      onViewStays={handleViewStays}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center pt-8">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8"
                onClick={handleRegenerate}
                disabled={isProcessing}
                data-testid="button-regenerate"
              >
                <RefreshCw className={`h-5 w-5 ${isProcessing ? "animate-spin" : ""}`} />
                {isProcessing ? "Generating..." : "Generate New Recommendations"}
              </Button>
            </div>
          </div>

          {/* Map Section - Desktop Sidebar / Mobile Full */}
          <div className={`lg:w-96 h-[600px] lg:sticky lg:top-24 ${
            viewMode === "grid" ? "hidden lg:block" : "w-full"
          }`}>
            <MapView
              destinations={destinations}
              onDestinationSelect={handleMapSelect}
              selectedDestinationId={mapSelectedId}
            />
          </div>
        </div>
      </main>

      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={!!selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </div>
  );
}
