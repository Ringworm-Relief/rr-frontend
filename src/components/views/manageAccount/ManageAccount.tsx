// import PetForm from "../petForm/PetForm"
import CreateAccount from "../createAccount/CreateAccount"
import AllPetsManagement from "./AllPetsManagement";
import { Pets } from "../../../utils/interfaces"

interface Props {
    setPets: React.Dispatch<any>;
    pets: any[];
    user: any;
}

export default function ManageAccount({pets, setPets, user}: Props) {
    console.log("pets", pets)

    return (
        <>
            <AllPetsManagement pets={Pets.data.pets} setPets={setPets} user={user} />
            <CreateAccount />
        </>
    )
}