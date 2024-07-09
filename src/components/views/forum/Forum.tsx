import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
  InputLabel,
  CardMedia,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getThreads,
  postThread,
  deleteThread,
} from "../../../apiCalls/forumApiCalls";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "../../subComps/quill/quillTextEditor.css";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

interface Props {
  user: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90%",
  bgcolor: "background.paper",
  borderRadius: "10px",
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
    down_votes: 0,
  });

  const quill = useRef<QuillEditor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setThreadsByCategory();
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((addedThread) => {
        return getThreads(newThread.category);
      })
      .then((updatedThreads) => updatedThreads.json())
      .then((data) => {
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
          down_votes: 0,
        });
      })
      .catch((error) => {
        console.error("Error adding new thread:", error);
      });
  };

  const handleDelete = (id: number | null) => {
    deleteThread(id)
      .then((response) => {
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
      .then((updatedThreads) => updatedThreads.json())
      .then((data) => {
        setThreads(data.reverse());
        if (filter === "Cleaning") {
          setThreadsCleaning(data);
        } else if (filter === "General") {
          setThreadsGeneral(data);
        } else {
          setThreadsTreatment(data);
        }
      })
      .catch((error) => {
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

  const createMarkup = (content: string) => {
    return {
      __html: DOMPurify.sanitize(content),
    };
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;
          console.log(reader)
          if (quill.current) {
            const quillEditor = quill.current.getEditor();
            const range = quillEditor.getSelection(true);
            quillEditor.insertEmbed(range.index, "image", imageUrl);
            // quillEditor.formatText(0, 1, 'width', '100px'); //to limit the width
          }
        };
        reader.readAsDataURL(file);
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },

    }),
    [imageHandler]
  );
  
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <Box sx={{ height: "150vh", backgroundColor: "#eeeeee" }}>
      <Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={4}>
              <FormControl variant="outlined" required fullWidth>
                <InputLabel
                  id="select-outlined-label"
                  htmlFor="select-category"
                >
                  Category
                </InputLabel>
                <Select
                  label="Category"
                  id="select-category"
                  value={newThread.category}
                  required
                  onChange={(e) =>
                    setNewThread({ ...newThread, category: e.target.value })
                  }
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
                id="title-textarea"
                label="Title"
                placeholder="Placeholder"
                multiline
                variant="outlined"
                sx={{ my: 2 }}
                required
                value={newThread.title}
                onChange={(e) =>
                  setNewThread({ ...newThread, title: e.target.value })
                }
              />
              <div className="wrapper">
                <label className="label">Body</label>
                <QuillEditor
                  ref={(el) => (quill.current = el)}
                  className="editor"
                  theme="snow"
                  formats={formats}
                  modules={modules}
                  value={newThread.root_content}
                  onChange={(value) =>
                    setNewThread({ ...newThread, root_content: value })
                  }
                />
              </div>
            </Stack>
            <Box
              sx={{
                mt: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitThread}
                endIcon={<SendIcon />}
              >
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
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button variant="outlined" onClick={() => setDeleteOpen(false)}>
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => handleDelete(threadToDelete)}
                endIcon={<DeleteIcon />}
              >
                Delete thread
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
      <Grid container spacing={2} sx={{ px: 6 }}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} sx={{ mt: 4 }}>
          <Card sx={{ mb: 2, height: 220, p: 2 }}>
            <Typography sx={{ my: 2 }} variant="h4">
              Community Forum
            </Typography>
            <Typography color="#636363">
              Use this forum to connect with other pet parents going through the
              same experience. Find answers to your questions about cleaning,
              treatment, or general information around ringworm. Please be
              respectful of others and do not share personal information. Be
              kind, curtious, and considerate, and remember that we are all in
              this together.
            </Typography>
          </Card>
          <Card sx={{ mb: 5 }}>
            <Tabs
              value={filter}
              onChange={handleChange}
              aria-label="forum categories"
              centered
              sx={{ py: 2 }}
            >
              <Tab value="Cleaning" label="Cleaning" />
              <Tab value="General" label="General" />
              <Tab value="Treatment" label="Treatment" />
            </Tabs>
          </Card>
          {threads.map((thread) => (
            <Card
              sx={{
                height: 250,
                position: "relative",
                mb: 5,
              }}
            >
              <CardContent>
                <Box display="flex" flexDirection="row">
                  <AccountCircleIcon
                    fontSize="large"
                    color="primary"
                    sx={{ mr: 1 }}
                  ></AccountCircleIcon>
                  <Box>
                    <Typography variant="body2">
                      Member User {thread.first_name}
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
                <CardActionArea
                  onClick={() =>
                    navigate(`/threads/${thread.category}/${thread.id}`)
                  }
                >
                  <Typography gutterBottom variant="h6" component="div">
                    {thread.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    dangerouslySetInnerHTML={createMarkup(thread.root_content)}
                  />
                </CardActionArea>
                <Box
                  display="flex"
                  flexDirection="row"
                  sx={{ mt: 5 }}
                  justifyContent="space-between"
                >
                  <Box display="flex" flexDirection="row">
                    <ChatOutlinedIcon></ChatOutlinedIcon>
                    <Typography sx={{ mr: 1 }}>
                      {thread.posts.length}
                    </Typography>
                    <ThumbUpAltIcon sx={{ mx: 0.5 }} />
                    <Typography sx={{ mr: 1 }}>{thread.up_votes}</Typography>
                    <ThumbDownAltIcon sx={{ ml: 0.5 }} />
                    <Typography sx={{ ml: 0.5 }}>
                      {thread.down_votes}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              {user.data.id === thread.user_id && (
                <Box position="absolute" top={8} right={8}>
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setThreadToDelete(thread.id);
                      setDeleteOpen(true);
                    }}
                  />
                </Box>
              )}
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ mt: 4 }}>
          <Card
            sx={{ width: "100%", mb: 5, p: 1 }}
            onClick={() => setOpen(true)}
          >
            <CardActionArea sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h6" color="primary" mr={2}>
                Start new thread
              </Typography>
              <AddCircleOutlineIcon color="primary"></AddCircleOutlineIcon>
            </CardActionArea>
          </Card>
          <Card
            sx={{ width: "100%", mb: 5, p: 1 }}
            onClick={() => navigate(`/threads/byme/${user.data.id}`)}
          >
            <CardActionArea
              sx={{ display: "flex", flexDirection: "row" }}
              disabled
            >
              <Typography variant="h6" color="#636363" mr={2}>
                My Threads
              </Typography>
              <StarBorderIcon color="disabled"></StarBorderIcon>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%", mb: 5, p: 1 }}>
            <CardActionArea
              sx={{ display: "flex", flexDirection: "row" }}
              disabled
            >
              <Typography variant="h6" color="#636363" mr={2}>
                My Favorites
              </Typography>
              <StarBorderIcon color="disabled"></StarBorderIcon>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
