import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="container p-4">
      <div className="flex flex-wrap gap-4 p-4 items-stretch">
        <div className="flex-1 basis-[calc(50%-16px)] p-4">
          <p className="mt-4 text-lg text-gray-700">
            Her background is drawing based and she has a First Class Honours
            degree from Kingston School of Art. During her time in Kingston,
            Isabelle’s practice soon became centred around clay and in 2022, she
            moved to Stoke-on-Trent to train in studio pottery for two years at
            Clay College. Alongside making her own work, Isabelle works as a
            pottery technician and teaches throwing and hand-building to both
            beginner and more experienced potters.
          </p>
        </div>
        <div className="flex-1 basis-[calc(50%-16px)] p-4 relative">
          <Image
            src="/loadingPage.png"
            alt="Loading..."
            fill
            className="object-cover rounded"
          />
        </div>
        <div className="flex-1 basis-[calc(50%-16px)] p-4">Box 3</div>
        <div className="flex-1 basis-[calc(50%-16px)] p-4">Box 4</div>
      </div>
    </div>
  );
};

export default AboutPage;
