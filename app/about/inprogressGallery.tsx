import { fetchFromCMS } from "../lib/api";
import InProgressGalleryClient from "./inprogresssGalleryClient";

export default async function InProgressGallery() {
  const galleryImages = await fetchFromCMS("in-progress-gallery");
  const images = galleryImages?.data?.InProgressGallery;

  if (!images || images.length === 0) {
    return null;
  }

  return <InProgressGalleryClient images={images} />;
}
