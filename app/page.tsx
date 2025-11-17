import Image from "next/image";
import HeroFade from "./components/heroFade";
import { fetchFromCMS } from "./lib/api";

export default async function Home() {
  const res = await fetchFromCMS("large-home-image");
  const imageUrl = res?.data?.homeImage.url || null;

  return (
    <div className="relative min-h-screen flex flex-col">
      {imageUrl && <HeroFade imageUrl={imageUrl} />}
      {imageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            aria-hidden="true"
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
