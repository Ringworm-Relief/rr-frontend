

// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   Grid,
//   Typography,
//   Divider
// } from "@mui/material";
// import Calendar from "../calendar/Calendar";
// import Kitty from "../../../assets/Kitty-profile.svg";
// import Pupper from "../../../assets/Pupper-profile.svg";
// import { formateDate2 } from "../../../utils/interfaces"

// interface Props {
//   pet: any;
//   user: any;
//   pets: any[];
// }

// export default function PetDashboard({ pet, user, pets }: Props) {

//   const style = {
//     mr: 1,
//     mt: 2,
//     borderRadius: 3,
//     boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
//     bottom: 100,
//     left: -100,
//     padding: 3,
//     width: 350,
//     height: 300,
//     marginLeft: 0,
//     overflow: "scroll",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     color: "#9A352F",
//     textAlign: "center"
//   };

//   const oralMeds = pet.medications.filter((med: any) => med.type === "Oral");
//   const topicalMeds = pet.medications.filter(
//     (med: any) => med.type === "Topical"
//   );

//   return (
//     <div className="pet-dashboard">
//       <Box
//       sx={{
//         backgroundImage:
//         "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
//       "&:after": {
//         opacity: 0.5,
//       },

//       }}
//       height="100vh"
//       >
//         <Box
//           px={10}
//           py={3}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             marginBottom: 2,
//             backgroundImage:
//               "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
//             "&:after": {
//               opacity: 0.5,
//             },
//           }}
//         >
//           <img
//             className="pet-img"
//             alt={pet.type === "Dog" ? "dog" : "cat"}
//             src={pet.type === "Dog" ? Pupper : Kitty}
//           />
//           <Typography variant="h1" sx={{ fontSize: '75px', color: "#9A352F" }}>{pet.name}</Typography>
//         </Box>
//         <Grid px={10} container spacing={2} justifyContent="center" alignItems="center">
//           <Grid item xs={12} sm={6} md={4}>
//             <Card sx={style}>
//               <CardHeader titleTypographyProps={{ fontSize: "1.8rem", fontWeight: "bold", padding: "0" }} title={`About ${pet.name}`} />
//               <CardContent>
//                 <Typography>Koki is a <strong>{pet.breed},</strong></Typography>
//                 <Typography>born on <strong>{formateDate2(pet.birthday)}.</strong></Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card sx={style}>
//               <CardHeader titleTypographyProps={{ fontSize: "1.8rem", fontWeight: "bold" }} title="Diagnosis" />
//               <CardContent>
//                 <Typography>
//                   <strong>Ringworm Type</strong> 
//                 </Typography>
//                 <Typography>
//                 {pet.ringworm?.ringworm_type || "N/A"}
//                 </Typography>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography>
//                 <strong>Diagnosis Date</strong> 
//                 </Typography>
//                 <Typography>
//                 {formateDate2(pet.ringworm?.diagnosis_date) || "N/A"}
//                 </Typography>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography>
//                 <strong>Symptoms</strong> {pet.ringworm.symptoms.map((symp: string) => {
//                   return <Typography variant="body2">- {symp}</Typography>
//                 }) || "N/A"}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card sx={style}>
//               <CardHeader titleTypographyProps={{ fontSize: "1.8rem", fontWeight: "bold" }} title="Medications" />
//               <CardContent>
//                 <Typography variant="h6" marginBottom="5px">Oral</Typography>
//                 {oralMeds.map((med: any) => (
//                   <Typography variant="body1" key={med.name}>
//                   - {med.name}: {med.dosage}
//                   </Typography>
//                 ))}
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" marginBottom="5px">Topical</Typography>
//                 {topicalMeds.map((med: any) => (
//                   <Typography variant="body1" key={med.name}>
//                    - {med.name}: {med.dosage}, {med.frequency}
//                   </Typography>
//                 ))}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </div>
//   );
// }

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Divider
} from "@mui/material";
import Calendar from "../calendar/Calendar";
import Kitty from "../../../assets/Kitty-profile.svg";
import Pupper from "../../../assets/Pupper-profile.svg";
import { formateDate2 } from "../../../utils/interfaces";

interface Props {
  pet: any;
  user: any;
  pets: any[];
}

export default function PetDashboard({ pet, user, pets }: Props) {

  const style = {
    mr: 1,
    mt: 2,
    borderRadius: 3,
    boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
    bottom: 100,
    left: -100,
    padding: 3,
    width: 350,
    height: 300,
    marginLeft: 0,
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#9A352F",
    textAlign: "center"
  };

  const oralMeds = pet.medications.filter((med: any) => med.type === "Oral");
  const topicalMeds = pet.medications.filter(
    (med: any) => med.type === "Topical"
  );

  return (
    <div className="pet-dashboard">
      <Box
        sx={{
          backgroundImage: "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
          "&:after": { opacity: 0.5 },
        }}
        height="100vh"
      >
        <Box
          px={10}
          py={3}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
            backgroundImage: "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
            "&:after": { opacity: 0.5 },
          }}
        >
          <Typography variant="h1" sx={{ fontSize: '60px', color: "#9A352F" }}>{pet.name}'s dashboard</Typography>
        </Box>
        <Grid px={10} container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={style}>
              <CardHeader
                titleTypographyProps={{ fontSize: "1.8rem", fontWeight: "bold" }}
                title={`About ${pet.name}`}
                sx={{ padding: "0 16px", marginBottom: 0 }} 
              />
              <CardContent sx={{ paddingTop: "20px" }}> 
                <img
            className="pet-img"
            alt={pet.type === "Dog" ? "dog" : "cat"}
            src={pet.type === "Dog" ? Pupper : Kitty}
          />
                <Typography>Koki is a <strong>{pet.breed},</strong></Typography>
                <Typography>born on <strong>{formateDate2(pet.birthday)}.</strong></Typography>
                <Typography sx={{ paddingTop: "15px" }}>{pet.name} has ringworm, but we're going to <strong>fix that!</strong></Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={style}>
              <CardHeader
                titleTypographyProps={{ fontSize: "1.8rem", fontWeight: "bold" }}
                title="Diagnosis"
                sx={{ padding: "0 16px", marginBottom: 0 }} 
              />
              <CardContent sx={{ paddingTop: "20px" }}> 
                <Typography><strong>Ringworm Type</strong></Typography>
                <Typography>{pet.ringworm?.ringworm_type || "N/A"}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography><strong>Diagnosis Date</strong></Typography>
                <Typography>{formateDate2(pet.ringworm?.diagnosis_date) || "N/A"}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>
                  <strong>Symptoms</strong>
                  {pet.ringworm.symptoms.map((symp: string) => (
                    <Typography variant="body2" key={symp}>• {symp}</Typography>
                  )) || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={style}>
              <CardHeader
                titleTypographyProps={{ fontSize: "1.8rem", fontWeight: "bold" }}
                title="Medications"
                sx={{ padding: "0 16px", marginBottom: 0 }} 
              />
              <CardContent sx={{ paddingTop: "20px" }}> 
                <Typography variant="h6" marginBottom="5px">Oral</Typography>
                {oralMeds.length ? oralMeds.map((med: any) => (
                  <Typography variant="body1" key={med.name}>• {med.name}: {med.dosage}, {med.frequency}</Typography>
                )) : "No oral meds listed."}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" marginBottom="5px">Topical</Typography>
                {topicalMeds.length ? topicalMeds.map((med: any) => (
                  <Typography variant="body1" key={med.name}>• {med.name}: {med.dosage}, {med.frequency}</Typography>
                )) : "No topical meds listed."}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

