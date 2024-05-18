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
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../../utils/interfaces";

interface Props {
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
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
          if (!data) {
            console.log("Failed to create account");
          } else {
            // const token = localStorage.getItem("token");
            // const user: User = {
            //   id: data.data.id,
            //   token: token ? token : "",
            //   email: data.data.attributes.email,
            // };
            // let localStorageArr = JSON.parse(
            //   localStorage.getItem("localUsers") || "[]"
            // );
            // localStorageArr.push(user);
            // localStorage.setItem(`localUsers`, JSON.stringify(localStorageArr));
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
        <FormControl sx={{mt: 5}}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <OutlinedInput
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl sx={{mt: 5}}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <OutlinedInput
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormControl>
        <Stack direction="column">
          <FormControl sx={{mt: 5}}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl sx={{mt: 5}}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl sx={{mt: 5}}>
            <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
            <OutlinedInput
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button variant="contained" onClick={handleCreateAccount} sx={{mt: 2}}>
            Create Account
          </Button>
          <Typography variant="body2">
          Already have an account?
            </Typography>
          <Button variant="outlined">
            <Link to="/account/signin">
              Click Here To Sign In
          </Link>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default CreateAccount;
