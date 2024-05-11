import { Container, Box, FormControl, InputLabel, Select, MenuItem, Typography, Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import React, { useState } from "react";
import "./PetForm.css"


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 25,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '300px',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))

interface Attributes {
      user_id: number,
      name: string,
      type: string,
      breed: string,
      birthday: string,
      symptoms: string[]
}

interface Medication {
  id: number,
  pet_id: number,
  type: string,
  name: string,
  dosage: string,
  frequency: string
}

interface Ringworms {
  id: number,
  pet_id: number,
  type: string,
  diagnosis_date: string
}

interface Pet {
  id: number,
    type: string,
    attributes: Attributes,
    medications: Medication,
    ringworms: Ringworms
}

function PetForm() {
  const [petObject, setPetObject] = useState<Pet>({
    id: 1,
    type: "",
    attributes: {
      user_id: 1,
      name: "",
      type: "",
      breed: "",
      birthday: "",
      symptoms: []
    },
    medications: {
      id: 1,
      pet_id: 1,
      type: "",
      name: "",
      dosage: "",
      frequency: ""
    },
    ringworms: {
      id: 1,
      pet_id: 1,
      type: "",
      diagnosis_date: ""
    }
  }
  )


  return (
    <Container>
      <Box
      component="form"
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px'
      }}
    >
      <Typography variant="h2" sx={{ fontSize: '30px'}}>Pet intake form</Typography>
      <Typography variant="h3" sx={{ fontSize: '20px', marginTop: "20px" }}>Basics</Typography>

      <FormControl variant="standard" sx={{ marginTop: "20px"}}>
        <InputLabel shrink htmlFor="name-field"  sx={{ marginLeft: '20px' }}>
          Pet Name
        </InputLabel>
        <BootstrapInput id="name-field" inputProps={{ placeholder: 'Enter pet name' }}/>
      </FormControl>

      <FormControl variant="standard" sx={{ marginTop: "20px"}}>
          <InputLabel shrink htmlFor="type-field" sx={{ marginLeft: '20px' }}>
            Type
          </InputLabel>
          <Select
            defaultValue=""
            id="type-field"
            input={<BootstrapInput />}
            sx={{ width: '100%'}}
          >
            <MenuItem value="" disabled> 
              <em>hi</em>
            </MenuItem>
            <MenuItem value="dog">Dog</MenuItem>
            <MenuItem value="cat">Cat</MenuItem>
          </Select>
        </FormControl>

      <FormControl variant="standard" sx={{ marginTop: "20px"}}>
        <InputLabel shrink htmlFor="birthday-field" sx={{ marginLeft: '20px' }}>
          Birthday
        </InputLabel>
        <BootstrapInput id="birthday-field" type="date" />
      </FormControl>

      <FormControl variant="standard" sx={{ my: "20px"}}>
        <InputLabel shrink htmlFor="breed-field" sx={{ marginLeft: '20px' }}>
          Breed
        </InputLabel>
        <BootstrapInput id="breed-field" />
      </FormControl>

      <div className="divider"></div>
      <Typography variant="h3" sx={{ fontSize: '20px', marginTop: "20px" }}>Ringworm</Typography>

      <FormControl variant="standard" sx={{ marginTop: "20px"}}>
        <InputLabel shrink htmlFor="diagnosis-date-field" sx={{ marginLeft: '20px' }}>
          Diagnosis Date
        </InputLabel>
        <BootstrapInput id="diagnosis-date-field" type="date" />
      </FormControl>

      <FormControl variant="standard" sx={{ marginTop: "20px"}}>
        <InputLabel shrink htmlFor="strain-field" sx={{ marginLeft: '20px' }}>
          Ringworm strain 
        </InputLabel>
        <BootstrapInput id="strain-field" />
      </FormControl>

      <FormControl variant="standard" sx={{ my: "20px"}}>
        <InputLabel shrink htmlFor="symptoms-field" sx={{ marginLeft: '20px' }}>
          Symptoms
        </InputLabel>
        <BootstrapInput id="symptoms-field" inputProps={{ placeholder: 'Separate symptoms with commas' }}/>
      </FormControl>

      <div className="divider"></div>
      <Typography variant="h3" sx={{ fontSize: '20px', marginTop: "20px" }}>Medication</Typography>

      <FormControl variant="standard" sx={{ marginTop: "20px"}}>
        <InputLabel shrink htmlFor="medican-field" sx={{ marginLeft: '20px' }}>
          Medication
        </InputLabel>
        <BootstrapInput id="medication-field" />
      </FormControl>

      <FormControl variant="standard" sx={{ marginTop: "20px"}}>
          <InputLabel shrink htmlFor="bootstrap-input" sx={{ marginLeft: '20px' }}>
            Medication type
          </InputLabel>

          <Select
            defaultValue=""
            id="type-select"
            label="Select medication type"
            input={<BootstrapInput />}
            sx={{ width: '100%'}}
          >
           <MenuItem value="" disabled>
              Select medication type
            </MenuItem>
            <MenuItem value="oral">Oral</MenuItem>
            <MenuItem value="topical">Topical</MenuItem>

          </Select>
        </FormControl>

      <FormControl variant="standard" sx={{ marginTop: "20px"}}>
        <InputLabel shrink htmlFor="bootstrap-input" sx={{ marginLeft: '20px' }}>
          Dosage
        </InputLabel>
        <BootstrapInput inputProps={{ placeholder: 'Enter dosage' }}id="bootstrap-input" />
      </FormControl>

      <FormControl variant="standard" sx={{ marginTop: "20px"}}>
          <InputLabel shrink htmlFor="bootstrap-input" sx={{ marginLeft: '20px' }}>
            Frequency
          </InputLabel>

          <Select
            defaultValue=""
            id="type-select"
            label="Select medication type"
            input={<BootstrapInput />}
            sx={{ width: '100%'}}
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

        <Button variant="outlined" sx={{ marginTop: '20px' }}>Submit Form</Button>

    </Box>
    </Container>

  );
}

export default PetForm;


