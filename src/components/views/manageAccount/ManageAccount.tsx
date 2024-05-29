import PetForm from "../petForm/PetForm"
import CreateAccount from "../createAccount/CreateAccount"
import AllPetsManagement from "./AllPetsManagement";

interface Props {
    setPets: React.Dispatch<any>;
    pets: any[];
}

export default function ManageAccount({pets, setPets}: Props) {
    return (
        <>
            <AllPetsManagement pets={pets} setPets={setPets} />
            <CreateAccount />
        </>
    )
}