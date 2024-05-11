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

// export interface NewUser {
//     attributes: Attributes;
// }