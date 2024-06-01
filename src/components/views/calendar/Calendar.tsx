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
  PopupOpenEventArgs,
} from "@syncfusion/ej2-react-schedule";
// import { createElement } from "@syncfusion/ej2-base";
// import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import {
  destroyCalendarEvent,
  fetchCalendarEvents,
} from "../../../apiCalls/calendarApiCalls";
import { Card, Stack } from "@mui/material";
import { Pets } from "../../../utils/interfaces";
import NewPetCard from "../mainDashboard/dashboardComponents/AddManageCards";
interface Props {
  user: any;
  pet: any;
  pets: any[];
}

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

export default function Calendar({ user, pet, pets }: Props) {
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState<ScheduleEvent[]>([]);
  const [singleResourceData, setSingleResourceData] = useState<any>(); 
  const [resourceData, setResourceData] = useState<any[]>([]);
  const scheduleObj = useRef<ScheduleComponent>(null);
  const currentToken = sessionStorage.getItem("token") || "null";
  const windowLocation = window.location.pathname;

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
        setScheduleData(newEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  //   const colors: string[] = [
  //     "#cb6bb2",
  //     "#56ca85",
  //     "#df5286",
  //     "#f7b84b",
  //     "#198675",
  //     "#b7d7e8",
  //     "#e0a7a7",
  //     "#8e8cd8",
  //     "#f57f17",
  //   ];

  // if(pet) {
  //   const singleResourceData = [{ Name: pet.name, Id: pet.Id, Color: colors[0]}]
  //   setResourceData(singleResourceData);
  // }
    fetchData();
  }, []);

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

  const resourceDataSource = pets.reduce((acc: any[], pet) => {
    let index = pets.indexOf(pet);
    acc.push({ Name: pet.name, Id: pet.id, Color: colors[index] }); // change value to pet ID
    return acc;
  }, []);

  // if(pet) {
  //   const singleResourceData = [{ Name: pet.name, Id: pet.Id, Color: colors[0]}]
  // }
  

  const dataManager = new DataManager({
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

    if (args.event && args.event.target) {
      const target = args.event.target as HTMLElement;
      if (target.className === save_icon || target.className === save_button) {
        const newEvent: ScheduleEvent = {
          PetId: (args.data as any).ResourceId, // ResourceId is grabbing the pets actual ID
          Id: scheduleData.length + 1,
          Subject: (args.data as any).Subject,
          Description: (args.data as any).Description,
          StartTime: new Date((args.data as any).StartTime),
          EndTime: new Date((args.data as any).EndTime),
          ResourceId: (args.data as any).ResourceId, // Match resource ID to pet ID
        };
        const apiFormattedEvent = transformToApiFormat(newEvent, user.data.id);
        dataManager.insert(apiFormattedEvent);
      }
    }
  };

  const dragStopEvent = (args: DragEventArgs) => {
    const newEvent: ScheduleEvent = {
      PetId: args.data.ResourceId,
      Id: scheduleData.length + 1,
      Subject: args.data.Subject,
      Description: args.data.Description,
      StartTime: new Date(args.data.StartTime),
      EndTime: new Date(args.data.EndTime),
      ResourceId: args.data.ResourceId,
    };
    const apiFormattedEvent = transformToApiFormat(newEvent, user.data.id);
    dataManager.insert(apiFormattedEvent);
  };

  const destroyDragEvent = (args: DragEventArgs): void => {
      destroyCalendarEvent(
        user.data.id,
        args.data.Id.toString(),
        currentToken
      );
  }

  const destroyEvent = (args: PopupOpenEventArgs): void => {
    if (args.type === "DeleteAlert") {
      destroyCalendarEvent(
        user.data.id,
        args.data?.Id.toString(),
        currentToken
      );
    }
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
              dragStart={destroyDragEvent}
              popupOpen={destroyEvent}
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
                  popupOpen={destroyEvent}
                  group={{resources: ['Pets']}}
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
