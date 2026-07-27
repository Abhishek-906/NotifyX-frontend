import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


interface Notification {
    receiverUserId: string;
    title: string;
    message: string
}

export const sendNotification = (data: Notification) => {
    const token = localStorage.getItem('token');
    return axios.post(`${BASE_URL}/notification/create-notification`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getNotifications = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${BASE_URL}/notification/get-notification`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res;
}

export const markSpecificNotificationAsRead = async (notificationId:string) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${BASE_URL}/notification/${notificationId}/read`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res;
}


export const markAllNotificationAsRead = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${BASE_URL}/notification/read-all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}