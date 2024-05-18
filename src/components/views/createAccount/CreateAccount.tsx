import { useState } from "react";
import { NewUser } from "../../../utils/interfaces";
import { postNewUser } from "../../../apiCalls/userApiCalls";
import {
  Box,
  Stack,
  InputLabel,
  OutlinedInput,
  FormControl,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../../utils/interfaces";

interface Props {
  allUsers: User[],
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
}

function CreateAccount({ setAllUsers, allUsers }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    if (password === confirmPassword) {
      const newUser: NewUser = {
        data: {
          type: "user",
          attributes: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
          },
        },
      };
      postNewUser(newUser)
        .then((data) => {
         if(!data) {
          console.log("Failed to create account");
          // If account creation fails, display error message
         } else {
           // If successful, redirect to the login page
          //  let shellArr = []
           const token = localStorage.getItem('token')
           const user: User = {
             id: data.data.id,
             token: token ? token : "",
             email: data.data.attributes.email,
             // password: password,
            }
            // setAllUsers([...allUsers, user])
            let localStorageArr = JSON.parse(localStorage.getItem('localUsers') || '[]')
          
              localStorageArr.push(user)
         
            console.log(localStorageArr) 
            console.log(localStorageArr.length) 
            localStorage.setItem(`localUsers`, JSON.stringify(localStorageArr))
            console.log(user)
            navigate("/account/signin");
         }
        }) 
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleCreateAccount}>
        <FormControl>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <OutlinedInput
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <OutlinedInput
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormControl>
        <Stack direction="column">
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
            <OutlinedInput
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button variant="contained" onClick={handleCreateAccount}>
            Create Account
          </Button>
          {/* Route to dashboard after account creation */}
        </Stack>
      </Box>
    </Container>
  );
}

export default CreateAccount;
