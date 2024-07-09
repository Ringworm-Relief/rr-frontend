import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Typography,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
          if (!data || data.errors) {
            setError(data.errors[0].detail);
          } else {
            navigate("/account/signin");
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    else {
      setPasswordError(true);
    }
  };
  return (
    <Container maxWidth="xs" sx={{height: "80vh"}}>
      <Typography variant="h3" sx={{mt: 8}}>Create an account</Typography>
      <Box component="form" sx={{ mt: 5}} onSubmit={handleCreateAccount}>
          {error && <Typography variant="h5" sx={{ color: "#ef8e64" }}>{error}</Typography>}
        <FormControl required sx={{ mt: 5 }}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <OutlinedInput
            id="firstName"
            type="firstName"
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl required sx={{ mt: 5 }}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <OutlinedInput
            id="lastName"
            type="lastName"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <Stack direction="column">
          <FormControl required sx={{ mt: 5 }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl required error={passwordError} sx={{ mt: 5 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              label="Password"
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
            <FormHelperText>{passwordError ? 'Passwords do not match' : 'Must be at least 6 characters long'}</FormHelperText>
          </FormControl>
          <FormControl required error={passwordError} sx={{ mt: 5 }}>
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
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
            {passwordError && <FormHelperText>Passwords do not match</FormHelperText>}
          </FormControl>
          <Button
            variant="contained"
            onClick={handleCreateAccount}
            sx={{ mt: 2 }}
          >
            Create Account
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>Already have an account?</Typography>
          <Button>
            <Link to="/account/signin">Click Here To Sign In</Link>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default CreateAccount;
