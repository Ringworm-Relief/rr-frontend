export interface Service {
    name: string;
    description: string;
}

export const services: Service[] = [
    {
        name: 'Education',
        description: 'Sometimes the information needed is not readily available. We provide the information you need to make informed decisions.'
    },
    {
        name: 'Treatment tracking',
        description: 'Tracking a pets ringworm treatment can be a hassle. We provide a platform to help you keep track of your pets treatment without cluttering other calendars.'
    },
    {
        name: 'Support',
        description: 'Message your vet directly with any questions or concerns you may have. Or view your pets latest fungal results.'
    }
];

export interface EducationCategory {
    category: string;
    type: string;
    description: string;
}

export const educationCategories: EducationCategory[] = [
    {
        category: 'Cleaning',
        type: "cleaning",
        description: 'Thorough and regularly cleaning is necessary for defeating ringworm. Browse cleaning articles here.'
    },
    {
        category: 'Treatments',
        type: "medical",
        description: 'There are lots of treatments available for ringworm. Learn about the options out there for you and your furry friends.'
    },
    {
        category: 'General Info',
        type: "general",
        description: 'Ringworm can be scary and overwhelming. Here we provide some general articles to breakdown the main need-to-knows.'
    }
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
        title: 'Ringworm in Dogs',
        tagline: 'Ringworm is a common fungal infection that affects dogs and cats.',
        source: 'https://www.akc.org/expert-advice/health/ringworm-in-dogs/',
        paragraphs: [
            'Ringworm is a common fungal infection that affects dogs and cats. The name is a bit misleading, as the disease is not caused by a worm, but by a fungus. The term “ringworm” refers to the circular, ring-like lesions that form on an animal’s skin.',
            'Ringworm is highly contagious and can be spread from animals to humans. It is zoonotic, meaning it can be transmitted between animals and people. Ringworm is not life-threatening, but it can be uncomfortable and unsightly. It is important to treat ringworm promptly to prevent its spread and to alleviate the animal’s discomfort.'
        ]
    },
    {
        id: 2,
        title: 'Ringworm in Cats',
        tagline: 'Ringworm is a common fungal infection that affects dogs and cats.',
        source: 'https://www.akc.org/expert-advice/health/ringworm-in-cats/',
        paragraphs: [
            'Ringworm is a common fungal infection that affects dogs and cats. The name is a bit misleading, as the disease is not caused by a worm, but by a fungus. The term “ringworm” refers to the circular, ring-like lesions that form on an animal’s skin.',
            'Ringworm is highly contagious and can be spread from animals to humans. It is zoonotic, meaning it can be transmitted between animals and people. Ringworm is not life-threatening, but it can be uncomfortable and unsightly. It is important to treat ringworm promptly to prevent its spread and to alleviate the animal’s discomfort.'
        ]
    },
    {
        id: 3,
        title: 'Ringworm in Horses',
        tagline: 'Ringworm is a common fungal infection that affects horses.',
        source: 'https://www.akc.org/expert-advice/health/ringworm-in-horses/',
        paragraphs: [
            'Ringworm is a common fungal infection that affects horses. The name is a bit misleading, as the disease is not caused by a worm, but by a fungus. The term “ringworm” refers to the circular, ring-like lesions that form on an animal’s skin.',
            'Ringworm is highly contagious and can be spread from animals to humans. It is zoonotic, meaning it can be transmitted between animals and people. Ringworm is not life-threatening, but it can be uncomfortable and unsightly. It is important to treat ringworm promptly to prevent its spread and to alleviate the animal’s discomfort.'
        ]
    }
]

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


export type Pet = {
    user_id: number,
    pet_name: string,
    pet_type: string,
    pet_breed: string,
    pet_birthday: string,
    pet_symptoms: string[],
    medication_type: string,
    medication_name: string,
    medication_dosage: string,
    medication_frequency: string,
    ringworm_type: string,
    ringworm_diagnosis_date: string
}

export const Pets: Pet[] = [
    {
        user_id: 1,
        pet_name: 'Alfred',
        pet_type:'Dog',
        pet_breed: 'Golden Retriever',
        pet_birthday: '05/05/2015',
        pet_symptoms: ['Itching', 'Hair loss', 'Redness'],
        medication_type: 'Oral',
        medication_name: 'Griseofulvin',
        medication_dosage: '250mg',
        medication_frequency: 'Daily',
        ringworm_type: 'M. Canis',
        ringworm_diagnosis_date: '05/05/2021'
    },
    {
        user_id: 1,
        pet_name: 'Bella',
        pet_type:'Cat',
        pet_breed: 'Siamese',
        pet_birthday: '05/05/2015',
        pet_symptoms: ['Itching', 'Hair loss', 'Redness'],
        medication_type: 'Oral',
        medication_name: 'Griseofulvin',
        medication_dosage: '250mg',
        medication_frequency: 'Daily',
        ringworm_type: 'M. Canis',
        ringworm_diagnosis_date: '05/05/2021'
    },
    {
        user_id: 1,
        pet_name: 'Charlie',
        pet_type:'Dog',
        pet_breed: 'Thoroughbred',
        pet_birthday: '05/05/2015',
        pet_symptoms: ['Itching', 'Hair loss', 'Redness'],
        medication_type: 'Oral',
        medication_name: 'Griseofulvin',
        medication_dosage: '250mg',
        medication_frequency: 'Daily',
        ringworm_type: 'M. Canis',
        ringworm_diagnosis_date: '05/05/2021'
    
    }
]


export const user: NewUser[] = [
    {
        data: {
            type: 'users',
            attributes: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@email.com',
                password: 'password'
            }
        }
    }
]




export interface Event {
    Id: number;
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    IsAllDay: boolean;
    Description?: string;
    Location?: string;
} 

// export const events: Event[] = [
//     {
//         Subject: "test",
//         Id: 1,
//         StartTime: "2024-05-17T08:00:00.000Z",
//         EndTime: "2024-05-17T08:30:00.000Z",
//         "IsAllDay": false
//     }
// ]

export interface ArticleAttributes {
    title: string,
    tagline: string,
    summary: string[]
}

export interface EducationArticle {
    id: string,
    category: string,
    attributes: ArticleAttributes
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

