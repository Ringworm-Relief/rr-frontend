import React from 'react';
interface Props  {
  user: any;
}

function Calendar({ user }: Props) {
  console.log(user.data.type)
  return (
    <div>
      <h1>Calendar</h1>
      <h2>{user.data.id}</h2>
    </div>
  );
}

export default Calendar;
