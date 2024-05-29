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
import bacteria from "../../../assets/bacteria.png";
import pill from "../../../assets/pill.png";
import paw from "../../../assets/paw.png";
import MedicationsCard from "../../subComps/medicationsCard/MedicationsCard";
import { postPet, postMedication, postRingworm } from "../../../apiCalls/petApiCalls";
import { Pet, Medication, Ringworm } from "../../../utils/interfaces";
import { Navigate, useNavigate } from "react-router-dom"

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

interface Props {
  user: any
}

function PetForm({ user }: Props) {
  const navigate = useNavigate()
  const [petSubmitted, setPetSubmitted] = useState<boolean>(false);
  const [ringSubmitted, setRingSubmitted] = useState<boolean>(false);
  const [medSubmitted, setMedSubmitted] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [petID, setPetID] = useState<string>("");
  const [medications, setMedications] = useState<Medication[]>([
    {
      pet_id: petID,
      name: "",
      medication_type: "",
      dosage: "",
      frequency: "",
    },
  ]);

  const [petObject, setPetObject] = useState<Pet>({
    user_id: user.data.id,
    name: "",
    pet_type: "",
    breed: "",
    birthday: "",
    symptoms: [],
  });

  const [ringwormObject, setRingwormObject] = useState<Ringworm>({
    pet_id: petID,
    ringworm_type: "",
    diagnosis_date: "",
  });

  const handleClose = () => {
    setHasSubmitted(false);
  };

  const addAnotherPet = () => {
    setHasSubmitted(false)
    setPetID("")
  }

  const handleSubmit = () => {
    console.log("pet Object", petObject)
    console.log("ring Object", ringwormObject)
    console.log("med Objects", medications)
    postPet(petObject).then(data => {
      console.log(data.data)
      setPetID(data.data.id)
      setPetSubmitted(true);
      console.log(petID)
      postRingworm(ringwormObject).then(data => setRingSubmitted(true));
      Promise.all(medications.map(med => postMedication(med))).then(data => setMedSubmitted(true));
    });

    if (petSubmitted && ringSubmitted && medSubmitted) {
      setHasSubmitted(true);

      setPetObject({
        user_id: user.data.id,
        name: "",
        pet_type: "",
        breed: "",
        birthday: "",
        symptoms: [],
      });

      setRingwormObject({
        pet_id: "",
        ringworm_type: "",
        diagnosis_date: "",
      });
      
      setMedications([
        {
          pet_id: "",
          name: "",
          medication_type: "",
          dosage: "",
          frequency: "",
        },
      ]);
    }
  };

  // "pet_id": 1,
  // "medication_type": "oral",
  // "name": "anti-inflammatory",
  // "dosage": "4 g",
  // "frequency":

  const handleMedChange = (index: number, field: keyof Medication, value: string) => {
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
        <Typography variant="h2" sx={{ fontSize: "30px" }}>
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
              setRingwormObject({ ...ringwormObject, ringworm_type: e.target.value })
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
            value={petObject.symptoms.join(",")}
            onChange={(e) => {
              const array = e.target.value.split(",");
              setPetObject({ ...petObject, symptoms: array });
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
          variant="outlined"
          sx={{ marginTop: "20px" }}
          onClick={() => setMedications([
            ...medications,
            {
              pet_id: petID,
              name: "",
              medication_type: "",
              dosage: "",
              frequency: "",
            }
          ])}
        >
          Add medication
        </Button>

        <Button
          variant="outlined"
          sx={{ marginTop: "20px" }}
          onClick={handleSubmit}
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
            <Button
          variant="outlined"
          sx={{ marginTop: "20px" }}
          onClick={addAnotherPet}
        >
          Add another pet
        </Button>
        <Button
          variant="outlined"
          sx={{ marginTop: "20px" }}
          onClick={() => navigate(`/user/${user.data.id}/dashboard`)}
        >
          View Dashboard
        </Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default PetForm;

