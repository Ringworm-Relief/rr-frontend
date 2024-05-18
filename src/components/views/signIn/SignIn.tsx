import {
  Box,
  Stack,
  InputLabel,
  OutlinedInput,
  FormControl,
  Button,
  Container,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../../../apiCalls/userApiCalls";
import { User } from "../../../utils/interfaces";

interface Props {
  setUser: React.Dispatch<any>,
  setLoggedInUser: (user: any) => void,
  allUsers: User[]
}

function SignIn({ setUser, setLoggedInUser, allUsers }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    // const token = localStorage.getItem('token');
    // const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
    // const targetUser = localUsers.find((user: User) => {
    //   return user.email === email;
    // });
    // console.log(targetUser)
    // console.log(password)
    // targetUser &&
      fetchUser(email, password)
        .then((user: any) => {
          if(!user) {
            console.log("User not found")
            // If user not found, display error message
          } else {
            // sessionStorage.setItem('currentUser', JSON.stringify(user));
            // setUser(user);
            console.log(user)
            setLoggedInUser(user);
            console.log(user.data.id);
            // navigate(`/user/${user.data.id}/dashboard`);
            // If user found, set user state and redirect to dashboard
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
  };

  return (
    <Container maxWidth="xs">
    <Box component="form" onSubmit={handleSignIn}>
      <Stack direction="column">
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" onClick={handleSignIn}>
          Sign In
        </Button>
        {/* Route to dashboard after account creation */}
        <Button> 
          <Link to='/account/new'>Create Account</Link> 
        </Button>
      </Stack>
    </Box>
  </Container>
  );
}

export default SignIn;