import { useNavigate } from "react-router-dom";

import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { EventSettingsModel, ScheduleComponent, Day, Week, Agenda, Month, Inject, ViewsDirective, ViewDirective, PopupCloseEventArgs } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';
import {
  
} from '@syncfusion/ej2-react-schedule';

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
  };
}

const transformToScheduleData = (event: ApiEvent): ScheduleEvent => {
  return {
    Id: Number(event.id),
    Subject: event.attributes.title,
    Description: event.attributes.description,
    StartTime: new Date(event.attributes.start_time),
    EndTime: new Date(event.attributes.end_time),
  };
};

const transformToApiFormat = (event: ScheduleEvent, userId: number) => {
  return {
    data: {
      type: "calendar_event",
      attributes: {
        user_id: userId,
        title: event.Subject,
        description: event.Description,
        start_time: event.StartTime.toISOString(), // Ensure the date is in ISO format
        end_time: event.EndTime.toISOString() // Ensure the date is in ISO format
      }
    }
  };
};

function Calendar({ user }: Props) {
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState<ScheduleEvent[]>([]);
  const scheduleObj = useRef<ScheduleComponent>(null);
  const eventSettings: EventSettingsModel = {
    dataSource: scheduleData,
    fields: {
      subject: { name: 'Subject', default: 'Add Name' },
      location: { name: 'Location', default: 'USA' },
      description: { name: 'Description' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
    }
  };
  
  const current_token = localStorage.getItem('token');
  const user_id = user.id

  if (!current_token) {
  throw new Error("Token is null");
  }

  const dataManager=new DataManager({
    url: `https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/${user_id}/calendar_events`,
    adaptor: new WebApiAdaptor,
    crossDomain:true,
    headers: [{
      Authorization: `${current_token}`
      }]
    });

  const save = 'e-save-icon e-icons';

  // For future API call to delete CalendarEvent
  const delete_event = 'e-btn-icon e-icons e-delete-icon';

  const closePopup = (args: PopupCloseEventArgs) => {
    console.log("close Popup Here")
    if (args.event && args.event.target) {
      const target = args.event.target as HTMLElement;
      const classNameSave = target.className;
      console.log(classNameSave)
        if (classNameSave === save) {
          const newEvent: ScheduleEvent = {
            Id: scheduleData.length + 1,
            Subject: (args.data as any).Subject,
            Description: (args.data as any).Description,
            StartTime: new Date((args.data as any).StartTime),
            EndTime: new Date((args.data as any).EndTime),
          };
          console.log(args.data)
          
          setScheduleData([...scheduleData, newEvent]);

          const apiFormattedEvent = transformToApiFormat(newEvent, user.id);

          dataManager.insert(apiFormattedEvent)
      }
    }
  };

  return (
    <>
      {user.id ? (
        <>
          <ScheduleComponent 
          eventSettings={{dataSource: scheduleData}} 
          ref={scheduleObj}
          popupClose={closePopup}
          >
            <Inject services={[Day, Week, Month, Agenda]} />
          </ScheduleComponent>
        </>
      ) : (
        navigate("/account/signin")
      )}
    </>
  );
}
export default Calendar;
