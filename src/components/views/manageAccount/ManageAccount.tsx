// import PetForm from "../petForm/PetForm"
import CreateAccount from "../createAccount/CreateAccount"
import AllPetsManagement from "./AllPetsManagement";

interface Props {
    setPets: React.Dispatch<any>;
    pets: any[];
    user: any;
}

export default function ManageAccount({pets, setPets, user}: Props) {
    return (
        <>
            <AllPetsManagement pets={pets} setPets={setPets} user={user} />
            <CreateAccount />
        </>
    )
}