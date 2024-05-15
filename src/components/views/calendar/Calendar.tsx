import { useNavigate } from "react-router-dom";
import { Inject, ScheduleComponent, Day, Week, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
// import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
// import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
// import { Start } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
// import localforage from "localforage";
interface Props {
  user: any;
}

function Calendar({ user }: Props) {
  const navigate = useNavigate();
  const scheduleObj = useRef<ScheduleComponent>(null);
  const storedEvents: any[] = JSON.parse(localStorage.getItem('events') || '[]');
  const [events, setEvents] = useState<any[]>(storedEvents);
  console.log(scheduleObj)
  // const buttonObj = useRef<ButtonComponent>(null);

  // console.log(scheduleObj.current?.eventsData) //undefined
  // console.log(scheduleObj.current?.activeCellsData)
  // console.log(scheduleObj.current?.eventsProcessed)

  useEffect(() => {
  //   localforage.getItem('events').then((value) => {
  //     if (value) {
  //       console.log(value)
  //       setEvents(value as any[]);
  //     } else {
  //       console.log('no events')
  //     }
  //   }).catch(function(err) {
  //     console.log(err);
  // });
  }, [])

  useEffect(() => {
    scheduleObj.current?.addEvent({event: scheduleObj.current?.eventSettings as any[] || []});
    setEvents(scheduleObj.current?.eventsData as any[] || [])
    // localforage.setItem('events', events).then((value) => {
    //   console.log(value)
    // })

    console.log(scheduleObj.current?.eventsData) //NOT undefined
  }, [scheduleObj])
  console.log('events', events)
  // console.log(scheduleObj.current?.eventsProcessed)
  
  const eventSettings: EventSettingsModel = { dataSource: events }
  console.log(eventSettings) //showing 2 events successfully

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

  // const onAddClick = (e: React.MouseEvent<Element, MouseEvent>): void => {
  //   console.log(e)
  //   if (scheduleObj.current) {
  //     scheduleObj.current.addEvent(data);
  //     setEvents([...events, data]);
  //     console.log(data)
  //     localforage.setItem('events', events);
  //     localforage.getItem('events').then((value) => {
  //       if (value) {
  //         console.log(value)
  //         // setEvents(value);
  //       }
  //     })
  //   }
  //   if (buttonObj.current) {
  //     buttonObj.current.element.setAttribute('disabled', 'true');
  //   }
  // }


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
