import Image from "next/image";

const mockImages = [
  { id: 1, src: "/Grump.png", alt: "Ceramic Vase" },
  { id: 2, src: "/Grump.png", alt: "Clay Mug" },
  { id: 3, src: "/Grump.png", alt: "Pottery Bowl" },
  { id: 4, src: "/Grump.png", alt: "Sculpted Dish" },
  { id: 5, src: "/Grump.png", alt: "Handmade Plate" },
];

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockImages.map((image) => (
          <div key={image.id} className="relative w-full h-64">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
