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
  Alert,
  Collapse,
} from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import React, { useState } from "react";
import bacteria from "../../../assets/bacteria.png";
import pill from "../../../assets/pill.png";
import paw from "../../../assets/paw.png";
import MedicationsCard from "../../subComps/medicationsCard/MedicationsCard";
import { postPet } from "../../../apiCalls/petApiCalls";
import {
  Pet,
  Medication,
  Ringworm,
  formatDate,
} from "../../../utils/interfaces";
import { useNavigate } from "react-router-dom";

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

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 28 28"
    strokeWidth={3}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

interface Props {
  user: any;
  getUserPets: () => void;
}

function PetForm({ user, getUserPets }: Props) {
  const [hasSubmitted, setHasSubmitted] = useState<boolean | undefined>(
    undefined
  );
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const [medications, setMedications] = useState<Medication[]>([
    {
      name: "",
      medication_type: "",
      dosage: "",
      frequency: "",
    },
  ]);
  const [ringwormObject, setRingwormObject] = useState<Ringworm>({
    ringworm_type: "",
    diagnosis_date: "",
    symptoms: [],
  });

  const [petObject, setPetObject] = useState<Pet>({
    user_id: user.data.id,
    name: "",
    pet_type: "",
    breed: "",
    birthday: "",
    medications: medications,
    ringworm: ringwormObject,
  });

  const handleClose = () => {
    setAlertOpen(false);
  };

  const addAnotherPet = () => {
    setHasSubmitted(false);
  };

  const handleSubmit = () => {
    const updatedRingwormObject = {
      ...ringwormObject,
      diagnosis_date: formatDate(ringwormObject.diagnosis_date),
    };
    const updatedPetObject = {
      ...petObject,
      birthday: formatDate(petObject.birthday),
      ringworm: updatedRingwormObject,
      medications: medications,
    };
    postPet(updatedPetObject)
      .then((data) => {
        setHasSubmitted(true);
        setRingwormObject({
          ringworm_type: "",
          diagnosis_date: "",
          symptoms: [],
        });

        setMedications([
          {
            name: "",
            medication_type: "",
            dosage: "",
            frequency: "",
          },
        ]);

        setPetObject({
          user_id: user.data.id,
          name: "",
          pet_type: "",
          breed: "",
          birthday: "",
          medications: medications,
          ringworm: ringwormObject,
        });
        getUserPets();
      })
      .catch((err) => setHasSubmitted(false));
  };

  const handleMedChange = (
    index: number,
    field: keyof Medication,
    value: string
  ) => {
    const updatedMedications = medications.map((med, i) =>
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updatedMedications);
  };

  const medCards = medications.map((med, index) => (
    <MedicationsCard
      key={index}
      medObject={med}
      setMedObject={(field, value) => handleMedChange(index, field, value)}
      number={index + 1}
    />
  ));

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
        <Typography variant="h2" sx={{ fontSize: "30px", marginTop: "30px" }}>
          Pet intake form
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "20px", marginTop: "20px" }}>
          Basics <img id="paw-svg" src={paw} alt="dog paw" />
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
            value={petObject.name}
            onChange={(e) =>
              setPetObject({ ...petObject, name: e.target.value })
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
            onChange={(e) =>
              setPetObject({ ...petObject, pet_type: e.target.value })
            }
            id="type-field"
            input={<BootstrapInput />}
            sx={{ width: "100%" }}
          >
            <MenuItem value="" disabled>
              Select Pet
            </MenuItem>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
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
            value={petObject.birthday}
            onChange={(e) =>
              setPetObject({ ...petObject, birthday: e.target.value })
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
            value={petObject.breed}
            onChange={(e) =>
              setPetObject({ ...petObject, breed: e.target.value })
            }
            id="breed-field"
            inputProps={{ placeholder: "Enter breed" }}
          />
        </FormControl>

        <div className="divider"></div>

        <Typography variant="h3" sx={{ fontSize: "20px", marginTop: "20px" }}>
          Ringworm <img id="fungi-svg" src={bacteria} alt="bacteria" />
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
            value={ringwormObject.diagnosis_date}
            onChange={(e) =>
              setRingwormObject({
                ...ringwormObject,
                diagnosis_date: e.target.value,
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
            value={ringwormObject.ringworm_type}
            onChange={(e) =>
              setRingwormObject({
                ...ringwormObject,
                ringworm_type: e.target.value,
              })
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
            value={ringwormObject.symptoms.join(",")}
            onChange={(e) => {
              const array = e.target.value.split(",");
              setRingwormObject({ ...ringwormObject, symptoms: array });
            }}
            id="symptoms-field"
            inputProps={{ placeholder: "Enter symptoms" }}
          />
        </FormControl>

        <div className="divider"></div>

        <Typography variant="h3" sx={{ fontSize: "20px", marginTop: "20px" }}>
          Medication
          <img id="pill-svg" src={pill} alt="pill" />
        </Typography>

        <div>{medCards}</div>

        <Button
          variant="text"
          sx={{ marginTop: "0px" }}
          onClick={() =>
            setMedications([
              ...medications,
              {
                name: "",
                medication_type: "",
                dosage: "",
                frequency: "",
              },
            ])
          }
        >
          Add medication <PlusIcon />
        </Button>

        <Button
          variant="outlined"
          sx={{ marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Submit Form
        </Button>
        {hasSubmitted === false && (
          <Collapse in={alertOpen}>
            <Alert
              severity="error"
              sx={{ marginTop: "20px" }}
              onClose={() => setAlertOpen(false)}
              hidden={alertOpen}
            >
              Information did not update.
            </Alert>
          </Collapse>
        )}
        {hasSubmitted && (
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
      </Box>
    </Container>
  );
}

export default PetForm;
