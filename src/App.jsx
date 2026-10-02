import { useEffect, useState } from "react";

import initialStudents from "./data/students";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("pec_students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : initialStudents;
  });

  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const [selectedDepartment, setSelectedDepartment] =
    useState("All");

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem("pec_students", JSON.stringify(students));
  }, [students]);

  const addStudent = (newStudent) => {
    setStudents((currentStudents) => [
      ...currentStudents,
      newStudent,
    ]);

    setNotification({
      type: "success",
      message: "Student added successfully.",
    });

    setCurrentPage("students");

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const deleteStudent = (student) => {
    setStudentToDelete(student);
  };

  const confirmDeleteStudent = () => {
    if (!studentToDelete) return;

    setStudents((currentStudents) =>
      currentStudents.filter(
        (student) =>
          student.registerNo !== studentToDelete.registerNo
      )
    );

    setStudentToDelete(null);

    setNotification({
      type: "success",
      message: "Student deleted successfully.",
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const editStudent = (student) => {
    setEditingStudent(student);
    setCurrentPage("edit-student");
  };

  const updateStudent = (updatedStudent) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.registerNo === editingStudent.registerNo
          ? updatedStudent
          : student
      )
    );

    setEditingStudent(null);
    setCurrentPage("students");

    setNotification({
      type: "success",
      message: "Student updated successfully.",
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const renderPage = () => {
    if (currentPage === "students") {
      return (
        <Students
          students={students}
          selectedDepartment={selectedDepartment}
          onAddStudent={() => {
            setEditingStudent(null);
            setCurrentPage("add-student");
          }}
          onDeleteStudent={deleteStudent}
          onEditStudent={editStudent}
        />
      );
    }

    if (currentPage === "add-student") {
      return (
        <AddStudent
          students={students}
          onAddStudent={addStudent}
        />
      );
    }

    if (currentPage === "edit-student") {
      return (
        <AddStudent
          students={students}
          editingStudent={editingStudent}
          onUpdateStudent={updateStudent}
        />
      );
    }

    return (
      <Dashboard
        students={students}
        onDepartmentClick={(department) => {
          setSelectedDepartment(department);
          setCurrentPage("students");
        }}
        onViewAllStudents={() => {
          setSelectedDepartment("All");
          setCurrentPage("students");
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {notification && (
        <div className="fixed top-24 right-6 z-[100]">
          <div className="flex items-center gap-3 bg-white border border-slate-200 shadow-lg rounded-xl px-5 py-4">

            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
              ✓
            </div>

            <p className="text-sm font-medium text-slate-800">
              {notification.message}
            </p>

          </div>
        </div>
      )}

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-20 flex items-center justify-between">

            {/* PEC Logo */}
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="flex items-center gap-3"
            >
              <img
                src="/pec-logo.png"
                alt="PEC Logo"
                className="w-14 h-14 object-contain"
              />

              <div className="text-left">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                  PEC
                </h1>

                <p className="text-xs sm:text-sm text-slate-500">
                  Student Management System
                </p>
              </div>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-2">

              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === "dashboard"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => setCurrentPage("students")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === "students"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Students
              </button>

              <button
                onClick={() => {
                  setEditingStudent(null);
                  setCurrentPage("add-student");
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === "add-student"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Add Student
              </button>

            </nav>

            {/* Profile */}
            <div className="flex items-center gap-3">

              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-800">
                  Administrator
                </p>

                <p className="text-xs text-slate-500">
                  Student Records
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="font-semibold text-slate-700">
                  A
                </span>
              </div>

            </div>

          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex gap-2 pb-4 overflow-x-auto">

            <button
              onClick={() => setCurrentPage("dashboard")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === "dashboard"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setCurrentPage("students")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === "students"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Students
            </button>

            <button
              onClick={() => {
                setEditingStudent(null);
                setCurrentPage("add-student");
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === "add-student"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Add Student
            </button>

          </nav>

        </div>

      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-slate-500">
            PEC Student Management System
          </p>

          <p className="text-sm text-slate-400">
            Student Administration Portal
          </p>
        </div>
      </footer>

      {studentToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-student-title"
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-lg">
                !
              </div>

              <div>
                <h3 id="delete-student-title" className="text-lg font-bold text-slate-900">
                  Delete Student?
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-700">
                    {studentToDelete.name}
                  </span>
                  ?
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Register No: {studentToDelete.registerNo}
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-7">
              <button
                onClick={() => setStudentToDelete(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteStudent}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;