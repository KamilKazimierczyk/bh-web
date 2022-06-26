import React from 'react';
import { useNotificationUpdate } from "../context/notificationContext";

export default function Notification({ data }) {
    const updateNorification = useNotificationUpdate();

    const closeNotification = () => {
      updateNorification(false,'','');
    }

  return (
    <div className={`notification ${data.status === 'success' ? 'success' : 'error'}`}>
        <p>{data.message}</p>
        <button onClick={closeNotification}>+</button>
    </div>
  )
}
