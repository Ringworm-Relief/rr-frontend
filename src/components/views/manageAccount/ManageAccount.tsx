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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  Alert,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Props {
  user: any;
  setUser: React.Dispatch<any>;
}

export default function ManageAccount({ user, setUser }: Props) {
  //Would like to refactor to use one error state and pass in error type with optional message
  const [isOpen, setIsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string>("");
  const [passwordError, setPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    current_password: "",
  });

  useEffect(() => {
    setUserInfo(user.data.attributes);
  }, [user.data.attributes]);

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
    if (userInfo.password === userInfo.password_confirmation) {
      updateUser(user, userInfo).then((data) => {
        if (data.errors) {
          console.log(data)
          setError(true);
          setErrorStatus(data.errors[0].status);
        } else {
          setSuccess(true);
          console.log(data);
          sessionStorage.removeItem("currentUser");
          sessionStorage.setItem("currentUser", JSON.stringify(data));
          setUser(JSON.parse(sessionStorage.getItem("currentUser") || "false"));
          setUserInfo({
            ...userInfo,
            password_confirmation: "",
            password: "",
          });
        }
      });
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
      {error && (
        <Collapse in={alertOpen}>
          <Alert
            severity="error"
            sx={{ marginTop: "20px" }}
            onClose={() => setAlertOpen(false)}
            hidden={alertOpen}
          >
            {errorStatus !== "409"
              ? "Information did not update. Please ensure your current password is correct."
              : "An account with this email already exists."}
          </Alert>
        </Collapse>
      )}
      {success && (
        <Collapse in={alertOpen}>
          <Alert
            severity="success"
            sx={{ marginTop: "20px" }}
            onClose={() => setAlertOpen(false)}
            hidden={alertOpen}
          >
            Information updated.
          </Alert>
        </Collapse>
      )}
      <Container maxWidth="sm">
        <Box component="form" sx={{ mt: 10 }} onSubmit={handleUserUpdate}>
          {error && (
            <Typography variant="h5" sx={{ color: "#ef8e64" }}>
              {error}
            </Typography>
          )}
          <Typography sx={{ textAlign: "center", color: "grey" }}>
            Basics
          </Typography>
          <Box
            sx={{
              border: "2px solid #b9b7b7",
              borderRadius: "10px",
              padding: "20px",
              mb: 5,
            }}
          >
            <FormControl sx={{ mt: 5, width: "100%" }}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                type="firstName"
                name="firstName"
                value={userInfo.first_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, first_name: e.target.value })
                }
                required
              />
            </FormControl>
            <FormControl sx={{ mt: 5, width: "100%" }}>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                type="lastName"
                name="lastName"
                value={userInfo.last_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, last_name: e.target.value })
                }
                required
              />
            </FormControl>
          </Box>
          <Typography sx={{ textAlign: "center", color: "grey" }}>
            Not so basics
          </Typography>
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
                      value={userInfo.password_confirmation}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({
                          ...userInfo,
                          password_confirmation: e.target.value,
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
            Please confirm your current password
          </Typography>
          <Stack>
            <FormControl error={passwordError} sx={{ mt: 5 }}>
              <InputLabel htmlFor="current-password">Password</InputLabel>
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                name="currentPassword"
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
              <FormHelperText>
                Must be at least 6 characters long
              </FormHelperText>
            </FormControl>
            <Stack direction="row">
              <Button onClick={handleUserUpdate}>Confirm</Button>
              <Button onClick={handleModal}>Go back</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
