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

export const mockForumData: ForumData[] = [
  {
    "id": "1",
    "type": "cleaning",
    "attributes": [
      {
        "title": "How to clean hardwood floors?",
        "content": "What's the best way to clean and maintain hardwood floors?",
        "user_id": "user1",
        "created_at": "2024-06-10T08:30:00Z",
        "threads": [
          {
            "id": "thread1",
            "content": "I use a mixture of vinegar and water. Works great!",
            "user_id": "user2",
            "created_at": "2024-06-10T09:00:00Z"
          },
          {
            "id": "thread2",
            "content": "Make sure not to use too much water, it can damage the wood.",
            "user_id": "user3",
            "created_at": "2024-06-10T09:15:00Z"
          }
        ]
      },
      {
        "title": "Best products for cleaning windows?",
        "content": "What are some recommended products for streak-free window cleaning?",
        "user_id": "user4",
        "created_at": "2024-06-11T10:00:00Z",
        "threads": [
          {
            "id": "thread3",
            "content": "I always use Windex, never fails!",
            "user_id": "user5",
            "created_at": "2024-06-11T10:30:00Z"
          },
          {
            "id": "thread4",
            "content": "Try using newspaper instead of paper towels for wiping.",
            "user_id": "user6",
            "created_at": "2024-06-11T10:45:00Z"
          }
        ]
      }
    ]
  },
  {
    "id": "2",
    "type": "treatment",
    "attributes": [
      {
        "title": "Effective remedies for headaches?",
        "content": "What are some quick ways to get rid of a headache?",
        "user_id": "user7",
        "created_at": "2024-06-12T11:00:00Z",
        "threads": [
          {
            "id": "thread5",
            "content": "I find that drinking water and resting in a dark room helps.",
            "user_id": "user8",
            "created_at": "2024-06-12T11:30:00Z"
          },
          {
            "id": "thread6",
            "content": "Peppermint oil on the temples works wonders for me.",
            "user_id": "user9",
            "created_at": "2024-06-12T11:45:00Z"
          }
        ]
      },
      {
        "title": "Home treatments for cold sores?",
        "content": "Any tips on how to quickly heal cold sores?",
        "user_id": "user10",
        "created_at": "2024-06-13T12:00:00Z",
        "threads": [
          {
            "id": "thread7",
            "content": "Applying aloe vera gel can help soothe and heal faster.",
            "user_id": "user11",
            "created_at": "2024-06-13T12:30:00Z"
          },
          {
            "id": "thread8",
            "content": "Lysine supplements have been effective for me.",
            "user_id": "user12",
            "created_at": "2024-06-13T12:45:00Z"
          }
        ]
      }
    ]
  },
  {
    "id": "3",
    "type": "general",
    "attributes": [
      {
        "title": "Best books to read in 2024?",
        "content": "Any recommendations for must-read books this year?",
        "user_id": "user13",
        "created_at": "2024-06-14T13:00:00Z",
        "threads": [
          {
            "id": "thread9",
            "content": "I loved 'The Silent Patient' by Alex Michaelides.",
            "user_id": "user14",
            "created_at": "2024-06-14T13:30:00Z"
          },
          {
            "id": "thread10",
            "content": "Try 'Where the Crawdads Sing' by Delia Owens.",
            "user_id": "user15",
            "created_at": "2024-06-14T13:45:00Z"
          }
        ]
      },
      {
        "title": "Tips for a successful garden?",
        "content": "What are some tips for maintaining a healthy garden?",
        "user_id": "user16",
        "created_at": "2024-06-15T14:00:00Z",
        "threads": [
          {
            "id": "thread11",
            "content": "Regular watering and weeding are key.",
            "user_id": "user17",
            "created_at": "2024-06-15T14:30:00Z"
          },
          {
            "id": "thread12",
            "content": "Use compost to enrich your soil.",
            "user_id": "user18",
            "created_at": "2024-06-15T14:45:00Z"
          }
        ]
      }
    ]
  }
  
  
]