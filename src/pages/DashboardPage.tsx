import { useState, useEffect } from "react";
import { getChildCount } from '../services/user.api';
import { getCurrentUser } from '../utils/auth';

function DashboardPage() {
  const [totalAdmins, setTotalAdmins] = useState(0);
  const loggedInUser = getCurrentUser();

  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const res = await getChildCount();
        setTotalAdmins(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (loggedInUser.role != 'USER') {
      fetchAdminCount();
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Overview of admins, users and notifications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Total Admins */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Admins</h3>
          <p className="text-4xl font-bold mt-3 text-blue-600">{totalAdmins}</p>
        </div>

        {/* Online Admins */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Online Admins</h3>
          <p className="text-4xl font-bold mt-3 text-green-600">4</p>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-4xl font-bold mt-3 text-purple-600">245</p>
        </div>

        {/* Notifications Sent */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Notifications Sent</h3>
          <p className="text-4xl font-bold mt-3 text-orange-500">128</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>

        <div className="space-y-4">

          <div className="border rounded-lg p-4 flex justify-between items-center">
            <span>SuperAdmin created a new Admin account.</span>
            <span className="text-sm text-gray-500">2 mins ago</span>
          </div>

          <div className="border rounded-lg p-4 flex justify-between items-center">
            <span>Admin Sarah sent an Event Notification.</span>
            <span className="text-sm text-gray-500">10 mins ago</span>
          </div>

          <div className="border rounded-lg p-4 flex justify-between items-center">
            <span>Admin John added 5 new users.</span>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>

          <div className="border rounded-lg p-4 flex justify-between items-center">
            <span>Admin Mike marked notifications as read.</span>
            <span className="text-sm text-gray-500">3 hours ago</span>
          </div>

        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Notifications</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3">Title</th>
                <th className="pb-3">Sender</th>
                <th className="pb-3">Recipients</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-4">Server Maintenance</td>
                <td className="py-4">SuperAdmin</td>
                <td className="py-4">12 Admins</td>
                <td className="py-4 text-green-600 font-medium">10 / 12 Read</td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Policy Update</td>
                <td className="py-4">SuperAdmin</td>
                <td className="py-4">12 Admins</td>
                <td className="py-4 text-yellow-600 font-medium">7 / 12 Read</td>
              </tr>

              <tr>
                <td className="py-4">New Feature Release</td>
                <td className="py-4">SuperAdmin</td>
                <td className="py-4">12 Admins</td>
                <td className="py-4 text-blue-600 font-medium">12 / 12 Read</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default DashboardPage;

