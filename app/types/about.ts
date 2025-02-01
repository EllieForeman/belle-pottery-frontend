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
