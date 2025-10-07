import { useState } from "react";
import { Link } from "wouter";
import { Sparkles, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DestinationCard } from "./DestinationCard";
import { DestinationDetailModal } from "./DestinationDetailModal";
import { ThemeToggle } from "./ThemeToggle";
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

const categories = ["All", "Beach", "Adventure", "Cultural", "Nature", "Budget"];

export function AIRecommendationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>(
    allDestinations.slice(0, 6)
  );

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      const shuffled = [...allDestinations].sort(() => Math.random() - 0.5);
      setDestinations(shuffled.slice(0, 6));
      setIsRegenerating(false);
    }, 1500);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setDestinations(allDestinations.slice(0, 6));
    } else if (category === "Budget") {
      const budget = allDestinations.filter(d => d.price < 18000).slice(0, 6);
      setDestinations(budget);
    } else {
      const filtered = allDestinations.filter(d => d.category === category).slice(0, 6);
      setDestinations(filtered.length > 0 ? filtered : allDestinations.slice(0, 6));
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">AI Travel</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-gradient-to-r from-ai-accent/10 to-primary/10 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-ai-accent" />
            <h2 className="text-3xl font-bold">AI Recommendations for You</h2>
          </div>
          <p className="text-muted-foreground">
            Based on your travel history, preferences & budget
          </p>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 hover-elevate"
                onClick={() => handleCategoryFilter(category)}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {isRegenerating ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onLike={handleLike}
                onSkip={handleSkip}
                onViewStays={handleViewStays}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center pt-8">
          <Button
            size="lg"
            variant="outline"
            className="gap-2 px-8"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            data-testid="button-regenerate"
          >
            <RefreshCw className={`h-5 w-5 ${isRegenerating ? "animate-spin" : ""}`} />
            {isRegenerating ? "Generating..." : "Generate New Recommendations"}
          </Button>
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
