import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Modal,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { getThreads, postThread, deleteThread } from "../../../apiCalls/forumApiCalls";
import { useNavigate, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface Props {
  user: any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Forum({ user }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [threadToDelete, setThreadToDelete] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("General");
  const [threadsGeneral, setThreadsGeneral] = useState<any[]>([]);
  const [threadsCleaning, setThreadsCleaning] = useState<any[]>([]);
  const [threadsTreatment, setThreadsTreatment] = useState<any[]>([]);
  const [threads, setThreads] = useState<any[]>([]);
  const [newThread, setNewThread] = useState<any>({
    title: "",
    category: "",
    root_content: "",
    user_id: user.data.id,
    first_name: user.data.attributes.first_name,
    last_name: user.data.attributes.last_name,
    up_votes: 0,
    down_votes: 0
  });

  console.log("threads", threads)
  const navigate = useNavigate();

  useEffect(() => {
    setThreadsByCategory()
  }, []);

  const setThreadsByCategory = () => {
    Promise.all([
      getThreads("General"),
      getThreads("Cleaning"),
      getThreads("Treatment"),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(([generalData, cleaningData, treatmentData]) => {
        setThreadsGeneral(generalData);
        setThreadsCleaning(cleaningData);
        setThreadsTreatment(treatmentData);
        setThreads(generalData.reverse());
      })
      .catch((error) => {
        console.error("Error fetching threads:", error);
      });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
    navigate(`/forum/${newValue.toLowerCase()}`);
    if (newValue === "Cleaning") {
      setThreads(threadsCleaning.reverse());
    } else if (newValue === "Treatment") {
      setThreads(threadsTreatment.reverse());
    } else {
      setThreads(threadsGeneral.reverse());
    }
  };

  const handleSubmitThread = () => {
    postThread(newThread)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(addedThread => {
        return getThreads(newThread.category);
      })
      .then(updatedThreads => updatedThreads.json())
      .then(data => {
        setThreads(data.reverse());
        if (newThread.category === "Cleaning") {
          setThreadsCleaning(data);
        } else if (newThread.category === "General") {
          setThreadsGeneral(data);
        } else {
          setThreadsTreatment(data);
        }
        setOpen(false);
        navigate(`/forum/${newThread.category.toLowerCase()}`);
        setFilter(newThread.category);
        setNewThread({
          title: "",
          category: "",
          root_content: "",
          user_id: user.data.id,
          first_name: user.data.attributes.first_name,
          last_name: user.data.attributes.last_name,
          up_votes: 0,
          down_votes: 0
        });
      })
      .catch(error => {
        console.error("Error adding new thread:", error);
      });
  };

  const handleDelete = (id: number | null) => {
    deleteThread(id)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setDeleteOpen(false);
        setThreadToDelete(null);
        return getThreads(filter);
      })
      .then(updatedThreads => updatedThreads.json())
      .then(data => {
        setThreads(data.reverse());
        if (filter === "Cleaning") {
          setThreadsCleaning(data);
        } else if (filter === "General") {
          setThreadsGeneral(data);
        } else {
          setThreadsTreatment(data);
        }
      })
      .catch(error => {
        console.error("Error deleting thread:", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setThreadToDelete(null);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
        <Typography sx={{ mb: 2 }} variant="h4">
          Find Support Here
        </Typography>
        <Button onClick={() => setOpen(true)}>Start new thread</Button>
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
        <Box></Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add to the conversation!
          </Typography>
          <Stack>
            <FormControl variant="filled" sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-filled-label">Thread category</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newThread.category}
                required
                onChange={e => setNewThread({ ...newThread, category: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Cleaning">Cleaning</MenuItem>
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Treatment">Treatment</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="filled-textarea"
              label="Thread title"
              placeholder="Placeholder"
              multiline
              variant="filled"
              sx={{ my: 2 }}
              required
              value={newThread.title}
              onChange={e => setNewThread({ ...newThread, title: e.target.value })}
            />
            <TextField
              id="filled-multiline-static"
              label="Body text"
              multiline
              required
              rows={4}
              value={newThread.root_content}
              onChange={e => setNewThread({ ...newThread, root_content: e.target.value })}
              variant="filled"
            />
          </Stack>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="contained" onClick={handleSubmitThread} endIcon={<SendIcon />}>
              Post
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you would like to delete your thread?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => setDeleteOpen(false)}>
              Close
            </Button>
            <Button variant="contained" onClick={() => handleDelete(threadToDelete)} endIcon={<DeleteIcon />}>
              Delete thread
            </Button>
          </Box>
        </Box>
      </Modal>
       <Grid
        sx={{ mb: 5 }}
        container
        spacing={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {threads.map((thread) => (
          <Grid item key={thread.id}>
              <Card sx={{ minWidth: 500, minHeight: 200, position: 'relative' }}>
                <CardContent>
                  <Box display="flex" flexDirection="row">
                    <AccountCircleIcon
                      fontSize="large"
                      color="primary"
                      sx={{ mr: 1 }}
                    ></AccountCircleIcon>
                    <Box>
                      <Typography variant="body2">
                        Member User {thread.user_id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Posted{" "}
                        {new Date(thread.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Typography>
                    </Box>
                  </Box>
                  <CardActionArea onClick={() => navigate(`/threads/${thread.category}/${thread.id}`)}>
                    <Typography gutterBottom variant="h6" component="div">
                      {thread.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {thread.root_content}
                    </Typography>
                  </CardActionArea>
                  <Box display="flex" flexDirection="row" sx={{ mt: 5 }} justifyContent="space-between">
                    <Box display="flex" flexDirection="row">
                      <ChatOutlinedIcon></ChatOutlinedIcon>
                      <Typography sx={{ ml: 0.5 }}>
                        {thread.posts.length}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row">
                      <Typography>
                        {thread.up_votes}
                      </Typography>
                      <ThumbUpAltIcon sx={{ mx: 0.5 }} />
                      <Typography>
                        {thread.down_votes}
                      </Typography>
                      <ThumbDownAltIcon sx={{ ml: 0.5 }} />
                    </Box>
                  </Box>
                </CardContent>
                {user.data.id === thread.user_id && (
                  <Box position="absolute" top={8} right={8}>
                    <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => {
                      setThreadToDelete(thread.id);
                      setDeleteOpen(true);
                    }} />
                  </Box>
                )}
              </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
