import { useNavigate } from "react-router-dom";
import { Inject, ScheduleComponent, Day, Week, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { Start } from "@mui/icons-material";
interface Props {
  user: any;
}

function Calendar({ user }: Props) {
  const navigate = useNavigate();
  const localData: EventSettingsModel = {
    dataSource: [{
      EndTime: new Date(2024, 9, 6, 6, 30),
      StartTime: new Date(2024, 9, 6, 4, 0),
    }]
  }

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
          <ScheduleComponent eventSettings={{ dataSource: remoteData}}>
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
