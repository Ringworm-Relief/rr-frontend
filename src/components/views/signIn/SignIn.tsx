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
import { fetchUser } from "../../../apiCalls/userApiCalls";

interface Props {
  setUser: React.Dispatch<any>
}

function SignIn({ setUser }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
      fetchUser(email, password)
        .then((user: any) => {
          if(!user) {
            console.log("User not found")
            // If user not found, display error message
          } else {
            setUser(user);
            console.log(user);
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
        <Button> Create Account </Button>
      </Stack>
    </Box>
  </Container>
  );
}

export default SignIn;