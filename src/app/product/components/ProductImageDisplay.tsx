import { GenericCard } from "@/components/shared/GenericCard";

const data = [
  {
    category: "Women",
    description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
    src: "/images/categories/women.jpeg",
    alt: "A woman wearing a dress"
  },
  {
    category: "Swimsuits",
    description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
    src: "/images/categories/swimsuit.jpeg",
    alt: "A woman wearing a swimsuit reading a magazine"
  },
  {
    category: "Watches",
    description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
    src: "/images/categories/watches.jpeg",
    alt: "A woman wearing a swimsuit reading a magazine"
  }
];

export function ProductImageDisplay() {
  return (
    <div className="flex overflow-auto w-full">
      {data.map((entry, index) => (
        <GenericCard
          key={index}
          src={entry.src}
          alt={entry.alt}
          className="rounded-none"
        />
      ))}
    </div>
  );
}
