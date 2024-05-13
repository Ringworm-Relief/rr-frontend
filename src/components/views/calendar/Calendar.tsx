import { useNavigate } from "react-router-dom";
import { Inject, ScheduleComponent, Day, Week, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { Start } from "@mui/icons-material";
interface Props {
  user: any;
}

function Calendar({ user }: Props) {
  const navigate = useNavigate();
  const data: object[] = [{
    Id: 1,
    Subject: 'Dinner',
    StartTime: new Date(2024, 4, 13, 16, 0),
    EndTime: new Date(2024, 4, 13, 18, 30),
  }];
  const eventSettings: EventSettingsModel = { dataSource: data }

  const remoteData = new DataManager({
      url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
    // fields: {
    //   id: 'Id',
    //   subject: { name: 'Subject' },
    //   location: { name: 'Location' },
    //   description: { name: 'Description' },
    //   startTime: { name: 'StartTime' },
    //   endTime: { name: 'EndTime' }
    // }
  })

  return (
    <>
      {user.id ? (
        <>
          <ScheduleComponent eventSettings={eventSettings}>
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
