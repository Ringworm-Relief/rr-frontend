import React, { useState, useEffect } from "react";
import {
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
  TextField,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { getSingleThread, postPost } from "../../../../apiCalls/forumApiCalls";
import { useParams, Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  user: any;
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

export default function ForumThread({ user }: Props) {
  const [thread, setThread] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { category, id } = useParams();
  const [newPost, setNewPost] = useState<any>({
    post_content: "",
    user_id: user.data.id,
    first_name: user.data.attributes.first_name,
    last_name: user.data.attributes.last_name,
    up_votes: 0,
    down_votes: 0,
  });

  console.log("thread", thread);
  const displayThread = () => {
    getSingleThread(category, id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setThread(data[0]);
        setPosts(data[0].posts);
      })
      .catch((error) => {
        console.error("Error adding new thread:", error);
      });
  };

  useEffect(() => {
    displayThread();
  }, []);

  const handleSubmitPost = () => {
    postPost(newPost, id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((addedPost) => {
        return getSingleThread(category, id);
      })
      .then((updatedThread) => updatedThread.json())
      .then((data) => {
        setThread(data[0]);
        setPosts(data[0].posts);
        setNewPost({
          content: "",
          user_id: user.data.id,
          first_name: user.data.attributes.first_name,
          last_name: user.data.attributes.last_name,
          up_votes: 0,
          down_votes: 0,
        });
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error adding new thread:", error);
      });
  };

  return (
    <Container sx={{ mb: 30 }}>
      <Card sx={{ minWidth: 500, minHeight: 200, position: "relative", mt: 3 }}>
        <CardContent>
          <CardActionArea>
            <Typography gutterBottom variant="h4" component="div">
              {thread.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {thread.root_content}
            </Typography>
          </CardActionArea>
          <Box
            display="flex"
            flexDirection="row"
            sx={{ mt: 5 }}
            justifyContent="space-between"
          >
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
            <Box display="flex" flexDirection="row">
              <Typography>{thread.up_votes}</Typography>
              <ThumbUpAltIcon sx={{ mx: 0.5 }} />
              <Typography>{thread.down_votes}</Typography>
              <ThumbDownAltIcon sx={{ ml: 0.5 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add to the conversation!
          </Typography>
          <Stack>
            <TextField
              id="filled-multiline-static"
              label="Body text"
              multiline
              required
              rows={4}
              value={newPost.post_content}
              onChange={(e) =>
                setNewPost({ ...newPost, post_content: e.target.value })
              }
              variant="filled"
            />
          </Stack>
          <Box
            sx={{
              mt: 2,
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
              onClick={handleSubmitPost}
              endIcon={<SendIcon />}
            >
              Post
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
        {posts.length && (
          <Button
            variant="outlined"
            sx={{ mt: 7 }}
            onClick={() => setOpen(true)}
          >
            Add your comment
          </Button>
        )}
        {posts.length ? (
          posts.map((post) => (
            <Grid item key={post.id}>
              <Card
                sx={{ minWidth: 500, minHeight: 200, position: "relative" }}
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
                        Member User {post.user_id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Posted{" "}
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Typography>
                    </Box>
                  </Box>
                  <CardActionArea>
                    <Typography variant="body1" color="text.secondary">
                      {post.post_content}
                    </Typography>
                  </CardActionArea>
                  <Box
                    display="flex"
                    flexDirection="row"
                    sx={{ mt: 5 }}
                    justifyContent="space-between"
                  >
                    <Box display="flex" flexDirection="row">
                      <Typography>{post.up_votes}</Typography>
                      <ThumbUpAltIcon sx={{ mx: 0.5 }} />
                      <Typography>{post.down_votes}</Typography>
                      <ThumbDownAltIcon sx={{ ml: 0.5 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Button
            variant="outlined"
            sx={{ my: 10 }}
            onClick={() => setOpen(true)}
          >
            Be the first to comment
          </Button>
        )}
      </Grid>
    </Container>
  );
}
