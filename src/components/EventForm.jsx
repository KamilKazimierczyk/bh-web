import { useState } from 'react';
import { fetchData } from '../utils/fetchData';
import { staticGlobal } from '../static/staticGlobal';
import { useNotificationUpdate } from '../context/notificationContext';

export default function EventForm({ callback }) {
    const [firstName,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [email,setEmail] = useState('');
    const [date,setDate] = useState('');
    const openNotification = useNotificationUpdate();

    const createEvent = async (e) => {
        e.preventDefault();
        try{
            const response = await fetchData(`${staticGlobal.API_LINK}/event`,'POST',{ firstName, lastName, email, date });
            openNotification(true,response.status,response.message);
            if(callback) callback();
        }catch(e){
            openNotification(true,'error',e.message);
        }
    }

    return (
        <div className='event_form'>
            <h2>Create new event</h2>
            <form onSubmit={createEvent}>
                <div className="event_row">
                    <input type="text" placeholder='First Name' required value={firstName} onChange={e=>setfirstName(e.target.value)}/>
                    <input type="text" placeholder='Last Name' required value={lastName} onChange={e=>setlastName(e.target.value)}/>
                </div>
                <div className="event_row">
                    <input type="email" placeholder='E-mail' required value={email} onChange={e=>setEmail(e.target.value)}/>
                    <input type="date"  data-testid="date-event" required value={date} onChange={e=>setDate(e.target.value)}/>
                </div>
                <button type='submit' data-testid="submit-event">Set Event</button>
            </form>
        </div>
    )
}
