import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Tabs, Tab, Typography, Box, Container, Grid, Card, CardContent, CardMedia, CardActionArea, Chip } from '@mui/material';
import { getThreads } from "../../../apiCalls/forumApiCalls"

interface Props {
  user: any
}
export default function Forum({ user }: Props) {
  const [filter, setFilter] = useState<String>('General');
  const [threadsGeneral, setThreadsGeneral] = useState<any[]>([])
  const [threadsCleaning, setThreadsCleaning] = useState<any[]>([])
  const [threadsTreatment, setThreadsTreatment] = useState<any[]>([])
  const [threads, setThreads] = useState<any[]>(threadsGeneral)
  
  // useEffect(() => {
  //   getThreads().then((data) => {
  //     setThreadsGeneral(data.filter((thread: any) => thread.category === 'General'))
  //     setThreadsCleaning(data.filter((thread: any) => thread.category === 'Cleaning'))
  //     setThreadsTreatment(data.filter((thread: any) => thread.category === 'Treatment'))
  //   })
  // }, [])
  // Handle tab changes
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
    if (newValue === "Cleaning") {
      setThreads(threadsCleaning)
      new URL(`http://localhost:3000/forum/cleaning`)
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
    <>
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
    <Grid container spacing={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
      {threads.map((thread) => (
        <Grid item >
          <Card sx={{ minWidth: 500, minHeight: 200 }}>
              <CardContent>
                <Box display="flex" flexDirection="row">
                <AccountCircleIcon fontSize='large' color="primary" sx={{ mr: 1 }}></AccountCircleIcon>
                  <Box>
                <Typography variant='body2' >
                  Member User
                </Typography>
                <Typography variant='body2' color="text.secondary">
                  Posted {new Date(thread.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Typography>
                </Box>
                </Box>
            <CardActionArea>
                <Typography gutterBottom variant="h6" component="div">
                  {thread.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {thread.root_content}
                </Typography>
            </CardActionArea>
            <Box display="flex" flexDirection="row" sx={{ mt: 5 }}>
              <ChatOutlinedIcon></ChatOutlinedIcon>
              <Typography>{thread.posts.content !== null ? thread.posts.length : "0"}</Typography>
            </Box>
              </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
}
