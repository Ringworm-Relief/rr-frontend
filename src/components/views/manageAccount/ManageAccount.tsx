// import PetForm from "../petForm/PetForm"
// import CreateAccount from "../createAccount/CreateAccount";
// import AllPetsManagement from "../managePets/AllPetsManagement";
import { useEffect, useState } from "react";
import { updateUser } from "../../../apiCalls/userApiCalls";
import {
  Box,
  Stack,
  InputLabel,
  Input,
  FormControl,
  Button,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  FormHelperText,
  Divider,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  user: any;
}

export default function ManageAccount({ user }: Props) {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    current_password: "",
  });

  useEffect(() => {
    // console.log(user.data.attributes);
    setUserInfo(user.data.attributes);
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleModal = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleUserUpdate = () => {
    setIsOpen(false);
    if (userInfo.password === userInfo.confirm_password) {
      updateUser(user, userInfo);
      console.log(userInfo);
    } else {
      setPasswordError(true);
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 6 }}>
        Manage Account Information
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        Adjust personal information like name, email, and password.
      </Typography>
      <Container maxWidth="xs">
        <Box component="form" sx={{ mt: 10 }} onSubmit={handleUserUpdate}>
          {error && (
            <Typography variant="h5" sx={{ color: "#ef8e64" }}>
              {error}
            </Typography>
          )}
        <Typography sx={{textAlign: "center", color: "grey"}}>Basics</Typography>
          <Box
            sx={{
              border: "2px solid #b9b7b7",
              borderRadius: "10px",
              padding: "20px",
              mb: 5,
            }}
          >
            <FormControl sx={{ mt: 5 }}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                type="firstName"
                // label="Required"
                // variant="standard"
                name="firstName"
                value={userInfo.first_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, first_name: e.target.value })
                }
                required
              />
            </FormControl>
            <FormControl sx={{ mt: 5 }}>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                type="lastName"
                // label="Last Name"
                name="lastName"
                value={userInfo.last_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, last_name: e.target.value })
                }
                required
              />
            </FormControl>
          </Box>
          <Typography sx={{textAlign: "center", color: "grey"}}>Not so basics</Typography>
          <Box
            sx={{
              border: "2px solid #b9b7b7",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Stack direction="column">
              <FormControl sx={{ mt: 5, mb: 5 }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  type="email"
                  // label="Email"
                  name="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  required
                />
              </FormControl>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls={`password-form-content`}
                  id={`password-form-header`}
                >
                  <Typography sx={{ color: "text.secondary" }}>
                    Change password
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl
                    fullWidth={true}
                    error={passwordError}
                    sx={{ mt: 5, justifyContent: "center" }}
                  >
                    <InputLabel htmlFor="password">New Password</InputLabel>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={userInfo.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
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
                    />
                    <FormHelperText>
                      {passwordError
                        ? "Passwords do not match"
                        : "Must be at least 6 characters long"}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth={true}
                    error={passwordError}
                    sx={{ mt: 5 }}
                  >
                    <InputLabel htmlFor="confirm_password">
                      Confirm Password
                    </InputLabel>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={userInfo.confirm_password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({
                          ...userInfo,
                          confirm_password: e.target.value,
                        })
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
                    />
                    {passwordError && (
                      <FormHelperText>Passwords do not match</FormHelperText>
                    )}
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Button variant="contained" onClick={handleModal} sx={{ mt: 2 }}>
                Submit Changes
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
      <Modal
        open={isOpen}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please Enter Your Current Password
          </Typography>
          <FormControl error={passwordError} sx={{ mt: 5 }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={userInfo.current_password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({
                  ...userInfo,
                  current_password: e.target.value,
                })
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
            />
            <FormHelperText>Must be at least 6 characters long</FormHelperText>
          </FormControl>
          <Button onClick={handleUserUpdate}>Submit Changes</Button>
        </Box>
      </Modal>
    </>
  );
}
