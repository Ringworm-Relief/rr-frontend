import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
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
import { fetchUser } from "../../../apiCalls/userApiCalls";
interface Props {
  setLoggedInUser: (user: any) => void;
}

function SignIn({ setLoggedInUser }: Props) {
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
          sessionStorage.setItem("currentUser", JSON.stringify(user));
          setLoggedInUser(user);
          // Navigation and user state handled in App.tsx by setLoggedInUser
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="xs" sx={{ height: "80vh" }}>
      <Box component="form" onSubmit={handleSignIn}>
        <Stack direction="column">
          <FormControl required sx={{ mt: 10 }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              name="email"
              value={email}
              // aria-label="email"
              required
              label="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </FormControl>
          <FormControl required sx={{ mt: 5 }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              label="Password"
              // aria-label="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
            />
          </FormControl>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          <Button
            id="handle-signin-btn"
            variant="contained"
            sx={{ mt: 5 }}
            onClick={handleSignIn}
          >
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
