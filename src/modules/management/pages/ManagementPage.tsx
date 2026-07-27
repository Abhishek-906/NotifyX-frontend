import { useEffect, useState } from "react";
import { createUser, getChildren } from '../../../services/user.api';
import { sendNotification } from '../../../services/notification.api';
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

interface Child {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  parentId: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  childrenCount: number;
}

function ManagementPage() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [searchText, setSearchText] = useState(
    searchParams.get("q") ?? ""
  );
  const [childrenPagination, setChildrenPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  //nofication
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<Child | null>(null);

  const childrenListFilter = {
    parentId: searchParams.get("parentId") ?? undefined,
    limit: Number(searchParams.get("limit") ?? 10),
    page: Number(searchParams.get("page") ?? 1),
    q: searchParams.get("q") ?? undefined,
    status: searchParams.get("status") ?? undefined
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    try {
      const payload = {
        receiverUserId: selectedUser._id ?? "",
        title,
        message,
      };

      const res = await sendNotification(payload);

      if (res.data.success) {
        toast.success("Notification sent");

        setTitle("");
        setMessage("");
        setSelectedUser(null);
        setShowNotificationModal(false);
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  const fetchChildren = async () => {
    try {
      const res = await getChildren(childrenListFilter);

      setChildrenList(res.data.data.children);
      setChildrenPagination(res.data.data.pagination);
    } catch {
      toast.error("Failed to fetch admins");
    }
  };


  useEffect(() => {
    fetchChildren();
  }, [searchParams]);

  useEffect(() => {
    setSearchText(searchParams.get("q") ?? "");
  }, [searchParams]);


  const isViewingChildren = !!searchParams.get("parentId");

  const start =
    childrenPagination.total === 0
      ? 0
      : (childrenPagination.page - 1) *
      childrenPagination.limit +
      1;

  const end = Math.min(
    childrenPagination.page *
    childrenPagination.limit,
    childrenPagination.total
  );


  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (searchParams.get('parentId')) {
        await createUser(
          { fullName, email, password, parentId: searchParams.get('parentId') }
        );
      } else {
        await createUser(
          { fullName, email, password }
        );
      }

      toast.success("User Create successfully");
      setFullName("");
      setEmail("");
      setPassword("");
      setShowAdminModal(false);
      await fetchChildren();
    } catch (err: any) {
      const message = err?.response?.data?.message;

      toast.error(
        Array.isArray(message)
          ? message[0]
          : message || "Something went wrong"
      );
    }
  }

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchText.trim()) {
      params.set("q", searchText.trim());
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    setSearchParams(params);
  }


  return (
    <>
      {showAdminModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowAdminModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isViewingChildren ? "Add User" : "Add Admin"}
              </h2>

              <button
                className="text-gray-500 hover:text-black text-xl"
                onClick={() => setShowAdminModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={addUser}>

              {/* Full Name */}
              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 font-medium">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg border hover:bg-gray-100"
                  onClick={() => setShowAdminModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  {isViewingChildren ? "Add User" : "Add Admin"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {showNotificationModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowNotificationModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Send Notification
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Send a notification to the selected user
                </p>
              </div>

              <button
                className="text-gray-500 hover:text-black text-xl"
                onClick={() => setShowNotificationModal(false)}
              >
                ✕
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSendNotification} >

              {/* Receiver */}
              <div>
                <label className="block mb-2 font-medium">
                  Receiver
                </label>

                <input
                  type="text"
                  placeholder="Selected user"
                  readOnly
                  className="w-full border px-4 py-3 rounded-lg bg-gray-100 text-gray-600"
                  value={selectedUser?.fullName || ""}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block mb-2 font-medium">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notification title"
                  className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 font-medium">
                  Message
                </label>

                <textarea
                  rows={5}
                  value={message}
                  placeholder="Enter notification message..."
                  className="w-full border px-4 py-3 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => { setMessage(e.target.value) }}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg border hover:bg-gray-100"
                  onClick={() => setShowNotificationModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Send Notification
                </button>
              </div>

            </form>
          </div>
        </div>
      )}


      <div className="bg-gray-100 p-1">

        {searchParams.get("parentId") && (
          <button
            className="mb-4 text-blue-600 hover:underline"
            onClick={() => {
              const params = new URLSearchParams(searchParams);

              params.delete("parentId");
              params.set("page", "1");

              setSearchParams(params);
            }}
          >
            ← Back to Admins
          </button>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {isViewingChildren ? "User Management" : "Admin Management"}
            </h1>

            <p className="text-gray-500 mt-2">
              {isViewingChildren
                ? "Manage users under this admin"
                : "Manage admins and monitor account status"}
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700" onClick={() => setShowAdminModal(true)}>
            {isViewingChildren ? "+ Add User" : "+ Add Admin"}
          </button>
        </div>


        {/* Table */}
        <div className="bg-white rounded-xl shadow p-6 min-h-[60vh] flex flex-col">

          <div className="flex flex-col md:flex-row  md:items-center md:justify-between gap-4 mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-96 border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
              >
                Search
              </button>

              <select
                className="border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={searchParams.get("status") ?? ""}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);

                  if (e.target.value) {
                    params.set("status", e.target.value);
                  } else {
                    params.delete("status");
                  }

                  params.set("page", "1");
                  setSearchParams(params);
                }}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>

            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            {isViewingChildren ? "User List" : "Admin List"}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b text-left">
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Users</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Created At</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>



              <tbody>
                {childrenList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-gray-500"
                    >
                      No admins found
                    </td>
                  </tr>
                ) : (
                  childrenList.map((child) => (
                    <tr
                      key={child._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-4">{child.fullName}</td>
                      <td className="py-4">{child.email}</td>
                      <td className="py-4">
                        {!isViewingChildren ? (
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => {
                              const params = new URLSearchParams(searchParams);
                              params.set("parentId", child._id);
                              params.set("page", "1");
                              setSearchParams(params);
                            }}
                          >
                            {child.childrenCount} Users
                          </button>
                        ) : (
                          <span>{child.childrenCount}</span>
                        )}
                      </td>

                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${child.isBlocked
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                            }`}
                        >
                          {child.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>

                      <td className="py-4">
                        {new Date(child.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      <td className="py-4 space-x-3">

                        <button className="text-green-600 hover:underline" onClick={() => {
                          setSelectedUser(child);
                          setTitle("");
                          setMessage("");
                          setShowNotificationModal(true);
                        }}>
                          Send Notification
                        </button>

                        <button className="text-green-600 hover:underline">
                          Edit
                        </button>

                        <button className="text-yellow-600 hover:underline">
                          Block
                        </button>

                        <button className="text-red-500 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-1 gap-4">

          <p>
            Showing {start}–{end} of {childrenPagination.total}{" "}
            {isViewingChildren ? "users" : "admins"}
          </p>

          <div className="flex items-center gap-4">

            {/* Rows Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Rows per page:
              </span>

              <select
                value={searchParams.get("limit") ?? "10"}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);

                  params.set("limit", e.target.value);
                  params.set("page", "1");

                  setSearchParams(params);
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            {/* Pagination */}
            <button
              disabled={childrenPagination.page === 1}
              className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.set(
                  "page",
                  String(childrenPagination.page - 1)
                );

                setSearchParams(params);
              }}
            >
              Previous
            </button>

            <span className="text-sm">
              Page {childrenPagination.page} of{" "}
              {childrenPagination.totalPages}
            </span>

            <button
              disabled={
                childrenPagination.page ===
                childrenPagination.totalPages
              }
              className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.set(
                  "page",
                  String(childrenPagination.page + 1)
                );

                setSearchParams(params);
              }}
            >
              Next
            </button>

          </div>

        </div>
      </div>
    </>
  );
}

export default ManagementPage;