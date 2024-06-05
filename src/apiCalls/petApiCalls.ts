import { Pet } from "../utils/interfaces";

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
