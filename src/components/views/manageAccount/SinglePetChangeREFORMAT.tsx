


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
  FormHelperText,
  Collapse,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Stack,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Pet, Medication, Ringworm, formatDate, formatDateBackwards } from "../../../utils/interfaces";
import ManageMedCards from "./manageMedCards";
import { putPet } from "../../../apiCalls/petApiCalls"

interface Props {
  user: any;
  pet: any;
}

export const SinglePetChange = ({ user, pet }: Props) => {
  console.log("PETTTTT", pet)
  const [alertOpen, setAlertOpen] = useState<boolean | undefined>(undefined);
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
  symptoms: pet.ringworm.symptoms
  });
 
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [petPut, setPetPut] = useState<boolean | undefined>(undefined)

  const handleMedChange = (index: number, field: keyof Medication, value: string) => {
    const updatedMedications = medications.map((med, i) =>
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updatedMedications);
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePetSubmit = (pet: Pet, id: any) => {
    const updatedPet = {...pet, birthday: formatDate(pet.birthday)}
    putPet(updatedPet, id)
    .then(data => {
      console.log("hi")
      console.log("pet in here", pet)
      setPetPut(true)
    })
    .catch(err => {
      setPetPut(false)
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
      {/* {error && (
        <Collapse in={alertOpen}>
          <Alert
            severity="error"
            sx={{ marginTop: "20px" }}
            onClose={() => setAlertOpen(false)}
          >
            {errorStatus && "Information did not update. Please check all fields and try again."}
          </Alert>
        </Collapse>
      )}
      {success && (
        <Collapse in={alertOpen}>
          <Alert
            severity="success"
            sx={{ marginTop: "20px" }}
            onClose={() => setAlertOpen(false)}
          >
            Information updated.
          </Alert>
        </Collapse>
      )} */}
      <Accordion expanded={expanded === pet.name} onChange={handleAccordionChange(pet.name)} sx={{marginRight: 3}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`${pet.name}-content`}
          id={`${pet.name}-header`}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>{pet.name}</Typography>
          <Typography sx={{ color: "text.secondary" }}>Edit pet information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="sm">
            <Box component="form" sx={{ mt: 2 }}>
              {/* {error && (
                <Typography variant="h5" sx={{ color: "#ef8e64" }}>
                  {error}
                </Typography>
              )} */}
              <Typography sx={{ textAlign: "center", color: "grey" }}>Basics</Typography>
              <Box sx={{ border: "2px solid #b9b7b7", borderRadius: "10px", padding: "20px", mb: 5 }}>
                <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                  <InputLabel htmlFor="petName">Pet Name</InputLabel>
                  <Input
                    type="petName"
                    name="petName"
                    value={petObject.name}
                    onChange={(e) => handlePetObjectChange("name", e.target.value)}
                    required
                  />
                </FormControl>

                <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                  <InputLabel htmlFor="petType">Pet Type</InputLabel>
                  <Select
                    labelId="petType"
                    id="petType"
                    value={petObject.pet_type}
                    onChange={(e) => handlePetObjectChange("pet_type", e.target.value)}
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
                    onChange={(e) => handlePetObjectChange("birthday", e.target.value)}
                    required
                  />
                </FormControl>

                <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                  <InputLabel htmlFor="breed">Breed</InputLabel>
                  <Input
                    type="breed"
                    name="breed"
                    value={petObject.breed}
                    onChange={(e) => handlePetObjectChange("breed", e.target.value)}
                    required
                  />
                </FormControl>
                <Button variant="outlined" sx={{mt: 2}} onClick={() => handlePetSubmit(petObject, pet.id)}> Submit Pet Changes</Button>
                {petPut === false ? (
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
              ) : (
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

              <Typography sx={{ textAlign: "center", color: "grey" }}>Ringworm</Typography>
              <Box sx={{ border: "2px solid #b9b7b7", borderRadius: "10px", padding: "20px" }}>
                  <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                    <InputLabel htmlFor="strain">Ringworm Type</InputLabel>
                    <Input
                      type="text"
                      name="strain"
                      value={ringwormObject.ringworm_type}
                      onChange={(e) => handleRingwormObjectChange("ringworm_type", e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
                    <InputLabel htmlFor="diag-date">Diagnosis Date</InputLabel>
                    <Input
                      type="date"
                      name="diag-date"
                      value={ringwormObject.diagnosis_date}
                      onChange={(e) => handleRingwormObjectChange("diagnosis_date", e.target.value)}
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
                  <Button variant="outlined" sx={{mt: 2}}> Submit Diagnosis Changes</Button>
              </Box>

              <Typography sx={{ textAlign: "center", color: "grey", mt: 5 }}>Medications</Typography>
              <Box sx={{ border: "2px solid #b9b7b7", borderRadius: "10px", padding: "20px" }}>
                <Stack direction="column">
                  <div>{medCards}</div>
                </Stack>
                <Button  sx={{mt: 2}}
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
                Add Medication</Button>
                <Button variant="outlined" sx={{mt: 2}}> Submit Medication Changes</Button>
              </Box>
            </Box>
          </Container>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
