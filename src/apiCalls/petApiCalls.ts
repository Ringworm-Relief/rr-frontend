import { Pet, Ringworm,  } from "../utils/interfaces";

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


function putPet(pet: any, id: number | string) {
    return fetch(`https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `${localStorage.getItem('token')}` 
         },
        body: JSON.stringify(pet)
    })
}

function putRingworm(ringworm: Ringworm, id: number | string) {
    return fetch(`https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets/${id}/ringworms`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(ringworm)
    })
}


function putMedications(medication: any, id: number | string) {
    return fetch(`https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets/${id}/medications`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(medication)
    })
}

function fetchPets(id: string) {
    return fetch(`https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets?user_id=${id}`,
    {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem('token')}` 
        }
    }
    )
    .then((response) => {
        return response.json();
    })
}

function postMed(medication: any) {
    return fetch(`https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pet_medications`,
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(medication)
        })
}

export { postPet, fetchPets, putPet, putRingworm, putMedications, postMed };
