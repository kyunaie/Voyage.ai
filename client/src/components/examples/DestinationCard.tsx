import { DestinationCard } from "../DestinationCard";
import beachImg from "@assets/stock_images/beautiful_beach_dest_1f26de4d.jpg";

export default function DestinationCardExample() {
  const destination = {
    id: "1",
    name: "Varkala, Kerala",
    location: "Kerala, India",
    imageUrl: beachImg,
    duration: "4 Days / 3 Nights",
    price: 18000,
    category: "Beach",
    aiReason: "Because you loved beaches and calm getaways",
    description: "Best for solo travelers seeking tranquility.",
  };

  return (
    <div className="p-8 max-w-sm">
      <DestinationCard
        destination={destination}
        onLike={(id) => console.log("Liked:", id)}
        onSkip={(id) => console.log("Skipped:", id)}
        onViewStays={(dest) => console.log("View stays:", dest.name)}
      />
    </div>
  );
}
