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