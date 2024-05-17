import { useNavigate } from "react-router-dom";import React from 'react';
interface Props {
  user: any;
}

function Calendar({ user }: Props) {
  const navigate = useNavigate();

  return (
    <>
      {user.id ? (
        <>
          <h1>Calendar</h1>
          <h2>{user.id}</h2>
        </>
      ) : (
        navigate("/account/signin")
      )}
    </>
  );
}

export default Calendar;
