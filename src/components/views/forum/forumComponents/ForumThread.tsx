import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import {
  getSingleThread,
  postPost,
  deletePost,
  postThread,
  updatePostVotes,
} from "../../../../apiCalls/forumApiCalls";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  user: any;
}

export default function ForumThread({ user }: Props) {
  const [thread, setThread] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [userVotes, setUserVotes] = useState<{
    [key: string]: { up_votes: boolean | null; down_votes: boolean | null };
  }>({});
  const [threadVote, setThreadVote] = useState<{
    up_votes: boolean;
    down_votes: boolean;
  }>({
    up_votes: false,
    down_votes: false,
  });
  const { category, id } = useParams();
  const [newPost, setNewPost] = useState<any>({
    content: "",
    user_id: user.data.id,
    first_name: user.data.attributes.first_name,
    last_name: user.data.attributes.last_name,
    up_votes: 0,
    down_votes: 0,
  });

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
        const initialVotes = data[0].posts.reduce((acc: any, post: any) => {
          acc[post.id] = { up_votes: false, down_votes: false };
          return acc;
        }, {});
        setUserVotes(initialVotes);
      })
      .catch((error) => {
        console.error("Error adding new thread:", error);
      });
  };

  const handleDeletePost = (postId: string) => {
    deletePost(postId)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting post");
        }
        return response.json();
      })
      .then(() => {
        displayThread();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  useEffect(() => {
    displayThread();
  }, [user]);

  const handleSubmitPost = () => {
    postPost(newPost, id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => displayThread())
      .then(() => {
        setNewPost({
          content: "",
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

  const handleThreadUpVote = () => {
    if (!threadVote.up_votes && !threadVote.down_votes) {
      const updatedThread = { ...thread, up_votes: thread.up_votes + 1 };

      postThread(updatedThread)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          setThreadVote({ up_votes: true, down_votes: false });
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
        });
    }
  };

  const handleThreadDownVote = () => {
    if (!threadVote.up_votes && !threadVote.down_votes) {
      const updatedThread = { ...thread, down_votes: thread.down_votes + 1 };

      postThread(updatedThread)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          setThreadVote({ up_votes: false, down_votes: true });

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
        });
    }
  };

  const handleUpVote = (postId: string) => {
    if (!userVotes[postId]?.up_votes && !userVotes[postId]?.down_votes) {
      const updatedPost = posts.find((post) => post.id === postId);
      const newObject = { ...updatedPost, up_votes: updatedPost.up_votes + 1 };
      updatePostVotes(postId, newObject)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          setUserVotes((prevVotes) => ({
            ...prevVotes,
            [postId]: { down_votes: false, up_votes: true },
          }));
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
        })
        .catch((error) => {
          console.error("Error updating post votes:", error);
        });
    }
  };

  const handleDownVote = (postId: string) => {
    if (!userVotes[postId]?.up_votes && !userVotes[postId]?.down_votes) {
      const updatedPost = posts.find((post) => post.id === postId);
      const newObject = {
        ...updatedPost,
        down_votes: updatedPost.down_votes + 1,
      };
      updatePostVotes(postId, newObject)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          setUserVotes((prevVotes) => ({
            ...prevVotes,
            [postId]: { down_votes: true, up_votes: false },
          }));
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
        })
        .catch((error) => {
          console.error("Error updating post votes:", error);
        });
    }
  };

  return (
    <Container>
      <Card sx={{ my: 3, position: "relative" }}>
        <CardContent>
          <Typography variant="h4">{thread.title}</Typography>
          <Typography variant="h6" color="text.secondary">
            {thread.root_content}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
            <AccountCircleIcon
              fontSize="large"
              color="primary"
              sx={{ fontSize: 60, mr: 1 }}
            />
            <Box ml={2}>
              <Typography variant="body2">
                <strong>{`${thread.first_name} ${thread.last_name}`}</strong>
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
        </CardContent>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ position: "absolute", left: 1040, top: 20 }}
        >
          <Typography>{thread.up_votes}</Typography>
          <ThumbUpOffAltIcon
            sx={{ mx: 0.5, cursor: "pointer" }}
            color={threadVote.up_votes ? "primary" : "inherit"}
            onClick={handleThreadUpVote}
          />
          <Typography>{thread.down_votes}</Typography>
          <ThumbDownOffAltIcon
            sx={{ mx: 0.5, cursor: "pointer" }}
            color={threadVote.down_votes ? "primary" : "inherit"}
            onClick={handleThreadDownVote}
          />
        </Box>
      </Card>

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ mb: 2 }} variant="h5">
        Comments ({posts.length})
      </Typography>

      {posts.map((post, index) => (
        <Card
          key={post.id}
          sx={{
            bgcolor: index % 2 === 0 ? "grey.100" : "background.paper",
            borderRadius: 0,
            boxShadow: "none",
            my: 1,
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "flex-start" }}>
            <Box sx={{ position: "relative", mr: 2 }}>
              <AccountCircleIcon
                fontSize="large"
                color="primary"
                sx={{ fontSize: 50 }}
              />
              <Box
                display="flex"
                flexDirection="row"
                sx={{ position: "absolute", left: 1030, bottom: 30 }}
              >
                <Typography>{post.up_votes}</Typography>
                <ThumbUpOffAltIcon
                  sx={{ mx: 0.5, cursor: "pointer" }}
                  color={userVotes[post.id].up_votes ? "primary" : "inherit"}
                  onClick={() => handleUpVote(post.id)}
                />
                <Typography>{post.down_votes}</Typography>
                <ThumbDownOffAltIcon
                  sx={{ ml: 0.5, cursor: "pointer" }}
                  color={userVotes[post.id].down_votes ? "primary" : "inherit"}
                  onClick={() => handleDownVote(post.id)}
                />
              </Box>
              {post.user_id === user.data.id && (
                <DeleteIcon
                  onClick={() => handleDeletePost(post.id)}
                  sx={{
                    position: "absolute",
                    left: 1000,
                    bottom: 30,
                    cursor: "pointer",
                  }}
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "2px",
                  bgcolor: "grey.400",
                  zIndex: -1,
                }}
              />
            </Box>
            <Box>
              <Typography variant="body2">
                <strong>{`${post.first_name} ${post.last_name}`}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Posted{" "}
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {post.content}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          p: 2,
          pb: 8,
          position: "relative",
        }}
      >
        <Box display="flex" alignItems="flex-start">
          <AccountCircleIcon
            fontSize="large"
            color="primary"
            sx={{ fontSize: 60, mt: 1, mr: 2 }}
          />
          <TextField
            label="Add a comment"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
          />
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 2, position: "absolute", right: 16, bottom: 16 }}
          onClick={handleSubmitPost}
          endIcon={<SendIcon />}
        >
          Comment
        </Button>
      </Box>
    </Container>
  );
}
