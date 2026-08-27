import { useEffect, useState } from "react";
import RecipientModal from "./RecipientModal";
import { sendNotificationToMultiUser } from "../../../services/notification.api";
import { toast } from "react-toastify";

interface User {
  _id: string;
  fullName: string;
  email: string;
}



function SendNotification() {
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<User[]>([]);
  const [includeHierarchy, setIncludeHierarchy] = useState(false);
  const [isSending, setIsSending] = useState(false);



  const currentUsersString = localStorage.getItem("user");

const currentUsers = currentUsersString
  ? JSON.parse(currentUsersString)
  : null;


 const handleSend = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!message.trim()) {
      toast.error("Message is required");
      return;
    }

    if (selectedRecipients.length === 0) {
      toast.error("Please select at least one recipient");
      return;
    }

    const receiverUserIds = selectedRecipients.map(
      (user) => user._id
    );

    try {
      setIsSending(true);

      await sendNotificationToMultiUser({
        title: title.trim(),
        message: message.trim(),
        receiverUserIds,
        includeHierarchy,
      });

      toast.success("Notification sent successfully");

      setTitle("");
      setMessage("");
      setSelectedRecipients([]);
      setIncludeHierarchy(false);

    } catch (error: any) {
      console.error("Failed to send notification:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to send notification";

      toast.error(errorMessage);

    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px]">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Send Notification
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Send a notification to one or multiple users.
        </p>
      </div>


      {/* Form */}
      <div className="flex-1 overflow-y-auto">

        <div className="max-w-3xl space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>

            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notification title"
              value={title}
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>


          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>

            <textarea
              rows={6}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification message..."
              value={message}
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                outline-none
                resize-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>


          {/* Recipients */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipients
            </label>

            <div
              className="
                border
                border-gray-300
                rounded-lg
                px-4
                py-4
                flex
                items-center
                justify-between
                gap-4
              "
            >

              <div >
                {selectedRecipients.length === 0 ? (
                  <p className="text-sm text-gray-900">
                    No recipients selected
                  </p>
                ) : (
                  <p className="text-sm text-gray-900">
                    {selectedRecipients.length} recipient(s) selected
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-1">
                  Select one or multiple users to receive this notification.
                </p>
              </div>


              {showRecipientModal && (<RecipientModal
                selectedUsers={selectedRecipients}
                onConfirm={(selectedUsers) => {
                  setSelectedRecipients(selectedUsers);
                  setShowRecipientModal(false);
                }}
                onClose={() => setShowRecipientModal(false)} />)}

              <button
                type="button"
                onClick={() => setShowRecipientModal(true)}
                className="
                  shrink-0
                  px-4
                  py-2
                  border
                  border-blue-600
                  text-blue-600
                  rounded-lg
                  hover:bg-blue-50
                  transition
                "
              >
                Select Recipients
              </button>

            </div>

          </div>


          {/* Superadmin option */}
          <div
            className="
              border
              border-gray-200
              rounded-lg
              px-4
              py-4
              bg-gray-50
            "
          >

               {currentUsers?.role=='SUPERADMIN' && ( 

            <label className="flex items-start gap-3 cursor-pointer">

              <input
                type="checkbox"
                checked={includeHierarchy}
                onChange={(e) => setIncludeHierarchy(e.target.checked)} className="
                  mt-1
                  w-4
                  h-4
                  rounded
                  border-gray-300
                  text-blue-600
                  focus:ring-blue-500
                "
              />

                <div>
                <p className="text-sm font-medium text-gray-800">
                  Include users under selected admins
                </p>

</div>
                <p className="text-xs text-gray-500 mt-1">
                  The notification will also be sent to users belonging to
                  the selected admins.
                </p>
             

            </label>
             )} 
             

          </div>


          {/* Selected recipients preview */}
          <div>


            <div
              className="
                border
                border-gray-200
                rounded-lg
                p-4
                bg-gray-50
                min-h-[80px]
              "
            >

              {selectedRecipients.map((recipient) => (
                <div key={recipient._id} className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {recipient.fullName}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {recipient.email}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>


      {/* Footer */}
      <div
        className="
          border-t
          border-gray-200
          pt-5
          mt-6
          flex
          justify-end
        "
      >

        <button
          type="button"
          onClick={ handleSend }
           disabled={isSending}
          className="
            px-6
            py-3
            bg-blue-600
            text-white
            rounded-lg
            font-medium
            hover:bg-blue-700
            transition
          "
        >
           {isSending ? "Sending..." : "Send Notification"}
        </button>

      </div>

    </div>
  );
}



export default SendNotification;