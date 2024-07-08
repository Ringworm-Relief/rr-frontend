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
import { getThreads, postThread, deleteThread } from "../../../../apiCalls/forumApiCalls";
import { useNavigate, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

export default function ForumThread(user: any) {


    return (
        <div>
        <h1>Forum Thread</h1>
        </div>
    );
};