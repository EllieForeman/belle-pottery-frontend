import Image from "next/image";
import Footer from "../components/footer";

interface AboutPageData {
  bioDescription: string;
  bioBoldHeadline: string;
  processDescription: string;
  profilePhoto: {
    url: string;
  };
  imageTwo: {
    url: string;
  };
  imageThree: {
    url: string;
  };
  education_and_trainings: {
    title: string;
    location: string;
    year: string;
  }[];
  exhibitions_and_collections: {
    year: string;
    title: string;
    location: string;
  }[];
  teachings: {
    title: string;
    location: string;
    year: string;
  }[];
}

export default async function AboutPage() {
  let aboutData: any = null; 

  try {
    const res = await fetch(
      "https://belle-proffitt-pottery-1ae63963fcee.herokuapp.com/api/about?populate=*",
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch about page data: ${res.status}`);
    }

    const response = await res.json();
    aboutData = response?.data || null; 
    console.log("Fetched aboutData:", aboutData);
  } catch (error) {
    console.error("Error fetching About Page data:", error);
  }

  if (!aboutData) {
    return <div>Error loading about page data. Please try again later.</div>;
  }

  const profileImage = `https://belle-proffitt-pottery-1ae63963fcee.herokuapp.com${aboutData.profilePhoto?.url}`;
  const processImage = `https://belle-proffitt-pottery-1ae63963fcee.herokuapp.com${aboutData.imageTwo?.url}`;

  const {
    bioBoldHeadline,
    bioDescription,
    processDescription,
  } = aboutData;

  return (
    <div>
      <div className="container mx-auto max-w-5.5xl p-4">
        <div className="flex flex-wrap gap-x-8 p-4 items-stretch mb-4">
          {/* About Section */}
          <div className="flex-1 basis-[calc(48%-24px)] p-4 min-h-[450px] flex flex-col mb-3">
            <h2 className="text-2xl font-bagnard">About</h2>
            <p className="mt-4 text-lg text-gray-700 leading-spacey font-bold whitespace-pre-line">
              {bioBoldHeadline}
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-spacey whitespace-pre-line">
              {bioDescription}
            </p>
          </div>

          {/* Photo 1 */}
          <div className="flex-1 basis-[calc(48%-24px)] p-4 relative min-h-[400px] flex items-center mb-3">
            <Image
              src={profileImage}
              alt="Loading..."
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top p-6"
              priority
            />
          </div>

          {/* Photo 2 */}
          <div className="flex-1 basis-[calc(48%-24px)] p-4 relative min-h-[400px] flex items-center">
            <Image
              src={processImage}
              alt="Loading..."
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center p-6"
            />
          </div>
          {/* Process Section */}
          <div className="flex-1 basis-[calc(48%-24px)] p-4 min-h-[400px] flex flex-col">
            <h2 className="text-2xl font-bagnard">Process</h2>
            <p className="mt-4 text-lg text-gray-700 whitespace-pre-line leading-spacey">
              {processDescription}
            </p>
          </div>

          {/* Dropdowns and Photo Row */}

          <div className="flex gap-x-8 items-start w-full">
            {/* Dropdowns on the Left */}
            <div className="flex-[5] p-4">
              <div className="flex flex-col gap-y-4">
                <h2 className="text-2xl font-bagnard">
                  Additional Information
                </h2>

                {/* Dropdown Menu 1 */}
                <details className="group border-b border-black py-4">
                  <summary className="flex justify-between items-center cursor-pointer">
                    <span className="text-xl">Education and Training</span>
                    <span className="text-lg font-bold group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="mt-4 text-gray-700 text-sm pl-4">
                    <ul className="list-disc mt-4 text-lg text-gray-700 leading-spacey">
                      <li>
                        <span className="font-bold">Clay College Diploma</span>,
                        Stoke on Trent,{" "}
                        <span className="italic">2022 - 2024</span>
                      </li>
                      <li>
                        <span className="font-bold">
                          First Class Honours Illustration Animation
                        </span>
                        , Kingston School of Art,{" "}
                        <span className="italic"> 2018 - 2021</span>
                      </li>
                      <li>
                        <span className="font-bold">
                          Foundation Diploma in Art and Design
                        </span>
                        , Manchester School of Art,{" "}
                        <span className="italic">2016</span>
                      </li>
                    </ul>
                  </div>
                </details>

                {/* Dropdown Menu 2 */}
                <details className="group border-b border-black py-4">
                  <summary className="flex justify-between items-center cursor-pointer">
                    <span className="text-xl   ">
                      Exhibitions and Collections
                    </span>
                    <span className="text-lg font-bold group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="space-y-8 pt-6">
                    {/* 2024 */}
                    <div>
                      <p className="text-lg font-bold text-gray-800">2024</p>
                      <ul className="list-disc pl-8 text-gray-800">
                        <li>
                          <span className="italic font-bold">
                            Graduate Showcase
                          </span>
                          , Stoke-on-Trent and London
                        </li>
                      </ul>
                    </div>

                    {/* 2023 */}
                    <div>
                      <p className="text-lg font-bold text-gray-800">2023</p>
                      <ul className="list-disc pl-8 text-gray-800">
                        <li>
                          <span className="italic font-bold">Pot Shop</span>,
                          Airspace Gallery, Stoke-on-Trent
                        </li>
                        <li>
                          <span className="italic font-bold">
                            Stoke on Clay
                          </span>
                          , Stoke-on-Trent
                        </li>
                      </ul>
                    </div>

                    {/* 2022 */}
                    <div>
                      <p className="text-lg font-bold text-gray-800">2022</p>
                      <ul className="list-disc pl-8 text-gray-800">
                        <li>
                          <span className="italic font-bold">
                            Young Artist in Residence
                          </span>
                          , Guldagergaard International Ceramic Research Centre,
                          Denmark
                        </li>
                      </ul>
                    </div>

                    {/* 2021 */}
                    <div>
                      <p className="text-lg font-bold text-gray-800">2021</p>
                      <ul className="list-disc pl-8 text-gray-800">
                        <li>
                          <span className="italic font-bold">
                            Take Her for a Caper
                          </span>
                          , hArts Lane London
                        </li>
                        <li>
                          <span className="italic font-bold">Reconnecting</span>
                          , Oxo Tower London
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>

                {/* Dropdown Menu 3 */}
                <details className="group border-b border-black py-4">
                  <summary className="flex justify-between items-center cursor-pointer">
                    <span className="text-xl   ">Teaching</span>
                    <span className="text-lg font-bold group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="mt-4 text-gray-700 text-sm pl-4">
                    <ul className="list-disc mt-4 text-lg text-gray-700 leading-spacey">
                      <li>
                        <span className="font-bold">Clay College Diploma</span>,
                        Stoke on Trent,{" "}
                        <span className="italic">2022 - 2024</span>
                      </li>
                      <li>
                        <span className="font-bold">
                          First Class Honours Illustration Animation
                        </span>
                        , Kingston School of Art,{" "}
                        <span className="italic"> 2018 - 2021</span>
                      </li>
                      <li>
                        <span className="font-bold">
                          Foundation Diploma in Art and Design
                        </span>
                        , Manchester School of Art,{" "}
                        <span className="italic">2016</span>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
            <div className="w-[300px] md:w-[400px] lg:w-[500px] h-auto p-4 flex items-center justify-center overflow-hidden">
              <Image
                src="/kiln.png"
                alt="CV Photo"
                width={500}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
