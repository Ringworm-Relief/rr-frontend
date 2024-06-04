import { Pet, Ringworm, Medication } from "../utils/interfaces";

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

// function postMedication(medication: Medication) {
//     return fetch("https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pet_medications", {
//         method: 'POST',
//         headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `${localStorage.getItem('token')}`
//          },
//         body: JSON.stringify(medication)
//     })
//     .then(res => res.json());
// }

// function postRingworm(ringworm: Ringworm) {
//     return fetch("https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pet_ringworms", {
//         method: 'POST',
//         headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(ringworm)
//     })
//     .then(res => res.json());
// }

// function patchPet(pet: Pet) {
//     return fetch(`https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/pets/${pet.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(pet)
//     })
//     .then(res => res.json());
// }

// function patchRingworm(ringworm: Ringworm) {
//     return fetch(`https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/pet_ringworms/${ringworm.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(ringworm)
//     })
//     .then(res => res.json());
// }

// function patchMedication(medication: Medication) {
//     return fetch(`https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/pet_medications/${medication.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(medication)
//     })
//     .then(res => res.json());

// }


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

export { postPet, fetchPets };
