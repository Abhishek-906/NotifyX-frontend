import { useState } from "react";
import NotificationInbox from "../modules/notification/components/inbox";
import SendNotification from "../modules/notification/components/sendNotification";

function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("inbox");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notification Center</h1>
        <p className="text-gray-500 mt-2">
          View received notifications or send new ones.
        </p>
      </div>

      {/* Main Card */}
      <div className="flex-1 bg-white rounded-xl shadow">

        {/* Tabs */}
        <div className="flex border-b">

          <button
            onClick={() => setActiveTab("inbox")}
            className={`px-6 py-4 font-medium transition-all ${
              activeTab === "inbox"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-black"
            }`}
          >
            📥 Inbox
          </button>

          <button
            onClick={() => setActiveTab("send")}
            className={`px-6 py-4 font-medium transition-all ${
              activeTab === "send"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-black"
            }`}
          >
            📤 Send
          </button>

        </div>

        {/* Content */}
        <div >

          {activeTab === "inbox" ? (
              <NotificationInbox/>
          ) : (
           <SendNotification/>
          )}

        </div>

      </div>
    </div>
  );
}

export default NotificationsPage;