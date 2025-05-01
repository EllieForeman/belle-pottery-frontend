import Image from "next/image";
import { fetchFromCMS } from "@/app/lib/api"; // Adjust path if needed
import HeroFade from "./components/heroFade";

export default async function Home() {
  const res = await fetchFromCMS("large-home-image");

  const imageUrl = res?.data?.homeImage.url || null;
  console.log("res", res, imageUrl);
  return (
    <div className="relative min-h-screen flex flex-col">
      <HeroFade imageUrl={imageUrl} />
      {imageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={imageUrl}
            alt="Hero"
            fill
            priority
            className="object-cover object-[50%_40%]"
          />
        </div>
      )}
    </div>
  );
}
