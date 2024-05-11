import { useState } from "react";
import {
  Box,
  Stack,
  InputLabel,
  OutlinedInput,
  FormControl,
  Button,
  Container
} from "@mui/material";

function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = () => {
    if (password === confirmPassword) {
      // Call the API to create the account
      // body = { firstName, lastName, email, password }
      // If successful, redirect to the login page
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      }
      console.log(newUser)
    } else {
      // Show an error message
      // Passwords do not match
      console.log('Submit failed. Passwords do not match.')
    }
  };

  return (
    <Container maxWidth="xs">
    <Box component="form"  onSubmit={handleCreateAccount}>
      <FormControl>
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <OutlinedInput
          type="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <OutlinedInput
          type="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
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
        <FormControl>
          <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
          <OutlinedInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" onClick={handleCreateAccount}>Create Account</Button>
        {/* Route to dashboard after account creation */}
      </Stack>
    </Box>
    </Container>
  );
}

export default CreateAccount;
