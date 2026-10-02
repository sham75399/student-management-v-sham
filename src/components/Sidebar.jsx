function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-xl font-bold mb-8">
        Student Management
      </h1>

      <nav className="space-y-2">

        <button
          onClick={() => setCurrentPage("dashboard")}
          className={`w-full text-left p-3 rounded-lg ${
            currentPage === "dashboard"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentPage("students")}
          className={`w-full text-left p-3 rounded-lg ${
            currentPage === "students"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setCurrentPage("add-student")}
          className={`w-full text-left p-3 rounded-lg ${
            currentPage === "add-student"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          Add Student
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;