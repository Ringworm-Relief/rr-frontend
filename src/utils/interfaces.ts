export interface Service {
  name: string;
  description: string;
}

export const services: Service[] = [
  {
    name: "Education",
    description:
      "Sometimes the information needed is not readily available. We provide the information you need to make informed decisions.",
  },
  {
    name: "Treatment tracking",
    description:
      "Tracking a pets ringworm treatment can be a hassle. We provide a platform to help you keep track of your pets treatment without cluttering other calendars.",
  },
  {
    name: "Support",
    description:
      "Message your vet directly with any questions or concerns you may have. Or view your pets latest fungal results.",
  },
];

export interface EducationCategory {
  category: string;
  type: string;
  description: string;
}

export const educationCategories: EducationCategory[] = [
  {
    category: "Cleaning",
    type: "cleaning",
    description:
      "Thorough and regularly cleaning is necessary for defeating ringworm. Browse cleaning articles here.",
  },
  {
    category: "Treatments",
    type: "medical",
    description:
      "There are lots of treatments available for ringworm. Learn about the options out there for you and your furry friends.",
  },
  {
    category: "General Info",
    type: "general",
    description:
      "Ringworm can be scary and overwhelming. Here we provide some general articles to breakdown the main need-to-knows.",
  },
];

export interface Article {
  id: number;
  title: string;
  tagline: string;
  source: string;
  paragraphs: string[];
}

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "Ringworm in Dogs",
    tagline:
      "Ringworm is a common fungal infection that affects dogs and cats.",
    source: "https://www.akc.org/expert-advice/health/ringworm-in-dogs/",
    paragraphs: [
      "Ringworm is a common fungal infection that affects dogs and cats. The name is a bit misleading, as the disease is not caused by a worm, but by a fungus. The term “ringworm” refers to the circular, ring-like lesions that form on an animal’s skin.",
      "Ringworm is highly contagious and can be spread from animals to humans. It is zoonotic, meaning it can be transmitted between animals and people. Ringworm is not life-threatening, but it can be uncomfortable and unsightly. It is important to treat ringworm promptly to prevent its spread and to alleviate the animal’s discomfort.",
    ],
  },
  {
    id: 2,
    title: "Ringworm in Cats",
    tagline:
      "Ringworm is a common fungal infection that affects dogs and cats.",
    source: "https://www.akc.org/expert-advice/health/ringworm-in-cats/",
    paragraphs: [
      "Ringworm is a common fungal infection that affects dogs and cats. The name is a bit misleading, as the disease is not caused by a worm, but by a fungus. The term “ringworm” refers to the circular, ring-like lesions that form on an animal’s skin.",
      "Ringworm is highly contagious and can be spread from animals to humans. It is zoonotic, meaning it can be transmitted between animals and people. Ringworm is not life-threatening, but it can be uncomfortable and unsightly. It is important to treat ringworm promptly to prevent its spread and to alleviate the animal’s discomfort.",
    ],
  },
  {
    id: 3,
    title: "Ringworm in Horses",
    tagline: "Ringworm is a common fungal infection that affects horses.",
    source: "https://www.akc.org/expert-advice/health/ringworm-in-horses/",
    paragraphs: [
      "Ringworm is a common fungal infection that affects horses. The name is a bit misleading, as the disease is not caused by a worm, but by a fungus. The term “ringworm” refers to the circular, ring-like lesions that form on an animal’s skin.",
      "Ringworm is highly contagious and can be spread from animals to humans. It is zoonotic, meaning it can be transmitted between animals and people. Ringworm is not life-threatening, but it can be uncomfortable and unsightly. It is important to treat ringworm promptly to prevent its spread and to alleviate the animal’s discomfort.",
    ],
  },
];

export interface NewUser {
  data: Data;
}

export interface Data {
  type: string;
  attributes: Attributes;
}

export interface Attributes {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type Medication = {
  name: string;
  medication_type: string;
  dosage: string;
  frequency: string;
};

export type Ringworm = {
  ringworm_type: string;
  diagnosis_date: string;
};

export type Pet = {
  user_id: number;
  name: string;
  pet_type: string;
  breed: string;
  birthday: string;
  symptoms: string[];
  medications: Medication[];
  ringworm: Ringworm;
};

export const Pets = {
  data: {
    user_id: 153,
    pets: [
      {
        id: 1,
        name: "keoki",
        type: "Dog",
        breed: "labradoodle",
        birthday: "2015-05-05",
        medications: [{
          type: "Topical",
          name: "ringworm cream1",
          dosage: "10 mg",
          frequency: "Daily",
        }],
        ringworm: {
          ringworm_type: "Trichophyton mentagrophytes",
          diagnosis_date: "2015-05-05",
          symptoms: ["itchy skin", "excessive licking"],
        },
      },
      {
        id: 2,
        name: "koki",
        type: "Cat",
        breed: "labradoodle",
        birthday: "2015-05-05",
        medications: [
          {
            type: "Topical",
            name: "ringworm cream2",
            dosage: "10 mg",
            frequency: "Daily",
          },
          {
            type: "Topical",
            name: "ringworm cream2",
            dosage: "10 mg",
            frequency: "Daily",
          },
          {
            type: "Oral",
            name: "ringworm oral2",
            dosage: "10 mg",
            frequency: "Daily",
          },
        ],
        ringworm: {
          ringworm_type: "Trichophyton mentagrophytes",
          diagnosis_date: "2015-05-05",
          symptoms: ["itchy skin", "excessive licking"],
        },
      },
    ],
  },
};

export const user: NewUser[] = [
  {
    data: {
      type: "users",
      attributes: {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@email.com",
        password: "password",
      },
    },
  },
];
export interface ArticleAttributes {
  title: string;
  tagline: string;
  summary: string[];
}

export interface EducationArticle {
  id: string;
  category: string;
  attributes: ArticleAttributes;
}

export interface EducationArtCardProps {
  title: string;
  tagline: string;
  id: string;
  savedArticles: string[];
  isSaved: boolean;
  handleSaves: (id: string) => void;
  handleClick: (id: string) => void;
}

export interface EducationCategoryProps {
  savedArticles: string[];
  handleSaves: (id: string) => void;
}

export interface SavedArticlesProps {
  savedArticles: string[];
  handleSaves: (id: string) => void;
}

export interface ArticleParams {
  [key: string]: string | undefined;
}

export interface RouteParams {
  [key: string]: string | undefined;
}

export interface User {
  id: string;
  token: string;
  email: string;
  // password: string;
}

export function formatDate(bday: string) {
  let array = bday.split("/");
  return `${array[2]}-${array[0]}-${array[1]}`;
}
