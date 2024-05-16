import { useNavigate } from "react-router-dom";
import { Inject, ScheduleComponent, Day, Week, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import { DatePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
// import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
// import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
// import { Start } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Event } from "../../../utils/interfaces";
// import localforage from "localforage";
interface Props {
  user: any;
}

function Calendar({ user }: Props) {
  const navigate = useNavigate();
  const scheduleObj = useRef<ScheduleComponent>(null);
  // const storedEvents: any[] = JSON.parse(localStorage.getItem('events') || '[]');
  const [events, setEvents] = useState<any[]>([]);
  // console.log(scheduleObj)
//undefined
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

  // const newEvent: EventSettingsModel = {
  //   dataSource: [{
  //     Subject: 'Testing',
  //     EndTime: new Date(2024, 4, 17, 10, 0),
  //     StartTime: new Date(2024, 4, 17, 8, 0),
  //     IsAllDay: false,
  //     Description: 'Testing'
  //   }, 
  //   {
  //     Subject: 'Testing',
  //     EndTime: new Date(2024, 4, 18, 10, 0),
  //     StartTime: new Date(2024, 4, 18, 8, 0),
  //     IsAllDay: false,
  //     Description: 'Testing'
  //   }]
  // }

  // const newNewEvent: EventSettingsModel = {
  //   dataSource: [{
  //     Subject: 'Testing',
  //     EndTime: new Date("2024-05-17T18:00:00.000Z"),
  //     StartTime: new Date("2024-05-17T14:00:00.000Z"),
  //     IsAllDay: false,
  //     Description: 'Testing'
  //   }]
  // }

  useEffect(() => {
    // scheduleObj.current?.addEvent({event: scheduleObj.current?.eventSettings.dataSource as any[] || []});
    // setEvents(scheduleObj.current?.eventsData as any[] || [])
    console.log(scheduleObj.current?.eventsData[1].StartTime)
    const subject = scheduleObj.current?.eventsData[1].Subject
    const endTime = scheduleObj.current?.eventsData[1].EndTime
    const startTime = scheduleObj.current?.eventsData[1].StartTime
    const isAllDay = scheduleObj.current?.eventsData[1].IsAllDay  
    const description = scheduleObj.current?.eventsData[1].Description
    // let newEvent: EventSettingsModel = {
    //   dataSource: [{
    //     Subject: subject,
    //     EndTime: new Date(`${endTime}`),
    //     StartTime: new Date(`${startTime}`),
    //     IsAllDay: isAllDay,
    //     Description: description
    //   }]
    // }
    let newEvent: any = {
      dataSource: [{
        Subject: subject,
        EndTime: new Date(`${endTime}`),
        StartTime: new Date(`${startTime}`),
        IsAllDay: isAllDay,
        Description: description
      }]
    }
    setEvents(newEvent)
    // console.log(scheduleObj.current?.eventsProcessed) //NOT undefined
  }, [scheduleObj])
  console.log('events', events)
  console.log(scheduleObj)


  // console.log(scheduleObj.current?.eventsData[0].StartTime.getFullYear())
  // console.log(scheduleObj.current?.eventsData[0].StartTime.getMonth())
  // console.log(scheduleObj.current?.eventsData[0].StartTime.getDate())
  // console.log(scheduleObj.current?.eventsData[0].StartTime.getHours())
  // console.log(scheduleObj.current?.eventsData[0].StartTime.getMinutes())
  // const eventSettings: EventSettingsModel = {dataSource: newEvent}
  // console.log(eventSettings) //showing 2 events successfully

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
          <ScheduleComponent eventSettings={events} ref={scheduleObj}>
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
