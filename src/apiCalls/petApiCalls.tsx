interface Pet {
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

function postPet(pet: Pet) {
    return fetch("https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/pets", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet)
    })
    .then(res => {
      
        res.json()})
}

export default postPet