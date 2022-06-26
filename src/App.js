import EventsList from "./components/EventsList";
import { useNotification } from "./context/notificationContext";
import Notification from "./components/NotificationItem";

function App() {
  const notification = useNotification();

  return (
    <div className="App">
      <EventsList />
      {notification.isSet && <Notification data={notification}/>}
    </div>
  );
}

export default App;
