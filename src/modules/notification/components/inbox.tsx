import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getNotifications, markAllNotificationAsRead } from "../../../services/notification.api";
import NotificationModal from "./NotificationModal";
import { toast } from "react-toastify";

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  senderUserId: {
    _id: string;
    fullName: string;
    email: string;
    role: string;
  };
  isRead: boolean;
}

interface IselectedNotificaton {
  id: string,
  title: string,
  message: string,
  date: string,
  senderFullName: string
}

function NotificationInbox() {

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const q = searchParams.get("q") || "";
  const status = searchParams.get("status") || "all";
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<IselectedNotificaton | null>(null);
  const [showNotificationModel, setShowNotification] = useState(false);
  const [isMarkingAllRead, setIsMarkingAllRead ] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    const getNotificationList = async () => {
      try {
        const res = await getNotifications(page, limit, q, status);
        setNotifications(res.data.data.notifications);
        setPagination(res.data.data.pagination);
    console.log("result",res.data.data.notifications );
      } catch (err) {
        console.log(err);
      }
    };

    getNotificationList();
  }, [page, limit, q, status]);

  const unReadedNotification = notifications.some((i)=>i.isRead==false);

  const handleMarkAllAsRead = async () => {
  try {
        setIsMarkingAllRead(true);
    await markAllNotificationAsRead();

    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
    toast.success("Mark all notification as read")

  } catch (err) {
    console.log(err);
  }finally {
    setIsMarkingAllRead(false); 
  }
};

  const startNotification =
    pagination.total === 0
      ? 0
      : (pagination.page - 1) * pagination.limit + 1;

  const endNotification = Math.min(
    pagination.page * pagination.limit,
    pagination.total
  );

  return (
    <div className="flex flex-col h-[650px]" >
      <div className="flex flex-col  md:flex-row justify-between gap-4 mb-6">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchParams({
                page: "1",
                limit: String(limit),
                q: search,
                status,
              });
            }
          }}
          className="
    w-full
    md:w-80
    border
    rounded-lg
    px-4
    py-2
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
        />
        <div className="flex gap-3">

          <select
            value={status}
            className="
      border
      rounded-lg
      px-4
      py-2
      bg-white
      outline-none
      focus:ring-2
      focus:ring-blue-500
    "
            onChange={(e) => {
              setSearchParams({
                page: "1",
                limit: String(limit),
                q,
                status: e.target.value,
              });
            }}
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>

          <button
          onClick={
             handleMarkAllAsRead             
             }
            type="button"
            disabled={ !unReadedNotification || isMarkingAllRead }
            className="
      px-4
      py-2
      border
      border-blue-600
      text-blue-600
      rounded-lg
      font-medium
      hover:bg-blue-50
      transition
       disabled:opacity-50
  disabled:cursor-not-allowed
    "
          >
          {isMarkingAllRead ? "Marking..." : "Mark all as read"}

          </button>

        </div>
      </div>

      {/* Table */}

      <div className="flex-1 overflow-y-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="px-5 py-3">Status</th>

              <th className="px-5 py-3">Title</th>

              <th className="px-5 py-3">Message</th>

              <th className="px-5 py-3">Received</th>

              <th className="px-5 py-3">Action</th>

            </tr>

          </thead>

          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (

                <tr className="border-t hover:bg-gray-50" key={notification._id}>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${notification.isRead ? "bg-gray-300" : "bg-blue-600"
                        }`}
                    />
                  </td>

                  <td className="px-5 py-4 font-semibold">

                    {notification.title}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {notification.message}
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    {new Date(notification.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="px-5 py-4">
                    <button className="text-blue-600 hover:underline" onClick={() => {
                      setSelectedNotification({
                        id: notification._id,
                        title: notification.title,
                        message: notification.message,
                        date: notification.createdAt,
                        senderFullName: notification.senderUserId.fullName
                      })
                      // Immediately mark it as read in the UI
                      setNotifications((prev) =>
                        prev.map((item) =>
                          item._id === notification._id
                            ? { ...item, isRead: true }
                            : item
                        )
                      );

                      setShowNotification(true);
                    }} >
                      View
                    </button>
                  </td>

                </tr>
              ))) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No notifications
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {showNotificationModel && selectedNotification && (
          <NotificationModal onClose={() => setShowNotification(false)} notification={selectedNotification} />
        )}

      </div>

      {/* Pagination */}

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">

        <p>
          Showing {startNotification}–{endNotification} of{" "}
          {pagination.total} notifications
        </p>
        <div className="flex items-center gap-4">

          {/* Rows Per Page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Rows per page:
            </span>

            <select
              value={limit}
              onChange={(e) => {
                setSearchParams({
                  page: "1",
                  limit: e.target.value,
                  q,
                  status,
                });
              }}
              className="border rounded px-2 py-1"
            >
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>

          {/* Previous */}
          <button
            disabled={pagination.page === 1}
            className="
        px-3
        py-2
        border
        rounded
        hover:bg-gray-100
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-white
      "

            onClick={() =>
              setSearchParams({
                page: String(page - 1),
                limit: String(limit),
                q,
                status,
              })
            }
          >
            Previous
          </button>

          {/* Current Page */}
          <span className="text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          {/* Next */}
          <button
            disabled={pagination.page === pagination.totalPages}
            className="
        px-3
        py-2
        border
        rounded
        hover:bg-gray-100
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-white
      "
            onClick={() =>
              setSearchParams({
                page: String(page + 1),
                limit: String(limit),
                q,
                status,
              })
            }
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default NotificationInbox;