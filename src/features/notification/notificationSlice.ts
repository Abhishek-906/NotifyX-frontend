  import { createSlice } from "@reduxjs/toolkit"
  import type { PayloadAction } from "@reduxjs/toolkit";

  export interface NotificationItem {
      _id: string;
    
      senderUserId: {
        _id: string;
        fullName: string;
        email: string;
        role: string;
      };
    
      receiverUserId: string;
    
      title: string;
      message: string;
      isRead: boolean;
    
      createdAt: string;

    }

  interface NotificationState {
      notifications: NotificationItem[];
      loading: boolean;
      error: string | null;
    }

    const initialState: NotificationState = {
      notifications: [],
      loading: false,
      error: null,
    };


  const notificationSlice =  createSlice({
        name: "notification",
        initialState,
        reducers:{
          setNotifications(
            state,
            action: PayloadAction<NotificationItem[]>
          ){
            state.notifications = action.payload
          },
          markAsRead(state, action:PayloadAction<string>){
            const id  = action.payload;
            let readedNotification = state.notifications.find(notification=>notification._id===id);
            if (readedNotification) {
            readedNotification.isRead = true;
            }
          } ,       
          markAllAsRead(state){
            state.notifications.map((notification)=>{
              notification.isRead = true ;
            })
          } ,   
          addNotification( state , action: PayloadAction<NotificationItem>){
          const newNotification = action.payload;
          state.notifications.push(newNotification);
          }   
        }

  })

  export default notificationSlice.reducer;
  export const { setNotifications, markAsRead, markAllAsRead, addNotification } = notificationSlice.actions;