import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  TextField,
  Button,
  Modal,
} from "@mui/material";

interface Props {
  user: any;
}

interface NewEvent {
  title: string;
  start: string;
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
  pt: 2,
  px: 4,
  pb: 3,
};

// const events = [
//   { title: 'Event 1', start: '2024-05-01' },
//   { title: 'Event 2', start: '2024-05-05' }
// ];

function Calendar({ user }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEvent>({ title: "", start: "" });
  const calendarEvents: NewEvent[] = JSON.parse(localStorage.getItem("CAL_EVENTS") || '[]');
  const [calEvents, setCalEvents] = useState(calendarEvents);

  const handleDateClick = (arg: any) => {
    setOpen(true);
    setNewEvent({ ...newEvent, start: arg.dateStr });
    console.log("date", arg.dateStr);
  };

  const handleSubmit = () => {
    setOpen(false);
    setCalEvents([...calEvents, newEvent]);
    setNewEvent({start: "", title: ""})
  };

  useEffect(() => {
    const calendarEvents: NewEvent[] = JSON.parse(localStorage.getItem("CAL_EVENTS") || '[]');
    setCalEvents(calendarEvents);
  }, []); 

  useEffect(() => {
    localStorage.setItem("CAL_EVENTS", JSON.stringify(calEvents));
  }, [calEvents]); 

  return (
    <>
      <h1>Calendar</h1>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            {newEvent.start}
          </p>
          <TextField value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} id="outlined-basic" label="Outlined" variant="outlined" />
          <Button onClick={handleSubmit}>Add event</Button>
        </Box>
      </Modal>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay"
        }}
        events={calEvents}
        dateClick={handleDateClick}
      />
      {!user.id && navigate("/account/signin")}
    </>
  );
}

export default Calendar;
