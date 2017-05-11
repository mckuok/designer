export interface Bio {
  basics: {
    name: string;
    label: string;
    picture: string;
    email: string;
    phone: string;
    website: string;
    summary: string;
    location: {
      address: string;
      postalCode: string;
      city: string;
      countryCode: string;
      region: string;
    };
    profiles: {
      network: string;
      username: string;
      url: string;
    }[];
  }

  interests: {
    name: string;
    keywords: string[];
  }[];

  skills: {
    name: string;
    level: string;
    keywords: string[];
  }[];

  education:{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    gpa: string;
    courses: string[];
  }

  work: {
    company: string;
    position: string;
    website: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
  }[];

  volunteer: {
    organization: string;
    website: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
  }[];

  awards: {
    title: string;
    date: string;
    awarder: string;
    summary: string;
  }[];

  references: {
    name: string;
    reference: string;
  }[]
}
