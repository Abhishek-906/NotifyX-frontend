import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


interface Notification {
    receiverUserId: string;
    title: string;
    message: string
}

export interface Notifications {
  title: string;
  message: string;
   receiverUserIds: string[];
  includeHierarchy: boolean;
}

export const sendNotification = (data: Notification) => {
    const token = localStorage.getItem('token');
    return axios.post(`${BASE_URL}/notification/create-notification`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const sendNotificationToMultiUser = (data: Notifications) => {
    const token = localStorage.getItem('token');
    return axios.post(`${BASE_URL}/notification/create-notification-for-multi-user`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getNotifications = async (page = 1,
    limit = 10,
    q = "",
    status = ""
) => {
    const token = localStorage.getItem('token');
    
    const res = await axios.get(`${BASE_URL}/notification/get-notification`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            page,
            limit,
            q,
            status,
        },
    })
    return res;
}

export const markSpecificNotificationAsRead = async (notificationId: string) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/notification/${notificationId}/read`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const markAllNotificationAsRead = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${BASE_URL}/notification/read-all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}