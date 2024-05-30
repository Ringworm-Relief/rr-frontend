import { useEffect, useState } from "react";

interface Props {
    pet: any;
}

export default function PetDashboard({pet}: Props) {
    // const [targetPet, setTargetPet] = useState<any>(null)

    // useEffect(() => {
    //     const petName = window.location.pathname.split("/").pop()
    //     console.log(petName)
    //     const target = pets.find(pet => pet.name === petName)
    //     console.log(target)
    //     setTargetPet(target)
    //     console.log(targetPet)
    // }, [])

    return (
        <div className="pet-dashboard">
            <h1>{pet.name}</h1>
        </div>
    )
}