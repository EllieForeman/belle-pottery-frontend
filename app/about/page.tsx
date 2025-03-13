import Image from "next/image";
import Footer from "../components/footer";
import {
  ExhibitionsDropdown,
  ListDropdown,
  RichTextDropdown,
  TextDropdown,
} from "../components/dropdown";
import { fetchFromCMS } from "../lib/api";
const BASE_URL = process.env.NEXT_PUBLIC_CMS_BASE_URL;

export default async function AboutPage() {
  const aboutData = await fetchFromCMS("about");

  console.log("Fetched About Data:", aboutData); // Debugging

  if (!aboutData || !aboutData.data) {
    return <div>Error loading About data. Please check the API response.</div>;
  }

  const aboutInfo = aboutData.data;
  const profileImage = `${aboutInfo.profilePhoto.formats.medium.url}`;
  const bioBoldHeadline =
    aboutInfo?.bioBoldHeadline || "No headline available.";
  const bioDescription =
    aboutInfo?.bioDescription || "No description available.";
  const education = aboutInfo?.education_and_trainings || [];
  const exhibitions = aboutInfo?.exhibitions || [];
  const collections = aboutInfo?.collections || [];
  const teaching = aboutInfo?.teaching_and_others || [];
  const commissionsText = aboutInfo.comissionsText;
  const teachingText = aboutInfo.teachingText;
  const stockistsText = aboutInfo.stockistText;
  console.log("phtoo", profileImage);
  return (
    <div>
      <div className="container mx-auto mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full mb-20">
          {/* About Section */}
          <div>
            <p className="text-lg leading-spacey font-bold whitespace-pre-line my-16">
              {bioBoldHeadline}
            </p>
            <p className="mt-4 text-lg leading-spacey whitespace-pre-line">
              {bioDescription}
            </p>
          </div>

          {/* Photo */}
          <div className="relative w-100">
            <Image
              src={profileImage}
              alt="Profile Photo"
              fill
              sizes="100vw"
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
                <RichTextDropdown title="Stockists" text={stockistsText} />
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
