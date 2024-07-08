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
  paragraphs: string[];
}

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "What is ringworm?",
    tagline: "",
    paragraphs: [
      "Ringworm is a common fungal infection that affects the skin, hair, and nails, characterized by red, circular rashes with a clearer center.",
      "Despite its name, it is not caused by a worm but by dermatophytes, a group of fungi. In pets, it often appears as patches of hair loss with a crusty surface.",
    ],
  },
  {
    id: 2,
    title: "Who can get ringworm?",
    tagline: "",
    paragraphs: [
      "Ringworm can affect a wide range of animals including dogs, cats, and even humans. Pets are particularly susceptible, especially those with compromised immune systems or young animals.",
      "Ringworm is highly contagious and can be spread from animals to humans. It is zoonotic, meaning it can be transmitted between animals and people.",
      "Ringworm is not life-threatening, but it can be uncomfortable and unsightly. It is important to treat ringworm promptly to prevent its spread and to alleviate the animal’s discomfort."
    ],
  },
  {
    id: 3,
    title: "How does ringworm spread?",
    tagline: "",
    paragraphs: [
      "Ringworm spreads through direct contact with an infected animal or person, or by touching contaminated objects like bedding, grooming tools, or furniture.",
      "The fungal spores can live on hard non-porous materials for up to 18 months, making it easy for the infection to spread.",
      "The fungal spores are spread by the hairs on an infected pet when they shed. Good hygiene and regular cleaning can help prevent the spread of ringworm in households with pets.",
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
  symptoms: string[];
};

export type Pet = {
  user_id: number;
  name: string;
  pet_type: string;
  breed: string;
  birthday: string;
  medications: Medication[];
  ringworm: Ringworm;
};

export interface ArticleAttributes {
  title: string;
  tagline: string;
  summary: string[];
  url: string;
  source: string;
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
    data: UserData;
}

interface UserData {
  id: string,
  type: string,
  attributes: UserAttributes;
}

interface UserAttributes {
    first_name: string,
    last_name: string,
    email: string
}

export function formatDate(bday: string) {
  let array = bday.split("/");
  return `${array[2]}-${array[0]}-${array[1]}`;
}

export function formateDate2(date: string) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    let array = date.split("-")

    return `${monthNames[parseInt(array[2]) - 1]} ${array[3]}, ${array[1]}`
}

export function formatDateBackwards(bday: string) {
  let array = bday.split("-")
  let newArray = array.slice(1, -1);
  return newArray.join("-");
}

export interface ForumData {
  id: string;
  type: string;
  attributes: ForumAttributes[];
}

interface ForumAttributes {
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  threads: Thread[];
}

interface Thread {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}
