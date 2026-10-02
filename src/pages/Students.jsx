import { useEffect, useState } from "react";

function Students({
  students,
  onAddStudent,
  onDeleteStudent,
  onEditStudent,
  selectedDepartment,
}) {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setDepartmentFilter(selectedDepartment || "All");
  }, [selectedDepartment]);

  const filteredStudents = students
    .filter((student) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.registerNo.toLowerCase().includes(searchValue);

      const matchesDepartment =
        departmentFilter === "All" ||
        student.department === departmentFilter;

      const matchesYear =
        yearFilter === "All" ||
        student.year === yearFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesYear
      );
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }

      if (sortBy === "reg-asc") {
        return a.registerNo.localeCompare(b.registerNo);
      }

      if (sortBy === "reg-desc") {
        return b.registerNo.localeCompare(a.registerNo);
      }

      return 0;
    });

  return (
    <div className="space-y-7">

      {/* Page Heading */}
      <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-slate-500">
            PEC • DIRECTORY
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Students
          </h1>

          <p className="text-slate-500 mt-2">
            Browse and manage student records.
          </p>
        </div>

        <button
          onClick={onAddStudent}
          className="self-start sm:self-auto px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition"
        >
          + Add Student
        </button>

      </section>

      {/* Search & Filters */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Search */}
          <div className="lg:col-span-2">

            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Search
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or register number..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-slate-400 transition"
              />

            </div>

          </div>

          {/* Department */}
          <div>

            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Department
            </label>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-slate-400"
            >
              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>

          </div>

          {/* Year */}
          <div>

            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Year
            </label>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-slate-400"
            >
              <option value="All">All Years</option>
              <option value="I">I Year</option>
              <option value="II">II Year</option>
              <option value="III">III Year</option>
              <option value="IV">IV Year</option>
            </select>

          </div>

          <button
            onClick={() => {
              setSearch("");
              setDepartmentFilter("All");
              setYearFilter("All");
              setSortBy("");
            }}
            className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Clear Filters
          </button>

        </div>

        {/* Sort Row */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredStudents.length}
            </span>{" "}
            student{filteredStudents.length !== 1 ? "s" : ""}
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white outline-none"
          >
            <option value="">Sort Students</option>
            <option value="name-asc">
              Name: A → Z
            </option>
            <option value="name-desc">
              Name: Z → A
            </option>
            <option value="reg-asc">
              Register No: Low → High
            </option>
            <option value="reg-desc">
              Register No: High → Low
            </option>
          </select>

        </div>

      </section>

      {/* Student Cards */}
      {filteredStudents.length > 0 ? (

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {filteredStudents.map((student) => (

            <article
              key={student.registerNo}
              className="min-w-0 bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-sm transition"
            >

              {/* Student Header */}
              <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-lg font-bold">
                    {student.name.charAt(0)}
                  </div>

                  <div>

                    <h2 className="font-semibold text-slate-900">
                      {student.name}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {student.registerNo}
                    </p>

                  </div>

                </div>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  {student.department}
                </span>

              </div>

              {/* Student Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">
                    Academic Year
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1">
                    {student.year} Year
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">
                    Semester
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1">
                    Semester {student.semester}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">
                    Email
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1 truncate">
                    {student.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1">
                    {student.phone}
                  </p>
                </div>

              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-6 pt-5 border-t border-slate-100">

                <button
                  onClick={() => onEditStudent(student)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDeleteStudent(student)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                  Delete
                </button>

              </div>

            </article>

          ))}

        </section>

      ) : (

        /* Empty State */
        <section className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-2xl">
            ?
          </div>

          <h2 className="text-lg font-semibold text-slate-900 mt-4">
            No students found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Try changing your search or filter options.
          </p>

        </section>

      )}

    </div>
  );
}

export default Students;