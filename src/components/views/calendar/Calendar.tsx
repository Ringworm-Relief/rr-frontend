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
  DragAndDrop,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import {
  destroyCalendarEvent,
  fetchCalendarEvents,
} from "../../../apiCalls/calendarApiCalls";
import { Alert, Card, Collapse, Grid, Stack } from "@mui/material";
import DashboardManageAccount from "../mainDashboard/dashboardComponents/AddManageCards";
import { parse } from "path";
interface Props {
  user: any;
  pets: any[];
}

const colors: string[] = [
  "#cb6bb2",
  "#56ca85",
  "#df5286",
  "#f7b84b",
  "#198675",
  "#b7d7e8",
  "#e0a7a7",
  "#8e8cd8",
  "#f57f17",
];
interface ScheduleEvent {
  PetId: number;
  Id: number;
  Subject: string;
  Description: string;
  StartTime: Date;
  EndTime: Date;
  ResourceId: number;
}
interface ApiEvent {
  id: string;
  type: string;
  attributes: {
    pet_id: string;
    user_id: string;
    subject: string;
    description: string;
    start_time: string;
    end_time: string;
    resource_id: string;
  };
}

const transformToApiFormat = (event: ScheduleEvent, userId: number) => {
  return {
    data: {
      type: "calendar_event",
      attributes: {
        user_id: userId,
        description: event.Description,
        start_time: event.StartTime.toString(),
        end_time: event.EndTime.toString(),
        subject: event.Subject,
        pet_id: event.PetId,
        resource_id: event.ResourceId,
      },
    },
  };
};

const transformToScheduleEvent = (apiEvent: ApiEvent): ScheduleEvent => {
  // Create and return a ScheduleEvent object
  return {
    PetId: parseInt(apiEvent.attributes.pet_id),
    Id: parseInt(apiEvent.id),
    Subject: apiEvent.attributes.subject,
    Description: apiEvent.attributes.description,
    StartTime: new Date(apiEvent.attributes.start_time),
    EndTime: new Date(apiEvent.attributes.end_time),
    ResourceId: parseInt(apiEvent.attributes.resource_id),
  };
};

export default function Calendar({ user, pets }: Props) {
  const navigate = useNavigate();

  const [scheduleData, setScheduleData] = useState<ScheduleEvent[]>([]);
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const scheduleObj = useRef<ScheduleComponent>(null);
  const currentToken = sessionStorage.getItem("token") || "null";
  const windowLocation = window.location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      fetchCalendarEvents(user.data.id, currentToken)
        .then((response) => {
          // Transform API response to ScheduleEvent
          if (response.errors) {
            setError(true);
            setErrorMessage(response.errors[0].detail);
          } else {
            const newEvents = response.data.map((event: ApiEvent) => {
              return transformToScheduleEvent(event);
            });
            setScheduleData(newEvents);
          }
        })
        .catch((error) => {
          navigate("/error");
        });
      }
      fetchData();
    }, []);

    const resourceDataSource = pets.reduce((acc: any[], pet) => {
        let index = pets.indexOf(pet);
        acc.push({ Name: pet.name, Id: pet.id, Color: colors[index] }); // change value to pet ID
        return acc;
    }, []);

  const dataManager = new DataManager({ // Handling POST requests
    url: `https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/${user.data.id}/calendar_events`,
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
    headers: [
      { Authorization: `${currentToken}` },
      { "Content-Type": "application/json" },
    ],
  });

  const closePopup = (args: PopupCloseEventArgs) => {
    const save_icon = "e-save-icon e-icons";
    const save_button =
      "e-schedule-dialog e-control e-btn e-lib e-primary e-event-save e-flat";
    console.log(args.type)
      if (args.type === "QuickInfo" || args.type === "Editor" || args.event?.target) {
      const target = args.event?.target as HTMLElement;
      if (
        target.className === save_icon ||
        target.className === save_button ||
        target.className ===
          "e-event-create e-text-ellipsis e-control e-btn e-lib e-flat e-primary"
      ) {
        console.log(scheduleData.length)
        const newEvent: ScheduleEvent = {
          PetId: (args.data as any).ResourceId, // ResourceId is grabbing the pets actual ID
          Id: args.data?.Id,
          Subject: (args.data as any).Subject,
          Description: (args.data as any).Description,
          StartTime: new Date((args.data as any).StartTime),
          EndTime: new Date((args.data as any).EndTime),
          ResourceId: (args.data as any).ResourceId, // Match resource ID to pet ID
        };
        const apiFormattedEvent = transformToApiFormat(newEvent, user.data.id);
        dataManager.insert(apiFormattedEvent);
      } else if(args.type === "DeleteAlert" ) {
        destroyCalendarEvent(
          user.data.id,
          args.data?.Id.toString(),
          currentToken
        ).then((res) => {
          if (res.errors) {
            setError(true);
            setErrorMessage(res.errors[0].detail);
          }
        });
      }
    }
  };

  const dragStopEvent = (args: DragEventArgs) => {
    const newEvent: ScheduleEvent = {
      PetId: args.data.ResourceId,
      Id: args.data.Id + 1,
      Subject: args.data.Subject,
      Description: args.data.Description,
      StartTime: new Date(args.data.StartTime),
      EndTime: new Date(args.data.EndTime),
      ResourceId: args.data.ResourceId,
    };
    const apiFormattedEvent = transformToApiFormat(newEvent, user.data.id);
    dataManager.insert(apiFormattedEvent);
    window.location.reload();
  };

  const destroyDragEvent = (args: DragEventArgs): void => {
    destroyCalendarEvent(
      user.data.id,
      args.data.Id,
      currentToken
    ).then((res) => {
      if (res.errors) {
        setError(true);
        setErrorMessage(res.errors[0].detail);
      }
    });
  };

  return (
    <>
      {error && (
        <Collapse in={alertOpen}>
          <Alert
            severity="error"
            sx={{ marginTop: "20px" }}
            onClose={() => setAlertOpen(false)}
            hidden={alertOpen}
          >
            {errorMessage}
          </Alert>
        </Collapse>
      )}
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
              dragStart={destroyDragEvent}
            >
              {pets.length && (
              <ResourcesDirective>
                <ResourceDirective
                  field="ResourceId"
                  title="Pets"
                  name="Pets"
                  textField="Name"
                  idField="Id"
                  colorField="Color"
                  dataSource={resourceDataSource}
                ></ResourceDirective>
              </ResourcesDirective>
              )}
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="Month" />
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Agenda, DragAndDrop]} />
            </ScheduleComponent>
          ) : (
            <Stack>
              <Card
                sx={{
                  borderRadius: 1,
                  boxShadow: "0px 5px 10px rgba(34, 35, 58, 0.1)",
                  position: "relative",
                  padding: 3,
                  height: 370,
                  marginLeft: 0,
                  overflow: "scroll",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#9A352F",
                  backgroundImage:
                    "linear-gradient(147deg, #fea2a25a 0%, #ffc4a44f 74%)",
                  "&:after": {
                    opacity: 0.5,
                  },
                }}
              >
                <ScheduleComponent
                  currentView="Agenda"
                  eventSettings={{ dataSource: scheduleData }}
                  ref={scheduleObj}
                  popupClose={closePopup}
                  allowSwiping={true}
                  enableAllDayScroll={true}
                  allowDragAndDrop={true}
                  dragStop={dragStopEvent}
                  dragStart={destroyDragEvent}
                  // popupOpen={destroyEvent}
                  group={{ resources: ["Pets"] }}
                  width="100%"
                  height="100%"
                >
                  <ResourcesDirective>
                    <ResourceDirective
                      field="ResourceId"
                      title="Pets"
                      name="Pets"
                      textField="Name"
                      idField="Id"
                      colorField="Color"
                      dataSource={resourceDataSource}
                    ></ResourceDirective>
                  </ResourcesDirective>
                  <ViewsDirective>
                    <ViewDirective option="Day" />
                    <ViewDirective option="Agenda" />
                  </ViewsDirective>
                  <Inject services={[Day, Agenda]} />
                </ScheduleComponent>
              </Card>
        
              <DashboardManageAccount user={user} />
            </Stack>
          )}
        </>
      ) : (
        navigate("/account/signin")
      )}
    </>
  );
}
