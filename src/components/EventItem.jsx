import React from 'react';
import { getCurrentDate } from '../utils/currentDate';

export default function EventItem({ event }) {
  return (
    <div className='event_item'>
        <h4 data-testid="event">{event.first_name} {event.last_name}</h4>
        <strong>{event.email}</strong>
        <span>{getCurrentDate(new Date(event.date))}</span>
    </div>
  )
}
