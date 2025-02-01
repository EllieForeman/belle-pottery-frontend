import Image from "next/image";
import Footer from "../components/footer";
import {
  ExhibitionsDropdown,
  ListDropdown,
  TextDropdown,
} from "../components/dropdown";

async function fetchAboutData() {
  const res = await fetch(
    "https://belle-proffitt-pottery-1ae63963fcee.herokuapp.com/api/about?populate=*",
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch about page data: ${res.status}`);
  }

  const response = await res.json();
  return response?.data;
}

export default async function AboutPage() {
  let aboutData;
  try {
    aboutData = await fetchAboutData();
  } catch (error) {
    console.error("Error fetching About Page data:", error);
    aboutData = null; // Fallback in case of fetch failure
  }
  console.log("aboutData", aboutData);

  const profileImage = `https://belle-proffitt-pottery-1ae63963fcee.herokuapp.com${aboutData.profilePhoto.url}`;

  const bioBoldHeadline =
    aboutData?.bioBoldHeadline || "No headline available.";
  const bioDescription =
    aboutData?.bioDescription || "No description available.";
  const education = aboutData?.education_and_trainings || [];
  const exhibitions = aboutData?.exhibitions || [];
  const collections = aboutData?.collections || [];
  const teaching = aboutData?.teaching_and_others || [];
  const commissionsText = aboutData.comissionsText;
  const teachingText = aboutData.teachingText;
  const stockistsText = aboutData.stockistText;
  console.log("phtoo", stockistsText);
  return (
    <div>
      <div className="container mx-auto mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full mb-20">
          {/* About Section */}
          <div className="">
            <p className="text-lg leading-spacey font-bold whitespace-pre-line my-16">
              {bioBoldHeadline}
            </p>
            <p className="mt-4 text-lg leading-spacey whitespace-pre-line">
              {bioDescription}
            </p>
          </div>

          {/* Photo */}
          <div className="relative">
            <Image
              src={profileImage}
              alt="Profile Photo"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* Dropdown and Photo Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-36 w-full mt-8 mb-20">
          <div className="">
            <h2 className="text-2xl underline mb-4 underline-offset-4 decoration-1">
              CV
            </h2>
            <ListDropdown title="Education & Training" items={education} />
            <ExhibitionsDropdown
              title="Exhibitions and Collections"
              exhibitions={exhibitions}
              collections={collections}
            />
            <ListDropdown title="Teaching & Other Work" items={teaching} />
          </div>
          {(commissionsText || teachingText || stockistsText) && (
            <div>
              <h2 className="text-2xl mt-20 md:mt-0 underline decoration-1 mb-4 underline-offset-4">
                Contact & Enquiries
              </h2>
              {commissionsText && (
                <TextDropdown title="Commissions" text={commissionsText} />
              )}
              {teachingText && (
                <TextDropdown title="Teaching" text={teachingText} />
              )}
              {stockistsText && (
                <TextDropdown title="Stockists" text={stockistsText} />
              )}
            </div>
          )}
          ;
        </div>
      </div>
      <Footer />
    </div>
  );
}
