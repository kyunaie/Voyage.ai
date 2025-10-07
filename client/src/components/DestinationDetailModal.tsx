import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import type { Destination } from "@shared/schema";

interface DestinationDetailModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

const mockStays = [
  {
    id: "1",
    name: "Luxury Beach Resort",
    price: 8500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
  },
  {
    id: "2",
    name: "Cozy Seaside Villa",
    price: 6200,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400",
  },
  {
    id: "3",
    name: "Modern City Hotel",
    price: 4800,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
  },
];

export function DestinationDetailModal({
  destination,
  isOpen,
  onClose,
}: DestinationDetailModalProps) {
  if (!destination) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative h-64 lg:h-96">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <DialogHeader className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <DialogTitle className="text-3xl font-bold">
              {destination.name}
            </DialogTitle>
          </DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            data-testid="button-close-modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-ai-accent/10 border border-ai-accent/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">AI Travel Summary</h3>
            <p className="text-sm text-muted-foreground">
              {destination.description || 
                `${destination.name} is perfect for ${destination.category.toLowerCase()} enthusiasts. ${destination.aiReason} This ${destination.duration.toLowerCase()} trip offers the ideal balance of adventure and relaxation.`}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Top Recommended Stays</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockStays.map((stay) => (
                <Card key={stay.id} className="overflow-hidden">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-medium text-sm">{stay.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">
                        ⭐ {stay.rating}
                      </span>
                      <span className="font-semibold text-sm">
                        ₹{stay.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Button className="w-full" size="lg" data-testid="button-book-now">
            Book Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
