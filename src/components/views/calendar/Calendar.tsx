import { useNavigate } from "react-router-dom";
import { Inject, ScheduleComponent, Day, Week, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Start } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import localforage from "localforage";
interface Props {
  user: any;
  events: any[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
}

function Calendar({ user, events, setEvents }: Props) {
  const navigate = useNavigate();
  const scheduleObj = useRef<ScheduleComponent>(null);
  const buttonObj = useRef<ButtonComponent>(null);

  // console.log(scheduleObj.current?.eventSettings)
  // console.log(scheduleObj.current?.eventsProcessed)
  // console.log(scheduleObj)
  // const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // scheduleObj.current?.addEvent(scheduleObj.current?.eventSettings.dataSource as any[] || []);
    setEvents(scheduleObj.current?.eventSettings.dataSource as object[] || [])
    // localforage.setItem('events', events).then(() => {
    //   localforage.getItem('events').then((value) => {
    //     if (value) {
    //       console.log(value)
    //       setEvents(value as any);
    //     }
    //   })
    // })
    console.log(scheduleObj.current?.eventSettings.dataSource)
  }, [scheduleObj.current])
  console.log('events', events)
  
  const eventSettings: EventSettingsModel = { dataSource: events }

  // const remoteData = new DataManager({
  //     url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
  //     adaptor: new WebApiAdaptor(),
  //     crossDomain: true,
  //   // fields: {
  //   //   id: 'Id',
  //   //   subject: { name: 'Subject' },
  //   //   location: { name: 'Location' },
  //   //   description: { name: 'Description' },
  //   //   startTime: { name: 'StartTime' },
  //   //   endTime: { name: 'EndTime' }
  //   // }
  // })


  return (
    <>
      {user.id ? (
        <>
          <ScheduleComponent eventSettings={eventSettings} ref={scheduleObj}>
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
