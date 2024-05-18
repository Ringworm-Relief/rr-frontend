import { useNavigate } from "react-router-dom";
import * as ReactDOM from 'react-dom';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { DatePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
// import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
// import { Start } from "@mui/icons-material";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { Event } from "../../../utils/interfaces";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, ActionEventArgs, NavigatingEventArgs, View, EventSettingsModel } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';

interface Props {
  user: any;
}

// const useDataDatesObserver = (setDates: Dispatch<SetStateAction<string>>) => {

//   useEffect(() => {
//     const targetNode = document.querySelectorAll('.e-appointment');
//     console.log("Testing")
//     console.log(targetNode)
//     if (!targetNode) return;

//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (mutation.type === 'attributes' && mutation.attributeName === 'data-dates') {
//           const newDates = mutation.target.getAttribute('data-dates');
//           // Assume setDates is a state setting function that you've passed or defined elsewhere
//           setDates(newDates);
//         }
//       }
//     });

//     const config = { attributes: true };
//     targetNodes.forEach(node => {
//       observer.observe(node, config);
//     });

//     // Cleanup observer on component unmount
//     return () => observer.disconnect();
//     }, [setDates]);
// };
  // useDataDatesObserver(setDates);


function Calendar({ user }: Props) {
  const [dates, setDates] = useState('');
  const navigate = useNavigate();
  const scheduleObj = useRef<ScheduleComponent>(null);
  const buttonObj = useRef<ButtonComponent>(null);

  let connection: HubConnection;
  const data: Record<string, any>[] = [];
  let isHubConnected: boolean = false;
  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({ dataSource: data });
  const [currentView, setCurrentView] = useState<View>("Week");

  useEffect(() => {
    const url: string = 'https://ej2.syncfusion.com/aspnetcore/scheduleHub/';
    connection = new HubConnectionBuilder().withUrl(url, { withCredentials: false }).withAutomaticReconnect().build();
    
    connection.on('ReceiveData', (action: string, data: View | Record<string, any>[]) => {
      if (action === 'view') {
        setCurrentView(data as View);
      }
      if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
        setEventSettings({ dataSource: data as Record<string, any>[] });
      }
    });

    connection.start().then(() => {
      isHubConnected = true;
    }).catch((err: unknown) => {
      console.log(err);
    });

    return () => {
      if (connection) {
        connection.stop().then(() => {
          isHubConnected = false;
        }).catch((err: unknown) => {
          console.log(err);
        });
      }
    };
  }, []);

  const onActionComplete = (args: ActionEventArgs): void => {
    if (isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
      connection.invoke('SendData', args.requestType, eventSettings.dataSource);
    }
  };

  const onCreated = () => {
    // SignalR connection is already handled in useEffect
  };

  const onNavigating = (args: NavigatingEventArgs): void => {
    if (args.action === 'view' && isHubConnected) {
      connection.invoke('SendData', args.action, args.currentView);
    }
  };

  return (
    <>
      {user.id ? (
        <>
          <ScheduleComponent 
          eventSettings={eventSettings} 
          ref={scheduleObj}
          actionComplete={onActionComplete} 
          navigating={onNavigating} 
          created={onCreated} 
          currentView={currentView} 
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
