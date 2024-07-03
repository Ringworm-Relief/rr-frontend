import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography, Box, Container } from '@mui/material';
import { getThreads } from "../../../apiCalls/forumApiCalls"

export default function Forum() {
  const [filter, setFilter] = useState<String>('General');
  const [threadsGeneral, setThreadsGeneral] = useState<any[]>([])
  const [threadsCleaning, setThreadsCleaning] = useState<any[]>([])
  const [threadsTreatment, setThreadsTreatment] = useState<any[]>([])
  const [threads, setThreads] = useState<any[]>(threadsGeneral)

  // Handle tab changes
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
    if (newValue === "Cleaning") {
      setThreads(threadsCleaning)
    } else if (newValue === "Treatment") {
      setThreads(threadsTreatment)
    } else {
      setThreads(threadsGeneral)
    }
  };
  

  const setThreadsByCategory = () => {
    Promise.all([
      getThreads("General"),
      getThreads("Cleaning"),
      getThreads("Treatment")
    ]) .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([generalData, cleaningData, treatmentData]) => {
      setThreadsGeneral(generalData);
      setThreadsCleaning(cleaningData);
      setThreadsTreatment(treatmentData);
      setThreads(generalData)
    })
    .catch(error => {
      console.error('Error fetching threads:', error);
    });
  }

  useEffect(() => {
    setThreadsByCategory()
  }, [])
 
  const displayedThreads = threads.map(thread => {
    return <Typography>{thread.title}</Typography>
  })

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', my: 4 }}>
      <Typography sx={{ mb: 2 }} variant="h4">Find Support Here</Typography>
      <Tabs 
        value={filter} 
        onChange={handleChange} 
        aria-label="forum categories"
        centered
      >
        <Tab value="Cleaning" label="Cleaning" />
        <Tab value="General" label="General" />
        <Tab value="Treatment" label="Treatment" />
      </Tabs>
      <Box>
        {displayedThreads}
      </Box>
    </Container>
  );
}
