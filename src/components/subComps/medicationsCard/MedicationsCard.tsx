// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
//   Button,
//   FormHelperText,
//   Modal,
//   Box
// } from "@mui/material";
// import { alpha, styled } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
// import React, { useState } from "react";
// import { Medication } from "../../../utils/interfaces";


// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 8,
// };

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   "label + &": {
//     marginTop: theme.spacing(3),
//   },
//   "& .MuiInputBase-input": {
//     borderRadius: 25,
//     position: "relative",
//     backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
//     border: "1px solid",
//     borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
//     fontSize: 16,
//     color: "black",
//     width: "300px",
//     padding: "10px 12px",
//     transition: theme.transitions.create([
//       "border-color",
//       "background-color",
//       "box-shadow",
//     ]),

//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }));

// interface Props {
//   medObject: Medication;
//   setMedObject: (field: any, value: any) => void
//   number: number
// }

// function MedicationsCard({ medObject, setMedObject, number }: Props) {
//   return (
//     <Box
//         component="form"
//         noValidate
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           marginBottom: "30px",
//         }}
//       >
    
//       <FormControl variant="standard" sx={{ marginTop: "20px" }}>
//         <InputLabel
//           shrink
//           htmlFor="medication-field"
//           sx={{ marginLeft: "20px", fontSize: "20px" }}
//         >
//           Medication {number}
//         </InputLabel>
//         <BootstrapInput
//           value={medObject.name}
//           onChange={(e) => setMedObject({ ...medObject, name: e.target.value })}
//           inputProps={{ placeholder: "Enter medication name" }}
//           id="medication-field"
//         />
//       </FormControl>

//       <FormControl variant="standard" sx={{ marginTop: "20px" }}>
//         <InputLabel
//           shrink
//           htmlFor="medication-type-field"
//           sx={{ marginLeft: "20px", fontSize: "20px" }}
//         >
//           Medication type
//         </InputLabel>

//         <Select
//           defaultValue=""
//           value={medObject.medication_type}
//           onChange={(e) =>
//             setMedObject({ ...medObject, medication_type: e.target.value })
//           }
//           id="medication-type-field"
//           label="Select medication type"
//           input={<BootstrapInput />}
//           sx={{ width: "100%" }}
//         >
//           <MenuItem value="" disabled>
//             Select medication type
//           </MenuItem>
//           <MenuItem value="oral">Oral</MenuItem>
//           <MenuItem value="topical">Topical</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl variant="standard" sx={{ marginTop: "20px" }}>
//         <InputLabel
//           shrink
//           htmlFor="dosage-field"
//           sx={{ marginLeft: "20px", fontSize: "20px" }}
//         >
//           Dosage
//         </InputLabel>
//         <BootstrapInput
//           value={medObject.dosage}
//           onChange={(e) =>
//             setMedObject({ ...medObject, dosage: e.target.value })
//           }
//           inputProps={{ placeholder: "Enter dosage" }}
//           id="dosage-field"
//         />
//       </FormControl>

//       <FormControl variant="standard" sx={{ marginTop: "20px" }}>
//         <InputLabel
//           shrink
//           htmlFor="frequency-field"
//           sx={{ marginLeft: "20px", fontSize: "20px" }}
//         >
//           Frequency
//         </InputLabel>

//         <Select
//           defaultValue=""
//           id="frequency-field"
//           label="Select medication type"
//           input={<BootstrapInput />}
//           sx={{ width: "100%" }}
//           value={medObject.frequency}
//           onChange={(e) =>
//             setMedObject({
//               ...medObject,
//               frequency: e.target.value,
//             })
//           }
//         >
//           <MenuItem value="" disabled>
//             Select medication frequency
//           </MenuItem>
//           <MenuItem value="oral">Weekly</MenuItem>
//           <MenuItem value="topical">Bi-weekly</MenuItem>
//           <MenuItem value="oral">Daily</MenuItem>
//           <MenuItem value="topical">Every 12 hours</MenuItem>
//           <MenuItem value="oral">Every 8 hours</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

// export default MedicationsCard;

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  FormHelperText,
  Modal,
  Box
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import React, { useState } from "react";
import { Medication } from "../../../utils/interfaces";
  
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
    medObject: Medication;
    setMedObject: (field: keyof Medication, value: string) => void;
    number: number;
  }
  
  function MedicationsCard({ medObject, setMedObject, number }: Props) {
    return (
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
        <FormControl variant="standard" sx={{ marginTop: "20px" }}>
          <InputLabel
            shrink
            htmlFor="medication-field"
            sx={{ marginLeft: "20px", fontSize: "20px" }}
          >
            Medication {number}
          </InputLabel>
          <BootstrapInput
            value={medObject.name}
            onChange={(e) => setMedObject("name", e.target.value)}
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
            value={medObject.medication_type}
            onChange={(e) => setMedObject("medication_type", e.target.value)}
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
            value={medObject.dosage}
            onChange={(e) => setMedObject("dosage", e.target.value)}
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
            value={medObject.frequency}
            onChange={(e) => setMedObject("frequency", e.target.value)}
            id="frequency-field"
            label="Select medication frequency"
            input={<BootstrapInput />}
            sx={{ width: "100%" }}
          >
            <MenuItem value="" disabled>
              Select medication frequency
            </MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="bi-weekly">Bi-weekly</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="every-12-hours">Every 12 hours</MenuItem>
            <MenuItem value="every-8-hours">Every 8 hours</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }
  
  export default MedicationsCard;
  