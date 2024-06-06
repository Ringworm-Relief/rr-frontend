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


function putPet(pet: any, id: any) {
    return fetch(`https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `${localStorage.getItem('token')}` 
         },
        body: JSON.stringify(pet)
    })
}

function putRingworm(ringworm: any, id: any) {
    return fetch(`https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets/${id}/ringworms`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(ringworm)
    })
}

function putMedications(medication: any, id: any) {
    return fetch(`https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets/${id}`, {
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

export { postPet, fetchPets, putPet, putRingworm };
