import { useNavigate } from "react-router-dom";
import { Inject, ScheduleComponent, Day, Week, Month, Agenda } from "@syncfusion/ej2-react-schedule";
interface Props {
  user: any;
}

function Calendar({ user }: Props) {
  const navigate = useNavigate();

  return (
    <>
      {user.id ? (
        <>
          <ScheduleComponent>
            <Inject services={[Day, Week, Month, Agenda]}/>
          </ScheduleComponent>
        </>
      ) : (
        navigate("/account/signin")
      )}
    </>
  );
}

export default Calendar;
