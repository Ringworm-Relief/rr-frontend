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
import React from 'react';

function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        .then((user: any) => {
          console.log(user);
                // If successful, redirect to the login page
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
