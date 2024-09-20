// app/page.tsx
'use client'; // Enable client-side rendering

import { useState } from 'react';
import { Student} from '@/types/userAuth/types'; // Import the Student type
import { userListing } from '@/services/api/listing'; // Import the Student type
import { studentList } from '@/commonData/user'; // Import the Student type
export default function StudentList() {
  // Initial static data for students
  const staticStudents:Student[] = studentList;

  // State to hold the list of students, initially with static data
  const [students, setStudents] = useState<Student[]>(staticStudents);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from the API and replace the student list
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await(userListing()); // Fetch from the API
      setStudents(response); // Update the state with fetched data
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">payment screen</h1>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={fetchStudents}
          className={`px-4 py-2 rounded-md text-white font-semibold ${
            loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Request Data'}
        </button>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white p-4 shadow rounded-md">
        <ul className="divide-y divide-gray-200">
          {students.map((student) => (
            <li key={student.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{student.id}</p>
                  <p className="text-sm text-gray-600">Age: {student.title}</p>
                  <p className="text-sm text-gray-600">Major: {student.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
