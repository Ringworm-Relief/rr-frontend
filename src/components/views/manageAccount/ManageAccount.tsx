import PetForm from "../petForm/PetForm"
import CreateAccount from "../createAccount/CreateAccount"
import AllPetsManagement from "./AllPetsManagement";

interface Props {
    setPets: React.Dispatch<any>;
    pets: any[];
    userId: number;
}

export default function ManageAccount({pets, setPets, userId}: Props) {
    return (
        <>
            <AllPetsManagement pets={pets} setPets={setPets} userId={userId} />
            <CreateAccount />
        </>
    )
}