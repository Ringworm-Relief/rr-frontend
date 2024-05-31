import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  FormHelperText,
  Modal,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import React, { useEffect, useState } from "react";
import bacteria from "../../../assets/bacteria.png";
import pill from "../../../assets/pill.png";
import paw from "../../../assets/paw.png";
import MedicationsCard from "../../subComps/medicationsCard/MedicationsCard";
//   import { postPet, postMedication, postRingworm, patchPet, patchRingworm, patchMedication } from "../../../apiCalls/petApiCalls";
import { Pet, Medication, Ringworm } from "../../../utils/interfaces";

interface Props {
  user: any;
  pet: any;
}

export const SinglePetChange = ({ user, pet }: Props) => {
  console.table(pet);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [medications, setMedications] = useState<Medication[]>([
    {
      pet_id: "",
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
    pet_id: "",
    ringworm_type: "",
    diagnosis_date: "",
  });

  const handleClose = () => {
    setHasSubmitted(false);
  };

  useEffect(() => {
    setPetObject({
      user_id: user.data.id,
      name: pet.name,
      pet_type: pet.pet_type,
      breed: pet.breed,
      birthday: pet.birthday,
      symptoms: pet.symptoms,
    });
    setRingwormObject({
      pet_id: pet.Id,
      ringworm_type: pet.ringworm_type,
      diagnosis_date: pet.ringworm_diagnosis_date,
    });
    setMedications([
      {
        pet_id: pet.Id,
        name: pet.medication_name,
        medication_type: pet.medication_type,
        dosage: pet.medication_dosage,
        frequency: pet.medication_frequency,
      },
    ]);
  }, []);

  // const handleSubmit = async () => {
  //   const petResponse = await patchPet(petObject);
  //   const ringResponse = await patchRingworm(ringwormObject);
  //   const medResponses = await Promise.all(medications.map(med => patchMedication(med)));

  //   if (petResponse && ringResponse && medResponses.every(res => res)) {
  //     setPetSubmitted(true);
  //     setRingSubmitted(true);
  //     setMedSubmitted(true);
  //     setHasSubmitted(true);

  //     // Reset form
  //     setPetObject({
  //       user_id: 1,
  //       name: "",
  //       pet_type: "",
  //       breed: "",
  //       birthday: "",
  //       symptoms: [],
  //     });
  //     setRingwormObject({
  //       pet_id: 1,
  //       ringworm_type: "",
  //       diagnosis_date: "",
  //     });
  //     setMedications([
  //       {
  //         pet_id: 1,
  //         name: "",
  //         medication_type: "",
  //         dosage: "",
  //         frequency: "",
  //       },
  //     ]);
  //   }
  // };

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

  const medCards = medications.map((med, index) => (
    <MedicationsCard
      key={index}
      medObject={med}
      setMedObject={(field, value) => handleMedChange(index, field, value)}
      number={index + 1}
    />
  ));
  return (
    <Grid item>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`${pet.name}-content`}
          id={`${pet.name}-header`}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{pet.name}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>Edit pet information</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
            {/* <Typography variant="h2" sx={{ fontSize: "30px" }}>
            {pet.name}
          </Typography> */}
            <Button
              color="error"
              //   variant="outlined"
              sx={{ marginTop: "20px" }}
              // onClick={() => handleSubmit()}
            >
              Remove Pet
            </Button>
            <Typography
              variant="h3"
              sx={{ fontSize: "20px", marginTop: "20px" }}
            >
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
                // defaultValue={pet.name}
                value={petObject.name}
                onChange={(e) =>
                  setPetObject({ ...petObject, name: e.target.value })
                }
                // id="name-field"
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
                defaultValue={pet.pet_type === "Cat" ? "Cat" : "Dog"} //Can't properly use value here
                onChange={(e) =>
                  setPetObject({ ...petObject, pet_type: e.target.value })
                }
                // id="type-field"
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
                sx={{
                  marginLeft: "20px",
                  marginTop: "17px",
                  color: "#D3D3D3",
                }}
              >
                It's okay to approximate!
              </FormHelperText>
              <BootstrapInput
                value={petObject.birthday}
                onChange={(e) =>
                  setPetObject({ ...petObject, birthday: e.target.value })
                }
                // id="birthday-field"
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
                sx={{
                  marginLeft: "20px",
                  marginTop: "17px",
                  color: "#D3D3D3",
                }}
              >
                Type "N/A" if unsure
              </FormHelperText>
              <BootstrapInput
                value={petObject.breed}
                onChange={(e) =>
                  setPetObject({ ...petObject, breed: e.target.value })
                }
                // id="breed-field"
                inputProps={{ placeholder: "Enter breed" }}
              />
            </FormControl>

            <div className="divider"></div>

            <Typography
              variant="h3"
              sx={{ fontSize: "20px", marginTop: "20px" }}
            >
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
                // id="diagnosis-date-field"
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
                // id="strain-field"
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
                sx={{
                  marginLeft: "20px",
                  marginTop: "17px",
                  color: "#D3D3D3",
                }}
              >
                Separate symptoms with commas
              </FormHelperText>
              <BootstrapInput
                value={petObject.symptoms.join(",")}
                onChange={(e) => {
                  const array = e.target.value.split(",");
                  setPetObject({ ...petObject, symptoms: array });
                }}
                // id="symptoms-field"
                inputProps={{ placeholder: "Enter symptoms" }}
              />
            </FormControl>

            <div className="divider"></div>

            <Typography
              variant="h3"
              sx={{ fontSize: "20px", marginTop: "20px" }}
            >
              Medication
              <img id="pill-svg" src={pill} alt="pill" />
            </Typography>

            <div>{medCards}</div>

            <Button
              variant="outlined"
              sx={{ marginTop: "20px" }}
              onClick={() =>
                setMedications([
                  ...medications,
                  {
                    pet_id: "",
                    name: "",
                    medication_type: "",
                    dosage: "",
                    frequency: "",
                  },
                ])
              }
            >
              Add medication
            </Button>

            <Button
              variant="outlined"
              sx={{ marginTop: "20px" }}
              // onClick={() => handleSubmit()}
            >
              Submit Changes
            </Button>

            <Modal
              open={hasSubmitted}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  //   id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Success!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  The form has been submitted.
                </Typography>
              </Box>
            </Modal>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};
