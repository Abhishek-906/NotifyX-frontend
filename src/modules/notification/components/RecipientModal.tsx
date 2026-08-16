import { useEffect, useState } from "react";
import { getChildren } from "../../../services/user.api";

interface RecipientModalProps {
    selectedUsers: User[];
    onConfirm: (selectedUsers: User[]) => void;
    onClose: () => void;
}

interface User {
    _id: string;
    fullName: string;
    email: string;
}

function RecipientModal({
    selectedUsers,
    onConfirm,
    onClose,
}: RecipientModalProps) {
    const [search, setSearch] = useState("");
    const [recipients, setRecipients] = useState<User[]>([]);
    const [ids, setIds] = useState<string[]>(
        (selectedUsers ?? []).map(user => user._id)
    );

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const res = await getChildren({
                    q: search.trim(),
                });

                setRecipients(res.data.data.children);
            } catch (err: any) {
                console.error(err.message || "Error on child api call");
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    const handleConfirm = () => {
        const selectedUsers = recipients.filter((recipient) =>
            ids.includes(recipient._id)
        );

        onConfirm(selectedUsers);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Select Recipients
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Choose who should receive this notification.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
              text-gray-400
              hover:text-gray-700
              text-2xl
              leading-none
            "
                    >
                        ×
                    </button>
                </div>


                {/* Search */}
                <div className="px-6 py-4 border-b">
                    <input
                        type="text"
                        placeholder="Search recipients..."
                        value={search || ""}
                        onChange={(e) => setSearch(e.target.value)}
                        // onKeyDown={(e) => {
                        //     if (e.key === "Enter") {
                        //        getChildren({q:e.target.value})
                        //     }
                        // }}
                        className="
              w-full
              border
              border-gray-300
              rounded-lg
              px-4
              py-2.5
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
                    />
                </div>


                {/* Select All */}
                <div className="px-6 py-3 border-b bg-gray-50">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={
                                recipients.length > 0 &&
                                ids.length === recipients.length
                            }
                            onChange={(e) => {
                                if (e.target.checked) {
                                    const allRecipientIds = recipients.map(
                                        recipient => recipient._id
                                    );
                                    setIds(allRecipientIds);
                                } else {
                                    setIds([]);
                                }
                            }}



                            className="
                w-4
                h-4
                rounded
                border-gray-300
                text-blue-600
                focus:ring-blue-500
              "
                        />

                        <span className="text-sm font-medium text-gray-700">
                            Select All
                        </span>
                    </label>
                </div>

                {/* Recipients */}
                <div className="max-h-[360px] overflow-y-auto">
                    {recipients.map((recipient) => (
                        <label
                            key={recipient._id}
                            className="
              flex
              items-center
              gap-4
              px-6
              py-4
              border-b
              hover:bg-gray-50
              cursor-pointer
            "
                        >
                            <input
                                type="checkbox"
                                checked={ids.includes(recipient._id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setIds(prev => [...prev, recipient._id]);
                                    } else {
                                        setIds(prev => prev.filter(id => id !== recipient._id));
                                    }
                                }}

                                className="
                            w-4
                            h-4
                            rounded
                            border-gray-300
                            text-blue-600
                            focus:ring-blue-500
                            "
                            />

                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {recipient.fullName}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    {recipient.email}
                                </p>
                            </div>

                        </label>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t">

                    <div className="flex items-center justify-between">

                        <p className="text-sm text-gray-500">
                            {ids.length} recipients selected
                        </p>

                        <div className="flex items-center gap-3">

                            <button
                                type="button"
                                onClick={onClose}
                                className="
                  px-4
                  py-2
                  border
                  border-gray-300
                  rounded-lg
                  text-gray-700
                  hover:bg-gray-50
                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="
                  px-5
                  py-2
                  bg-blue-600
                  text-white
                  rounded-lg
                  font-medium
                  hover:bg-blue-700
                "
                            >
                                Select Recipients
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default RecipientModal;