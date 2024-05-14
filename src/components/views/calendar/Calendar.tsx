import { useNavigate } from "react-router-dom";
import { Inject, ScheduleComponent, Day, Week, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Start } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import localforage from "localforage";
interface Props {
  user: any;
}

function Calendar({ user }: Props) {
  const navigate = useNavigate();
  const scheduleObj = useRef<ScheduleComponent>(null);
  const buttonObj = useRef<ButtonComponent>(null);

  console.log(scheduleObj.current?.eventSettings)
  console.log(scheduleObj.current?.eventSettings.dataSource)
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    localforage.getItem('events').then((value) => {
      if (value) {
        console.log(typeof value)
        // setEvents(value);
      }
    })
  }, [])
  
  const data: object[] = [{
    Id: 1,
    Subject: 'Dinner',
    StartTime: new Date(2024, 4, 13, 16, 0),
    EndTime: new Date(2024, 4, 13, 18, 30),
  }];
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

  const onAddClick = (e: React.MouseEvent<Element, MouseEvent>): void => {
    console.log(e)
    if (scheduleObj.current) {
      scheduleObj.current.addEvent(data);
      setEvents([...events, data]);
      console.log(data)
      localforage.setItem('events', events);
      localforage.getItem('events').then((value) => {
        if (value) {
          console.log(value)
          // setEvents(value);
        }
      })
    }
    if (buttonObj.current) {
      buttonObj.current.element.setAttribute('disabled', 'true');
    }
  }

  const onAddChange = (e: React.MouseEvent<Element, MouseEvent>) => {
    scheduleObj.current?.addEvent(data);
    setEvents([...events, data]);
    localforage.setItem('events', events);
    localforage.getItem('events').then((value) => {
      if (value) {
        console.log(value)
        // setEvents(value);
      }
    })
    console.log(data)
    console.log(scheduleObj.current?.eventSettings)
    console.log(scheduleObj.current?.eventSettings.dataSource)
  }

  return (
    <>
      {user.id ? (
        <>
        <ButtonComponent id='add' title='Add' ref={buttonObj} onClick={(e) => onAddClick(e)}>Add</ButtonComponent>
          <ScheduleComponent eventSettings={eventSettings} ref={scheduleObj} onChange={onAddChange}>
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
