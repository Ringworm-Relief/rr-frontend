import { Pet, Medication, Ringworm } from "../utils/interfaces";

function postPet(pet: Pet) {
    return fetch("https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets", {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
         },
        body: JSON.stringify(pet)
    })
    .then(res => res.json());
}

function postMedication(medication: Medication) {
    return fetch("https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pet_medications", {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
         },
        body: JSON.stringify(medication)
    })
    .then(res => res.json());
}

function postRingworm(ringworm: Ringworm) {
    return fetch("https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pet_ringworms", {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(ringworm)
    })
    .then(res => res.json());
}

export { postPet, postMedication, postRingworm };
