import { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';
import { staticGlobal } from '../static/staticGlobal';
import EventItem from './EventItem';
import { useNotificationUpdate } from '../context/notificationContext';
import EventForm from "./EventForm";

export default function EventsList() {
    const [events, setEvents] = useState([]);
    const openNotification = useNotificationUpdate();

    const getEvents  = async () => {
        try{
            const data = await fetchData(`${staticGlobal.API_LINK}/event`);
            if(data.data) setEvents(data.data);
            else setEvents(null);
        }catch(e) {
            openNotification(true,'error',e.message);
        }
    }

    useEffect(()=>{
        getEvents();
    },[])

    return (
        <div className='events'>
            <EventForm callback={getEvents}/>
            {events && <h2>Events List</h2>}
            <div className='events_wrapper'>
                {events && events.map((event,index) => (
                    <EventItem event={event} key={index}/>
                ))}
            </div>
        </div>
    )
}
