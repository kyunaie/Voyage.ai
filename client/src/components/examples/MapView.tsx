import { MapView } from "../MapView";
import beachImg from "@assets/stock_images/beautiful_beach_dest_1f26de4d.jpg";
import mountainImg from "@assets/stock_images/mountain_landscape_a_7f0cf1fb.jpg";

export default function MapViewExample() {
  const destinations = [
    {
      id: "1",
      name: "Varkala, Kerala",
      location: "Kerala, India",
      imageUrl: beachImg,
      duration: "4 Days / 3 Nights",
      price: 18000,
      category: "Beach",
      aiReason: "Because you loved beaches and calm getaways",
      description: "Best for solo travelers seeking tranquility.",
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
      description: "Perfect for adventure enthusiasts.",
    },
  ];

  return (
    <div className="p-8 h-[600px]">
      <MapView
        destinations={destinations}
        onDestinationSelect={(dest) => console.log("Selected:", dest.name)}
      />
    </div>
  );
}
