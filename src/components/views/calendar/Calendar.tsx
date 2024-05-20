import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  Agenda,
  Month,
  Inject,
  PopupCloseEventArgs,
  ViewsDirective,
  ViewDirective,
  DragEventArgs,
  DragAndDrop
} from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { fetchCalendarEvents } from "../../../apiCalls/calendarApiCalls";
import { Card, Stack } from "@mui/material";
import NewPetCard from "../mainDashboard/dashboardComponents/AddManageCards";
interface Props {
  user: any;
}

interface ScheduleEvent {
  Id: number;
  Subject: string;
  Description: string;
  StartTime: Date;
  EndTime: Date;
}

interface ApiEvent {
  id: string;
  type: string;
  attributes: {
    user_id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    start_date: string;
    end_date: string;
  };
}

const transformToApiFormat = (event: ScheduleEvent, userId: number) => {
  // Because BE calendar_event breaks down into start_date and start_time, take the ScheduleEvent and break down into
  // valid startDate and startTime to send in the body request

  const startDate = event.StartTime.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const endDate = event.EndTime.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // This portion makes it so that only time is send in "HH:MM" format

  const format_options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const startTime = new Intl.DateTimeFormat("en-US", format_options).format(
    event.StartTime
  );
  const endTime = new Intl.DateTimeFormat("en-US", format_options).format(
    event.EndTime
  );

  return {
    data: {
      type: "calendar_event",
      attributes: {
        user_id: userId,
        title: event.Subject,
        description: event.Description,
        start_date: startDate, // Ensure the date is in ISO format
        end_date: endDate, // Ensure the date is in ISO format
        start_time: startTime, // Ensure the date is in ISO format
        end_time: endTime, // Ensure the date is in ISO format
      },
    },
  };
};

const transformToScheduleEvent = (apiEvent: ApiEvent): ScheduleEvent => {
  // The API response comes back with start_date and start_time that needs to be combined to make a ScheduleEvent,
  // this is the function that puts those two together to made a valid Date
  function parseDateStringWithTime(dateString: string, timeString: string) {
    const [day, month, year] = dateString.split("/").map(Number); // Split the date string into parts and convert to numbers
    const timeMatch = timeString.match(/\d+/g); // Match hours and minutes from the time string

    if (!timeMatch) {
      throw new Error("Invalid time format");
    }

    const [hours, minutes] = timeMatch.map(Number); // Extract hours and minutes from the time match

    const isPM = timeString.includes("PM"); // Check if the time is PM

    // Adjust hours if PM (assuming 12-hour format)
    let adjustedHours = hours;
    if (isPM && adjustedHours !== 12) {
      adjustedHours += 12;
    }

    // Create a new Date object with the parsed components
    return new Date(year, month - 1, day, adjustedHours, minutes);
  }

  const startDate = parseDateStringWithTime(
    apiEvent.attributes.start_date,
    apiEvent.attributes.start_time
  );
  const endDate = parseDateStringWithTime(
    apiEvent.attributes.end_date,
    apiEvent.attributes.end_time
  );

  // Create and return a ScheduleEvent object
  return {
    Id: parseInt(apiEvent.id), // Parse the string id to number
    Subject: apiEvent.attributes.title,
    Description: apiEvent.attributes.description,
    StartTime: new Date(startDate),
    EndTime: new Date(endDate),
  };
};

function Calendar({ user }: Props) {
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState<ScheduleEvent[]>([]);
  const scheduleObj = useRef<ScheduleComponent>(null);
  const currentToken = sessionStorage.getItem("token");
  const windowLocation = window.location.pathname;
  console.log(windowLocation);

  if (!currentToken) {
    throw new Error("Token is null");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCalendarEvents(user.data.id, currentToken);
        // Transform API response to ScheduleEvent
        const newEvents = response.data.map((event: ApiEvent) => {
          return transformToScheduleEvent(event);
        });
        // Every time code is edited, this is run again duplicating on the page, maybe there is a method to catch this error.
        // Changed from spread operator to fix this issue
        setScheduleData(newEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const dataManager = new DataManager({
    url: `https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/${user.data.id}/calendar_events`,
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
    headers: [
      { Authorization: `${currentToken}` },
      { "Content-Type": "application/json" },
    ],
  });

  const save_icon = "e-save-icon e-icons";
  const save_button =
    "e-schedule-dialog e-control e-btn e-lib e-primary e-event-save e-flat";

  // For future API call to delete CalendarEvent in closePopup
  const delete_event = "e-btn-icon e-icons e-delete-icon";

  const closePopup = (args: PopupCloseEventArgs) => {
    console.log("close Popup Here");
    if (args.event && args.event.target) {
      const target = args.event.target as HTMLElement;
      if (target.className === save_icon || target.className === save_button) {
        const newEvent: ScheduleEvent = {
          Id: scheduleData.length + 1,
          Subject: (args.data as any).Subject,
          Description: (args.data as any).Description,
          StartTime: new Date((args.data as any).StartTime),
          EndTime: new Date((args.data as any).EndTime),
        };
        const apiFormattedEvent = transformToApiFormat(newEvent, user.data.id);
        dataManager.insert(apiFormattedEvent);
      }
    }
  };

  const dragStopEvent = (args: DragEventArgs) => {
    const newEvent: ScheduleEvent = {
      Id: scheduleData.length + 1,
      Subject: args.data.Subject,
      Description: args.data.Description,
      StartTime: new Date(args.data.StartTime),
      EndTime: new Date(args.data.EndTime),
    };
    const apiFormattedEvent = transformToApiFormat(newEvent, user.data.id);
    dataManager.insert(apiFormattedEvent);
  }

  return (
    <>
      {user.data.id ? (
        <>
          {windowLocation.includes("calendar") ? (
            <ScheduleComponent
              eventSettings={{ dataSource: scheduleData }}
              ref={scheduleObj}
              popupClose={closePopup}
              allowSwiping={true}
              allowDragAndDrop={true}
              dragStop={dragStopEvent}
              // dragStart={(args) => dataManager.remove("Data", args)}
            >
              <ViewsDirective>
                <ViewDirective option="Day"/>
                <ViewDirective option="Week"/>
                <ViewDirective option="Month"/>
                <ViewDirective option="Agenda"/>
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Agenda, DragAndDrop]} />
            </ScheduleComponent>
          ) : (
            <Stack>
              <Card
                sx={{
                  mr: 1,
                  mt: 2,
                  borderRadius: 3,
                  boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
                  position: "relative",
                  padding: 3,
                  width: 600,
                  height: 300,
                  marginLeft: 0,
                  overflow: "scroll",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#9A352F",
                  // paddingBottom: 15,
                }}
              >
                <ScheduleComponent
                  currentView="Agenda"
                  eventSettings={{ dataSource: scheduleData }}
                  ref={scheduleObj}
                  popupClose={closePopup}
                  allowSwiping={true}
                >
                  <ViewsDirective>
                    <ViewDirective option="Day" />
                    <ViewDirective option="Agenda" />
                  </ViewsDirective>
                  <Inject services={[Day, Agenda]} />
                </ScheduleComponent>
              </Card>
              <NewPetCard user={user} />
            </Stack>
          )}
        </>
      ) : (
        navigate("/account/signin")
      )}
    </>
  );
}
export default Calendar;