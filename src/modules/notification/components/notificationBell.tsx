import { useState } from "react";
import NotificationModal from './NotificationModal';
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import useClickOutside from "../../../hooks/useClickOutside";
import { markAllNotificationAsRead } from "../../../services/notification.api"

interface IselectedNotificaton {
    id: string,
    title: string,
    message: string,
    date: string,
    senderFullName: string
}
function NotificationBell() {
    const dropdownRef = useClickOutside(() => setNotificationBellDropdown(false));
    const [notificationBellDropDown, setNotificationBellDropdown] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [selectedNotification, setSeletedNotification] = useState<IselectedNotificaton>(null);

    const notifications = useSelector((state: RootState) => state.notification.notifications);

    const sortedNotifications = [
        ...notifications.filter(
            notification => !notification.isRead
        ),

        ...notifications.filter(
            notification => notification.isRead
        ),
    ];


    const unreadCount = notifications.filter(
        notification => !notification.isRead
    ).length;

    return (
        <div className="relative" ref={dropdownRef}>

            <button className="relative text-2xl" onClick={() => { setNotificationBellDropdown((prev) => !prev) }}>
                🔔

                {unreadCount > 0 && (
                    <span
                        className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                text-xs
                w-5
                h-5
                rounded-full
                flex
                items-center
                justify-center
              "
                    >
                        {unreadCount}
                    </span>
                )}

            </button>

            {notificationBellDropDown && (

                <div
                    className="
            absolute
            right-0
            mt-3
            w-80
            bg-white
            border
            rounded-xl
            shadow-lg
            z-50
          "
                >

                    <div
                        className="
              flex
              justify-between
              items-center
              px-4
              py-3
              border-b
            "
                    >
                        <h3 className="font-semibold">
                            Notifications
                        </h3>

                        <button className="text-sm text-blue-600" onClick={()=>{
                            markAllNotificationAsRead();
                        }}>
                            Mark all as read
                        </button>
                    </div>


                    <div
                        className="
              max-h-96
              overflow-y-auto
            "
                    >

                        {sortedNotifications.map(notification => (

                            <div
                                key={notification._id}
                                onClick={() => {
                                    setSeletedNotification({
                                        id: notification._id,
                                        title: notification.title,
                                        message: notification.message,
                                        date: notification.createdAt,
                                        senderFullName: notification.senderUserId.fullName
                                    });
                                    setShowNotificationModal(true)}
                                }
                                className="
                  px-4
                  py-3
                  border-b
                  hover:bg-gray-50
                  cursor-pointer
                  flex
                  gap-3
                "
                            >

                                {!notification.isRead && (
                                    <span
                                        className="
                      mt-2
                      w-2
                      h-2
                      rounded-full
                      bg-blue-600
                    "
                                    />
                                )}


                                <div>

                                    <h4
                                        className={
                                            !notification.isRead
                                                ? "font-semibold"
                                                : "font-medium"
                                        }
                                    >
                                        {notification.title}
                                    </h4>


                                    <p className="text-sm text-gray-500">
                                        {notification.message}
                                    </p>

                                </div>

                            </div>
                            
                           

                        ))}

                    </div>

                </div>
            )}
            {showNotificationModal  && selectedNotification && (
                <NotificationModal onClose={() => setShowNotificationModal(false)} notification={selectedNotification} />
            )}

        </div>
    );
}

export default NotificationBell;