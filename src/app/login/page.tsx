// app/login/page.tsx
'use client'; // Enable client-side rendering

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook for redirection
import { userLogin } from '@/services/api/login'; // Import the login API function
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies

export default function LoginPage() {
  const router = useRouter(); // Initialize router for redirection
  const [username, setUsername] = useState<string>(''); // State for username input
  const [password, setPassword] = useState<string>(''); // State for password input
  const [loading, setLoading] = useState<boolean>(false); // Loading state for the button
  const [error, setError] = useState<string>(''); // Error message state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission
    setLoading(true); // Set loading state to true
    setError(''); // Clear previous errors

    try {
      const data = await userLogin(username, password); // Call the login API
      console.log('Login successful:', data); // Log success response

      // Set token in cookies
      Cookies.set('token', data.token, { expires: 7, path: '/' }); // Set token with 7-day expiration

      // Redirect to user list after successful login
      router.push('/user-list'); // Programmatically navigate to the user list page
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.'); // Set error message
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />

          {/* Password Input */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />

          {/* Display Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold ${
              loading ? 'bg-blue-400' : 'hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
