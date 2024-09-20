import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-full lg:w-64 h-screen px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Sidebar Logo */}
          <Image
            className="rounded-full"
            src="/next.svg"
            alt="Admin Logo"
            width={80}
            height={80}
          />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-10 space-y-4">
          <Link href="/" className="block text-lg hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link href="/user-list" className="block text-lg hover:bg-gray-700 p-2 rounded">
            User List
          </Link>
          <Link href="/settings" className="block text-lg hover:bg-gray-700 p-2 rounded">
            Settings
          </Link>
          <Link href="/reports" className="block text-lg hover:bg-gray-700 p-2 rounded">
            Reports
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-white shadow p-4 mb-6">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="flex space-x-4">
            <Link href="/profile" className="text-gray-800 hover:underline">
              Profile
            </Link>
            <Link href="/logout" className="text-red-600 hover:underline">
              Logout
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Example Dashboard Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold">Users</h3>
            <p className="text-gray-700 mt-2">You have 25 active studedents.</p>
          </div>
          {/* Another Dashboard Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold">Orders</h3>
            <p className="text-gray-700 mt-2">5 new orders in the last week.</p>
          </div>
          {/* Another Dashboard Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold">Reports</h3>
            <p className="text-gray-700 mt-2">Generate and view reports.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
