import { Plane, Hotel, Compass, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function EnhancedNavbar() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">AI Travel</h1>
            
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="nav-flights">
                <Plane className="h-4 w-4" />
                Flights
              </Button>
              <Button variant="ghost" size="sm" className="gap-2" data-testid="nav-hotels">
                <Hotel className="h-4 w-4" />
                Hotels
              </Button>
              <Button variant="ghost" size="sm" className="gap-2" data-testid="nav-experiences">
                <Compass className="h-4 w-4" />
                Experiences
              </Button>
              <Button variant="ghost" size="sm" className="gap-2" data-testid="nav-trips">
                <Calendar className="h-4 w-4" />
                My Trips
              </Button>
            </nav>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
