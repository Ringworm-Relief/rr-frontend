// import PetForm from "../petForm/PetForm"
import CreateAccount from "../createAccount/CreateAccount"
// import AllPetsManagement from "../managePets/AllPetsManagement";

interface Props {
    user: any;
}

export default function ManageAccount({ user}: Props) {
    return (
        <>
            {/* <AllPetsManagement pets={pets} setPets={setPets} user={user} /> */}
            <CreateAccount />
        </>
    )
}