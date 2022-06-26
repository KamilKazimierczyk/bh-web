import { createContext, useContext, useState } from 'react';

const notificationContext = createContext({
    isSet: false,
    status: '',
    message: ''
})
const notificationUpdateContext = createContext()

export function useNotification() {
    return useContext(notificationContext)
}
export function useNotificationUpdate() {
    return useContext(notificationUpdateContext)
}

export function NotificationProvider({children}) {

    const [notification, setNotification] = useState({isSet: false,status: '',message: ''})

    const updateNotification = (isSet,status,message) =>{
        setNotification({isSet,status,message})
    }

    return (
        <notificationContext.Provider value={notification}>
            <notificationUpdateContext.Provider value={updateNotification}>
                {children}
            </notificationUpdateContext.Provider>
        </notificationContext.Provider>
    )
}