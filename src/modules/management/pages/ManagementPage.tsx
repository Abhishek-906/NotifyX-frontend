import { useState } from "react";

function ManagementPage() {
  const [showAdminModal, setShowAdminModal] = useState(false);


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
                Add Admin
              </h2>

              <button
                className="text-gray-500 hover:text-black text-xl"
                onClick={() => setShowAdminModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter full name"
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
                  Create Admin
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-100 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Admin Management
            </h1>
            <p className="text-gray-500 mt-2">
              Manage admins and monitor account status
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700" onClick={() => setShowAdminModal(true)}>
            + Add Admin
          </button>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search by name or email..."
              className="flex-1 border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="border px-4 py-3 rounded-lg outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Blocked</option>
              <option>Online</option>
            </select>

          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
            Admin List
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

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4">John Doe</td>
                  <td className="py-4">john@gmail.com</td>
                  <td className="py-4">24</td>
                  <td className="py-4">
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  </td>
                  <td className="py-4">2025-05-10</td>
                  <td className="py-4 space-x-3">
                    <button className="text-blue-600 hover:underline">
                      View
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

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4">Sarah Smith</td>
                  <td className="py-4">sarah@gmail.com</td>
                  <td className="py-4">18</td>
                  <td className="py-4">
                    <span className="text-red-500 font-medium">
                      Blocked
                    </span>
                  </td>
                  <td className="py-4">2025-04-22</td>
                  <td className="py-4 space-x-3">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                    <button className="text-green-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-yellow-600 hover:underline">
                      Unblock
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-4">Mike Ross</td>
                  <td className="py-4">mike@gmail.com</td>
                  <td className="py-4">31</td>
                  <td className="py-4">
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  </td>
                  <td className="py-4">2025-03-18</td>
                  <td className="py-4 space-x-3">
                    <button className="text-blue-600 hover:underline">
                      View
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

              </tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagementPage;