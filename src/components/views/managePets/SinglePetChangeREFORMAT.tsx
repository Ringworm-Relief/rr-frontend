import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Typography,
  Button,
  Collapse,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Stack,
  Grid,
  Modal
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import paw from "../../../assets/paw.png";
import {
  Pet,
  Medication,
  Ringworm,
  formatDate,
  formatDateBackwards,
} from "../../../utils/interfaces";
import ManageMedCards from "./manageMedCards";
import {
  putMedications,
  putPet,
  putRingworm,
  postMed,
  deletePet
} from "../../../apiCalls/petApiCalls";

interface Props {
  user: any;
  pet: any;
}

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

export const SinglePetChange = ({ user, pet }: Props) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const [medications, setMedications] = useState<Medication[]>(pet.medications);
  const [petObject, setPetObject] = useState<any>({
    // user_id: user.data.id,
    name: pet.name,
    pet_type: pet.pet_type,
    breed: pet.breed,
    birthday: formatDateBackwards(pet.birthday),
  });

  const [ringwormObject, setRingwormObject] = useState<Ringworm>({
    ringworm_type: pet.ringworm.ringworm_type,
    diagnosis_date: formatDateBackwards(pet.ringworm.diagnosis_date),
    symptoms: pet.ringworm.symptoms,
  });

  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [petPut, setPetPut] = useState<boolean | undefined>(undefined);
  const [ringPut, setRingPut] = useState<boolean | undefined>(undefined);
  const [medsPut, setMedsPut] = useState<boolean | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const handlePetSubmit = (pet: Pet, id: any) => {
    const updatedPet = { ...pet, birthday: formatDate(pet.birthday) };
    putPet(updatedPet, id)
      .then((data) => {
        console.log("DATA pet", data);
        console.log("pet in here", pet);
        setPetPut(true);
      })
      .catch((err) => {
        setPetPut(false);
      });
  };

  const handleRingwormSubmit = (ringworm: any, id: any) => {
    const updatedRingworm = {
      ...ringworm,
      diagnosis_date: formatDate(ringworm.diagnosis_date),
    };
    putRingworm(updatedRingworm, id)
      .then((data) => {
        setRingPut(true);
      })
      .catch((err) => {
        setRingPut(false);
      });
  };

  const handleMedsSubmit = (meds: any[], id: number | string) => {
    let newMeds = meds.filter((med) => !med.id);
    let oldMeds = meds.filter((med) => med.id);
    let medsToPost = newMeds.map((med) => {
      return { ...med, pet_id: pet.id };
    });
    let medObj = {
      medications: oldMeds,
    };
    putMedications(medObj, id)
      .then((data) => {
        setMedsPut(true);
      })
      .catch((err) => {
        setMedsPut(false);
      });

    if (newMeds.length) {
      let promises = medsToPost.map((med) => {
        return postMed(med).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to post med: ${med.name}`);
          } else {
            return response.json();
          }
        });
      });

      Promise.all(promises)
        .then((results) => {
          console.log("All posts succeeded:", results);
        })
        .catch((error) => {
          console.error("Error posting data:", error);
          setMedsPut(false);
        });
    }
  };

  const handleDelete = () => {
    deletePet(parseInt(pet.id))
    .then(data => {
      setIsOpen(false)
    })
  }

  const medCards = medications.map((med, index) => (
    <ManageMedCards
      key={index}
      medObject={med}
      setMedObject={(field, value) => handleMedChange(index, field, value)}
      number={index + 1}
    />
  ));

  const handlePetObjectChange = (field: keyof typeof petObject, value: any) => {
    setPetObject({ ...petObject, [field]: value });
  };

  const handleRingwormObjectChange = (field: keyof Ringworm, value: any) => {
    setRingwormObject({ ...ringwormObject, [field]: value });
  };

  return (
    <>
     <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Are you sure you want to delete {pet.name}?
          </Typography>
          <Typography sx={{my: 2}} id="modal-modal-title" variant="body1" component="h2">
           We are hoping this means {pet.name} is ringworm-free! 
          </Typography>
          
            <Stack direction="row" sx={{ mt: 5 }}>
              <Button variant="outlined"  onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button  sx={{ color: '#e00000', ml: 23 }} startIcon={<DeleteIcon />} onClick={handleDelete} >Delete Pet</Button>
      
          </Stack> 
        </Box>
      </Modal>
      <Grid item>
        <Accordion sx={{ marginRight: 3 }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`${pet.name}-content`}
            id={`${pet.name}-header`}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "18%",
                  alignItems: "center",
                }}
              >
                <img src={paw} id="paw-svg" />
                <Typography sx={{ flexShrink: 0 }}>{pet.name}</Typography>
              </Box>
              <Typography sx={{ color: "text.secondary" }}>
                Edit pet information
              </Typography>
              <Button sx={{ color: '#e00000' }} startIcon={<DeleteIcon />} onClick={() => {setIsOpen(true)}}>Delete Pet</Button>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Container maxWidth="sm">
              <Box
                component="form"
                onSubmit={() => handlePetSubmit(petObject, pet.id)}
                sx={{ mt: 2 }}
              >
                <Typography sx={{ textAlign: "center", color: "grey", mb: 2 }}>
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
                  <FormControl variant="standard" sx={{ mt: 2, width: "100%" }}>
                    <InputLabel htmlFor="petName">Pet Name</InputLabel>
                    <Input
                      type="petName"
                      name="petName"
                      value={petObject.name}
                      onChange={(e) =>
                        handlePetObjectChange("name", e.target.value)
                      }
                      required
                    />
                  </FormControl>

                  <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                    <InputLabel htmlFor="petType">Pet Type</InputLabel>
                    <Select
                      labelId="petType"
                      id="petType"
                      value={petObject.pet_type}
                      onChange={(e) =>
                        handlePetObjectChange("pet_type", e.target.value)
                      }
                      required
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Dog">Dog</MenuItem>
                      <MenuItem value="Cat">Cat</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                    <InputLabel htmlFor="bday">Pet Birthday</InputLabel>
                    <Input
                      type="date"
                      name="bday"
                      value={petObject.birthday}
                      onChange={(e) =>
                        handlePetObjectChange("birthday", e.target.value)
                      }
                      required
                    />
                  </FormControl>

                  <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                    <InputLabel htmlFor="breed">Breed</InputLabel>
                    <Input
                      type="breed"
                      name="breed"
                      value={petObject.breed}
                      onChange={(e) =>
                        handlePetObjectChange("breed", e.target.value)
                      }
                      required
                    />
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={() => handlePetSubmit(petObject, pet.id)}
                    >
                      {" "}
                      Submit Pet Changes
                    </Button>
                  </Box>
                  {petPut === false && (
                    <Collapse in={alertOpen}>
                      <Alert
                        severity="error"
                        sx={{ marginTop: "20px" }}
                        onClose={() => setAlertOpen(false)}
                        hidden={alertOpen}
                      >
                        Pet information did not update.
                      </Alert>
                    </Collapse>
                  )}
                  {petPut && (
                    <Collapse in={alertOpen}>
                      <Alert
                        severity="success"
                        sx={{ marginTop: "20px" }}
                        onClose={() => setAlertOpen(false)}
                        hidden={alertOpen}
                      >
                        Pet information updated successfully.
                      </Alert>
                    </Collapse>
                  )}
                </Box>

                <Typography sx={{ textAlign: "center", color: "grey", mb: 2 }}>
                  Ringworm
                </Typography>
                <Box
                  sx={{
                    border: "2px solid #b9b7b7",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <FormControl variant="standard" sx={{ mt: 2, width: "100%" }}>
                    <InputLabel htmlFor="strain">Ringworm Type</InputLabel>
                    <Input
                      type="text"
                      name="strain"
                      value={ringwormObject.ringworm_type}
                      onChange={(e) =>
                        handleRingwormObjectChange(
                          "ringworm_type",
                          e.target.value
                        )
                      }
                      required
                    />
                  </FormControl>
                  <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                    <InputLabel htmlFor="diag-date">Diagnosis Date</InputLabel>
                    <Input
                      type="date"
                      name="diag-date"
                      value={ringwormObject.diagnosis_date}
                      onChange={(e) =>
                        handleRingwormObjectChange(
                          "diagnosis_date",
                          e.target.value
                        )
                      }
                      required
                    />
                  </FormControl>
                  <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                    <InputLabel htmlFor="symptoms">Symptoms</InputLabel>
                    <Input
                      type="text"
                      name="symptoms"
                      value={ringwormObject.symptoms.join(",")}
                      onChange={(e) => {
                        const array = e.target.value.split(",");
                        handleRingwormObjectChange("symptoms", array);
                      }}
                      required
                    />
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() =>
                        handleRingwormSubmit(ringwormObject, pet.id)
                      }
                      sx={{ mt: 2 }}
                    >
                      {" "}
                      Submit Ringworm Changes
                    </Button>
                  </Box>
                  {ringPut === false && (
                    <Collapse in={alertOpen}>
                      <Alert
                        severity="error"
                        sx={{ marginTop: "20px" }}
                        onClose={() => setAlertOpen(false)}
                        hidden={alertOpen}
                      >
                        Ringworm information did not update.
                      </Alert>
                    </Collapse>
                  )}{" "}
                  {ringPut && (
                    <Collapse in={alertOpen}>
                      <Alert
                        severity="success"
                        sx={{ marginTop: "20px" }}
                        onClose={() => setAlertOpen(false)}
                        hidden={alertOpen}
                      >
                        Ringworm information updated successfully.
                      </Alert>
                    </Collapse>
                  )}
                </Box>

                <Typography
                  sx={{ textAlign: "center", color: "grey", mt: 5, mb: 2 }}
                >
                  Medications
                </Typography>
                <Box
                  sx={{
                    border: "2px solid #b9b7b7",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <Stack direction="column">
                    <div>{medCards}</div>
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    <Button
                      sx={{ mt: 2 }}
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
                      Add Medication
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleMedsSubmit(medications, pet.id)}
                      sx={{ mt: 2 }}
                    >
                      Submit Medication Changes
                    </Button>
                  </Box>
                  {medsPut === false && (
                    <Collapse in={alertOpen}>
                      <Alert
                        severity="error"
                        sx={{ marginTop: "20px" }}
                        onClose={() => setAlertOpen(false)}
                        hidden={alertOpen}
                      >
                        Medication information did not update.
                      </Alert>
                    </Collapse>
                  )}{" "}
                  {medsPut && (
                    <Collapse in={alertOpen}>
                      <Alert
                        severity="success"
                        sx={{ marginTop: "20px" }}
                        onClose={() => setAlertOpen(false)}
                        hidden={alertOpen}
                      >
                        Medication information updated successfully.
                      </Alert>
                    </Collapse>
                  )}
                </Box>
              </Box>
            </Container>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};
