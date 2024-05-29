export const fetchCalendarEvents = (user_id: string, token: string) => {
  return fetch(
    `https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/${user_id}/calendar_events`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}` 
      },
    }
  ).then((response) => {
      return response.json();
  });
};

export const destroyCalendarEvent = (user_id: string, event_id: string, token: string) => {
  return fetch(
    `https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/${user_id}/calendar_events/${event_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}` 
      },
    }
  ).then((response) => {
      return response.json();
  });
}