import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  FormHelperText,
  Modal,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import React, { useState } from "react";
import "./PetForm.css";
import bacteria from "../../../assets/bacteria.png";
import pill from "../../../assets/pill.png";
import paw from "../../../assets/paw.png";
import postPet from "../../../apiCalls/petApiCalls";
import { Pet } from "../../../utils/interfaces";

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
  borderRadius: 8,
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 25,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    color: "black",
    width: "300px",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));


function PetForm() {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [petObject, setPetObject] = useState<Pet>({
    user_id: 1,
    pet_name: "",
    pet_type: "",
    pet_breed: "",
    pet_birthday: "",
    pet_symptoms: [],
    medication_type: "",
    medication_name: "",
    medication_dosage: "",
    medication_frequency: "",
    ringworm_type: "",
    ringworm_diagnosis_date: "",
  });

  const handleClose = () => {
    setHasSubmitted(false);
  };

  const handleSubmit = () => {
    postPet(petObject).then((data) => setHasSubmitted(true));

    console.log("petObject", petObject);
    setPetObject({
      user_id: 1,
      pet_name: "",
      pet_type: "",
      pet_breed: "",
      pet_birthday: "",
      pet_symptoms: [],
      medication_type: "",
      medication_name: "",
      medication_dosage: "",
      medication_frequency: "",
      ringworm_type: "",
      ringworm_diagnosis_date: "",
    });
  };

  return (
    <Container>
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "30px" }}>
          Pet intake form
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "20px", marginTop: "20px" }}>
          Basics <img id="paw-svg" src={paw} />
        </Typography>

        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="name-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Pet Name
          </InputLabel>
          <BootstrapInput
            value={petObject.pet_name}
            onChange={(e) =>
              setPetObject({ ...petObject, pet_name: e.target.value })
            }
            id="name-field"
            inputProps={{ placeholder: "Enter pet name" }}
          />
        </FormControl>

        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="type-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Type
          </InputLabel>
          <Select
            value={petObject.pet_type}
            defaultValue="Select Pet"
            onChange={(e) =>
              setPetObject({ ...petObject, pet_type: e.target.value })
            }
            id="type-field"
            input={<BootstrapInput />}
            sx={{ width: "100%" }}
          >
            <MenuItem value="" disabled></MenuItem>
            <MenuItem value="dog">Dog</MenuItem>
            <MenuItem value="cat">Cat</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="birthday-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Birthday
          </InputLabel>
          <FormHelperText
            sx={{ marginLeft: "20px", marginTop: "17px", color: "#D3D3D3" }}
          >
            It's okay to approximate!
          </FormHelperText>
          <BootstrapInput
            value={petObject.pet_birthday}
            onChange={(e) =>
              setPetObject({ ...petObject, pet_birthday: e.target.value })
            }
            id="birthday-field"
            type="date"
          />
        </FormControl>

        <FormControl variant="standard" sx={{ my: "20px" }}>
          <InputLabel
            shrink
            htmlFor="breed-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Breed
          </InputLabel>
          <FormHelperText
            sx={{ marginLeft: "20px", marginTop: "17px", color: "#D3D3D3" }}
          >
            Type "N/A" if unsure
          </FormHelperText>
          <BootstrapInput
            value={petObject.pet_breed}
            onChange={(e) =>
              setPetObject({ ...petObject, pet_breed: e.target.value })
            }
            id="breed-field"
            inputProps={{ placeholder: "Enter breed" }}
          />
        </FormControl>

        <div className="divider"></div>
        <Typography variant="h3" sx={{ fontSize: "20px", marginTop: "20px" }}>
          Ringworm <img id="fungi-svg" src={bacteria} />
        </Typography>

        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="diagnosis-date-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Diagnosis Date
          </InputLabel>
          <BootstrapInput
            value={petObject.ringworm_diagnosis_date}
            onChange={(e) =>
              setPetObject({
                ...petObject,
                ringworm_diagnosis_date: e.target.value,
              })
            }
            id="diagnosis-date-field"
            type="date"
          />
        </FormControl>

        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="strain-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Ringworm strain
          </InputLabel>
          <BootstrapInput
            id="strain-field"
            value={petObject.ringworm_type}
            onChange={(e) =>
              setPetObject({ ...petObject, ringworm_type: e.target.value })
            }
            inputProps={{ placeholder: "Enter strain" }}
          />
        </FormControl>

        <FormControl variant="standard" sx={{ my: "20px" }}>
          <InputLabel
            shrink
            htmlFor="symptoms-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Symptoms
          </InputLabel>
          <FormHelperText
            sx={{ marginLeft: "20px", marginTop: "17px", color: "#D3D3D3" }}
          >
            Separate symptoms with commas
          </FormHelperText>
          <BootstrapInput
            value={petObject.pet_symptoms.join(",")}
            onChange={(e) => {
              const array = e.target.value.split(",");
              setPetObject({ ...petObject, pet_symptoms: array });
            }}
            id="symptoms-field"
            inputProps={{ placeholder: "Enter symptoms" }}
          />
        </FormControl>

        <div className="divider"></div>
        <Typography variant="h3" sx={{ fontSize: "20px", marginTop: "20px" }}>
          Medication
          <img id="pill-svg" src={pill} />
        </Typography>

        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="medication-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Medication
          </InputLabel>
          <BootstrapInput
            value={petObject.medication_name}
            onChange={(e) =>
              setPetObject({ ...petObject, medication_name: e.target.value })
            }
            inputProps={{ placeholder: "Enter medication name" }}
            id="medication-field"
          />
        </FormControl>

        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="medication-type-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Medication type
          </InputLabel>

          <Select
            defaultValue=""
            value={petObject.medication_type}
            onChange={(e) =>
              setPetObject({ ...petObject, medication_type: e.target.value })
            }
            id="medication-type-field"
            label="Select medication type"
            input={<BootstrapInput />}
            sx={{ width: "100%" }}
          >
            <MenuItem value="" disabled>
              Select medication type
            </MenuItem>
            <MenuItem value="oral">Oral</MenuItem>
            <MenuItem value="topical">Topical</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="dosage-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Dosage
          </InputLabel>
          <BootstrapInput
            value={petObject.medication_dosage}
            onChange={(e) =>
              setPetObject({ ...petObject, medication_dosage: e.target.value })
            }
            inputProps={{ placeholder: "Enter dosage" }}
            id="dosage-field"
          />
        </FormControl>

        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="frequency-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Frequency
          </InputLabel>

          <Select
            defaultValue=""
            id="frequency-field"
            label="Select medication type"
            input={<BootstrapInput />}
            sx={{ width: "100%" }}
            value={petObject.medication_frequency}
            onChange={(e) =>
              setPetObject({
                ...petObject,
                medication_frequency: e.target.value,
              })
            }
          >
            <MenuItem value="" disabled>
              Select medication type
            </MenuItem>
            <MenuItem value="oral">Weekly</MenuItem>
            <MenuItem value="topical">Bi-weekly</MenuItem>
            <MenuItem value="oral">Daily</MenuItem>
            <MenuItem value="topical">Every 12 hours</MenuItem>
            <MenuItem value="oral">Every 8 hours</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          sx={{ marginTop: "20px" }}
          onClick={() => handleSubmit()}
        >
          Submit Form
        </Button>

        <Modal
          open={hasSubmitted}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Success!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              The form has been submitted.
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default PetForm;
