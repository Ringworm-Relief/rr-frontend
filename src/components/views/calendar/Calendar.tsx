import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { EventSettingsModel, ScheduleComponent, Day, Week, Agenda, Month, Inject, ViewsDirective, ViewDirective, PopupCloseEventArgs } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';
import {
  
} from '@syncfusion/ej2-react-schedule';
import { fetchCalendarEvents } from "../../../apiCalls/calendarApiCalls";
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

const transformToApiFormat = (event: ScheduleEvent, user_id: number) => {
  const startDate = event.StartTime.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const endDate = event.EndTime.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const format_options : Intl.DateTimeFormatOptions = { 
    hour: "2-digit", 
    minute: "2-digit", 
   };
  const startTime = new Intl.DateTimeFormat("en-US", format_options).format(event.StartTime);
  const endTime = new Intl.DateTimeFormat("en-US", format_options).format(event.EndTime);

  // const startTime = new Intl.DateTimeFormat('en-US', format_options).format(event.StartTime)
  // const endTime = new Intl.DateTimeFormat('en-US', format_options).format(event.EndTime)

  return {
    data: {
      type: "calendar_event",
      attributes: {
        user_id: user_id,
        title: event.Subject,
        description: event.Description,
        start_date: startDate, // Ensure the date is in ISO format
        end_date: endDate, // Ensure the date is in ISO format
        start_time: startTime, // Ensure the date is in ISO format
        end_time: endTime // Ensure the date is in ISO format
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
  const user_id = user.data.id

  if (!current_token) {
  throw new Error("Token is null");
  }

  const dataManager=new DataManager({
    url: `https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/${user_id}/calendar_events`,
    adaptor: new WebApiAdaptor,
    crossDomain:true,
    headers: [
      { Authorization: `${current_token}` },
      { "Content-Type": "application/json" }
      ]
    });

  const save_icon = 'e-save-icon e-icons';
  const save_button = "e-schedule-dialog e-control e-btn e-lib e-primary e-event-save e-flat"

  // For future API call to delete CalendarEvent
  const delete_event = 'e-btn-icon e-icons e-delete-icon';

  const closePopup = (args: PopupCloseEventArgs) => {
    console.log("close Popup Here")
    if (args.event && args.event.target) {
      const target = args.event.target as HTMLElement;
      const classNameSave = target.className;
        if (classNameSave === save_icon || save_button) {
          const newEvent: ScheduleEvent = {
            Id: scheduleData.length + 1,
            Subject: (args.data as any).Subject,
            Description: (args.data as any).Description,
            StartTime: new Date((args.data as any).StartTime),
            EndTime: new Date((args.data as any).EndTime),
          };
          


          // setScheduleData([...scheduleData, newEvent]);



          const apiFormattedEvent = transformToApiFormat(newEvent, user_id);

          try {
            const apiResponse = async () => {
              dataManager.insert(apiFormattedEvent)
            }
          } catch {
            
          }



          console.log(scheduleData)

      }
    }
  };

  return (
    <>
      {user.data.id ? (
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
