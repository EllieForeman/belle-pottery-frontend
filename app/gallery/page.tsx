import Image from "next/image";
import { fetchFromCMS } from "../lib/api";

const galleryImages = await fetchFromCMS("image-galley");

export default function GalleryPage() {
  console.log("gallery", galleryImages.data.Gallery);
  return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-12">
          {galleryImages.data.Gallery.map((image: any) => (
            <div key={image.id} className="relative w-full aspect-[3/4]">
              <Image
                src={image.url}
                alt={image.alt || "image of Belle's work"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

  );
}
