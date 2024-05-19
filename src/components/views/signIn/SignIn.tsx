import {
  Box,
  Stack,
  InputLabel,
  OutlinedInput,
  FormControl,
  Button,
  Container,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../../../apiCalls/userApiCalls";
import { User } from "../../../utils/interfaces";
import React from "react";

interface Props {
  setUser: React.Dispatch<any>;
  setLoggedInUser: (user: any) => void;
  allUsers: User[];
}

function SignIn({ setUser, setLoggedInUser, allUsers }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const setAuthError = (error: string) => {
    setError(error);
    console.log(error);
  };

  const handleSignIn = () => {
    fetchUser(email, password, setError)
      .then((user: any) => {
        if (!user) {
          setAuthError("Email or Password is incorrect. Please try again.");
        } else {
          setLoggedInUser(user);
          // Navigation and user state handled in App.tsx by setLoggedInUser
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
          <FormControl sx={{ mt: 10 }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              label="Email"
              required
            />
          </FormControl>
          <FormControl sx={{ mt: 5 }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          <Button variant="contained" sx={{ mt: 5 }} onClick={handleSignIn}>
            Sign In
          </Button>
          <Button>
            <Link to="/account/new">Create Account</Link>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default SignIn;
