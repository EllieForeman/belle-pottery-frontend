import Image from "next/image";
import Footer from "../components/footer";

const AboutPage = () => {
  return (
    <div>
      <div className="container mx-auto max-w-5.5xl p-4">
        <div className="flex flex-wrap gap-x-8 p-4 items-stretch mb-4">
          {/* About Section */}
          <div className="flex-1 basis-[calc(48%-24px)] p-4 min-h-[450px] flex flex-col mb-3">
            <h2 className="text-2xl font-bagnard">About</h2>
            <p className="mt-4 text-lg text-gray-700 leading-spacey font-bold">
              Isabelle is a potter living and working in Bristol, specialising
              in hand built and something something.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-spacey">
              Isabelle's background is drawing based and she has a First Class
              Honours degree from Kingston School of Art. During her time in
              Kingston, Isabelle’s practice soon became centred around clay and
              in 2022, she moved to Stoke-on-Trent to train in studio pottery
              for two years at Clay College. Alongside making her own work,
              Isabelle works as a pottery technician and teaches both throwing
              and hand-building to beginner and more experienced potters.
            </p>
          </div>

          {/* Photo 1 */}
          <div className="flex-1 basis-[calc(48%-24px)] p-4 relative min-h-[400px] flex items-center mb-3">
            <Image
              src="/headshot1.png"
              alt="Loading..."
              fill
              className="object-cover object-top p-6"
            />
          </div>

          {/* Photo 2 */}
          <div className="flex-1 basis-[calc(48%-24px)] p-4 relative min-h-[400px] flex items-center">
            <Image
              src="/headshot2.png"
              alt="Loading..."
              fill
              className="object-cover object-center p-6"
            />
          </div>

          {/* Process Section */}
          <div className="flex-1 basis-[calc(48%-24px)] p-4 min-h-[400px] flex flex-col">
            <h2 className="text-2xl font-bagnard">Process</h2>
            <p className="mt-4 text-lg text-gray-700 leading-spacey">
              As much as I shape clay, clay is what shapes me, and influences
              how I interact with it as a material. I approach my making with
              curiosity and play, paying close attention to how the clay
              responds to my hands and tools. I consider how I might encourage
              the marks of impressed stamps to sweep or fly across a stretched
              slab of porcelain, or how waves of clay might ripple up a wooden
              rib.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-spacey">
              I seek to capture a lively and natural loose energy in my work and
              I draw greatly from surface quality. Whether throwing or hand
              building my aim is the same: to capture a sense of movement. The
              marks that I impress, stretch and cut help to instil a sense of me
              into the pots I make.
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

            {/* Photo on the Right */}
            {/* <div className="flex-[5] p-4 relative min-h-[600px] flex items-center">
            <Image
              src="/kiln.png"
              alt="CV Photo"
              fill
              className="object-cover object-center p-6"
            />
          </div> */}
            <div className="w-[300px] md:w-[400px] lg:w-[500px] h-auto p-4 flex items-center justify-center overflow-hidden">
              <Image
                src="/kiln.png"
                alt="CV Photo"
                layout="intrinsic"
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
};

export default AboutPage;
