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
  return (
    <div className="w-full sm:w-[95%] max-w-[1500px] mx-auto px-4 sm:px-2 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-16 w-full mb-8 sm:mb-12">
        {/* About Section */}
        <div className="order-2 md:order-1 mt-4 sm:mt-0">
          <p className="text-lg leading-spacey font-bold whitespace-pre-line md:mt-8 md:mb-12">
            {bioBoldHeadline}
          </p>
          <p className="mt-4 text-lg leading-spacey whitespace-pre-line">
            {bioDescription}
          </p>
        </div>

        {/* Photo */}
        <div className="order-1 md:order-2 relative w-full h-full">
          <Image
            src={profileImage}
            alt="Profile Photo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Dropdown and Photo Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-36 w-full">
        {(commissionsText || teachingText || stockistsText) && (
          <div>
            <h2 className="text-2xl sm:mt-20 md:mt-0 underline decoration-1 mb-4 underline-offset-4">
              Contact & Enquiries
            </h2>
            {commissionsText && (
              <TextDropdown
                title="Commissions"
                text={commissionsText}
                open={false}
              />
            )}
            {teachingText && (
              <TextDropdown title="Teaching" text={teachingText} open={false} />
            )}
            {stockistsText && (
              <RichTextDropdown
                title="Stockists"
                text={stockistsText}
                open={false}
              />
            )}
          </div>
        )}
        <div>
          {(education?.length > 0 ||
            exhibitions?.length > 0 ||
            collections?.length > 0 ||
            teaching?.length > 0) && (
            <h2 className="text-2xl underline mb-4 underline-offset-4 decoration-1 mt-8 md:mt-0">
              CV
            </h2>
          )}
          {education?.length > 0 && (
            <ListDropdown title="Education & Training" items={education} />
          )}
          {(exhibitions?.length > 0 || collections?.length > 0) && (
            <ExhibitionsDropdown
              title="Exhibitions and Collections"
              exhibitions={exhibitions}
              collections={collections}
            />
          )}
          {teaching?.length > 0 && (
            <ListDropdown title="Teaching & Other Work" items={teaching} />
          )}
        </div>
      </div>
    </div>
  );
}
