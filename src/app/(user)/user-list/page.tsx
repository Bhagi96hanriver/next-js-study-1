"use client"; // Enable client-side rendering

import { useState } from "react";
import { Student } from "@/types/userAuth/types"; // Import the Student type
import { userListing } from "@/services/api/listing"; // Import the API function
import { studentList } from "@/commonData/user"; // Import the initial static student data
import { useRouter } from "next/navigation"; // Import useRouter for client-side navigation
import Button from "@/app/components/Button"; // Import the Button component
import Dataview from "@/app/components/Dataview"; // Import the modal component

export default function StudentList() {
  // Initial static data for students
  const staticStudents: Student[] = studentList; // Use the imported static studentList
  const router = useRouter();

  // State to hold the list of students, initially with static data
  const [students, setStudents] = useState<Student[]>(staticStudents);
  const [loading, setLoading] = useState(false);
  const [addstudentModal, setAddstudentModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listData, setListData] = useState<Student[]>([]);

  // State to hold the form input data
  const [formData, setFormData] = useState<Student>({
    id: 0,
    title: "",
    body: "",
    userId: 1, // Assuming default userId is 1
  });

  // Function to fetch data from the API and replace the student list
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await userListing(); // Fetch from the API
      setStudents(response); // Update the state with fetched data
      setIsModalOpen(true); // Open the modal
      setListData(response);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (id: number) => {
    // Navigate to the user details page with the user ID as a query parameter
    router.push(`/user-details/${id}`);
  };

  const handleClick = () => {
    fetchStudents();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const handlestudentModal = () => {
    setAddstudentModal(true); // open the modal
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add the new student to the list, keeping the static list intact
    setStudents((prevStudents) => [
      ...prevStudents,
      {
        id: formData.id,
        title: formData.title,
        body: formData.body,
        userId: formData.userId,
      },
    ]);

    // Reset the form data
    setFormData({
      id: 0,
      title: "",
      body: "",
      userId: 1, // Reset userId to default
    });
    setAddstudentModal(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Student List</h1>
      <Button name="open Dataview Modal" onClick={handleClick} />

      <div className="flex justify-center mb-6 mr-2">
        <button
          onClick={fetchStudents}
          className={`px-4 py-2 mr-3 rounded-md text-white font-semibold ${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Request Data"}
        </button>
        <button
          onClick={handlestudentModal}
          className="px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700"
          
        >
          Add student
        </button>
      </div>

      {/* Form to submit new student */}
      {addstudentModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">Add New Student</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ID
                </label>
                <input
                  type="number"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Body
                </label>
                <input
                  type="text"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List of students */}
      <div className="max-w-4xl mx-auto bg-white p-4 shadow rounded-md">
        <ul className="divide-y divide-gray-200">
          {students.map((student) => (
            <li
              key={student.id}
              className="p-4 hover:bg-gray-50 transition"
              onClick={() => handleUserClick(student.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {student.id}
                  </p>
                  <p className="text-sm text-gray-600">
                    Title: {student.title}
                  </p>
                  <p className="text-sm text-gray-600">Body: {student.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal Component */}
      <Dataview
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listData={listData}
      />
    </main>
  );
}
