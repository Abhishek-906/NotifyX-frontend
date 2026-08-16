import { useEffect } from "react";
import { markSpecificNotificationAsRead } from '../../../services/notification.api'
import { useDispatch } from "react-redux";
import { markAsRead } from "../../../features/notification/notificationSlice";

interface IselectedNotificaton {
  id: string,
  title: string,
  message: string,
  date: string,
  senderFullName: string
}

interface NotificationModalProps {
  onClose: () => void;
  notification: IselectedNotificaton;
}


function NotificationModal({ onClose, notification }: NotificationModalProps) {

  const dispatch = useDispatch();
  
  useEffect(()=>{
    const markNotificationAsRead=async()=>{
      await markSpecificNotificationAsRead(notification.id);
    };
    dispatch(markAsRead(notification.id));
    markNotificationAsRead();
  } , [])

  return (
    <div
      className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
        "
      onClick={onClose}
    >

      <div
        className="
            bg-white
            rounded-xl
            shadow-lg
            w-full
            max-w-lg
            p-6
          "
      >

        {/* Header */}
        <div
          className="
              flex
              justify-between
              items-center
              mb-6
            "
        >

          <h2 className="text-2xl font-bold">
            Notification Details
          </h2>


          <button
            className="
                text-gray-500
                hover:text-black
                text-xl
              "
          >
            ✕
          </button>

        </div>


        {/* Content */}
        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-500">
              Title
            </p>

            <h3 className="text-lg font-semibold">
              {notification.title}
            </h3>
          </div>


          <div>
            <p className="text-sm text-gray-500">
              Message
            </p>

            <p className="text-gray-700">
              {notification.message}
            </p>
          </div>


          <div>
            <p className="text-sm text-gray-500">
              Sender
            </p>

            <p className="font-medium">
              {notification.senderFullName}
            </p>
          </div>


          <div>
            <p className="text-sm text-gray-500">
              Date
            </p>

            <p className="text-gray-700">
              {new Date(notification.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>


        </div>


        {/* Footer */}
        <div
          className="
              flex
              justify-end
              mt-6
            "
        >

          <button
            onClick={onClose}
            className="
                px-5
                py-2
                bg-blue-600
                text-white
                rounded-lg
                hover:bg-blue-700
              "
          >
            Close
          </button>

        </div>


      </div>

    </div>
  );
}

export default NotificationModal;