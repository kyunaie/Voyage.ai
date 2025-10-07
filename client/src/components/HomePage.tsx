import { Link } from "wouter";
import { Sparkles, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">AI Travel</h1>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md">
                Home
              </Link>
              <Link href="/ai-recommendations" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md">
                AI Recommendations
              </Link>
              <Button variant="ghost" size="sm">My Trips</Button>
              <Button variant="ghost" size="sm">Deals</Button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold">
                Your Next Adventure
                <br />
                Starts Here
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover personalized travel destinations powered by AI
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <Input
                placeholder="Search destinations, hotels, or experiences..."
                className="flex-1 h-12"
                data-testid="input-search"
              />
              <Button size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>

            <Link href="/ai-recommendations">
              <Button
                size="lg"
                variant="default"
                className="gap-2 px-8 mt-4"
                data-testid="button-discover-ai"
              >
                <Sparkles className="h-5 w-5" />
                Discover with AI
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-semibold mb-8 text-center">
              Quick Access
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center space-y-3 hover-elevate cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">Flights</h4>
                <p className="text-sm text-muted-foreground">
                  Book domestic and international flights
                </p>
              </Card>

              <Card className="p-6 text-center space-y-3 hover-elevate cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">Hotels</h4>
                <p className="text-sm text-muted-foreground">
                  Find the perfect stay for your trip
                </p>
              </Card>

              <Card className="p-6 text-center space-y-3 hover-elevate cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">Experiences</h4>
                <p className="text-sm text-muted-foreground">
                  Discover unique local activities
                </p>
              </Card>

              <Card className="p-6 text-center space-y-3 hover-elevate cursor-pointer bg-gradient-to-br from-ai-accent/10 to-primary/10 border-ai-accent/20">
                <div className="w-12 h-12 bg-ai-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-6 w-6 text-ai-accent" />
                </div>
                <h4 className="font-semibold">AI Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Personalized destinations just for you
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
