import {
  InputLabel,
  Input,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import { Medication } from "../../../utils/interfaces";

interface Props {
  medObject: Medication;
  setMedObject: (field: keyof Medication, value: string) => void;
  number: number;
}

export default function ManageMedCards({ medObject, setMedObject, number }: Props) {
  return (
    <>
      <FormControl variant="standard" sx={{ mt: 2,  width: "100%" }}>
        <InputLabel htmlFor="name">{`Med ${number} Name`}</InputLabel>
        <Input
          type="text"
          name="name"
          value={medObject.name}
          onChange={(e) => setMedObject("name", e.target.value)}
          required
        />
      </FormControl>

      <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
        <InputLabel htmlFor="medType">Med Type</InputLabel>
        <Select
          labelId="medType"
          id="medType"
          value={medObject.medication_type} // Default to empty string if not set
          onChange={(e) => setMedObject("medication_type", e.target.value)}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Oral">Oral</MenuItem>
          <MenuItem value="Topical">Topical</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
        <InputLabel htmlFor="dosage">Dosage</InputLabel>
        <Input
          type="text"
          name="dosage"
          value={medObject.dosage}
          onChange={(e) => setMedObject("dosage", e.target.value)}
          required
        />
      </FormControl>

      <FormControl variant="standard" sx={{ mt: 5, width: "100%" }}>
        <InputLabel htmlFor="frequency">Frequency</InputLabel>
        <Select
          labelId="frequency"
          id="frequency"
          value={medObject.frequency}
          onChange={(e) => setMedObject("frequency", e.target.value)}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Bi-weekly">Bi-weekly</MenuItem>
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Every 12 hours">Every 12 hours</MenuItem>
          <MenuItem value="Every 8 hours">Every 8 hours</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
