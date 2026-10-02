function Dashboard({ students, onDepartmentClick, onViewAllStudents }) {
  const totalStudents = students.length;

  const departments = [...new Set(
    students.map((student) => student.department)
  )];

  const semesters = [...new Set(
    students.map((student) => student.semester)
  )];
  const semesterOrder = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const getSemesterNumber = (semester) => {
    const numericSemester = Number(semester);

    if (!Number.isNaN(numericSemester)) {
      return numericSemester;
    }

    const romanIndex = semesterOrder.indexOf(semester);
    return romanIndex === -1 ? Number.MAX_SAFE_INTEGER : romanIndex + 1;
  };

  const departmentCounts = students.reduce((acc, student) => {
    acc[student.department] =
      (acc[student.department] || 0) + 1;

    return acc;
  }, {});

  const semesterCounts = students.reduce((acc, student) => {
    acc[student.semester] =
      (acc[student.semester] || 0) + 1;

    return acc;
  }, {});

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <section>
        <p className="text-sm font-medium text-slate-500 mb-2">
          PEC • STUDENT PORTAL
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Student Overview
        </h1>

        <p className="mt-2 text-slate-500 max-w-2xl">
          Monitor student records, departments and academic
          information from one place.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Total Students */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Students
              </p>

              <h2 className="text-4xl font-bold text-slate-900 mt-3">
                {totalStudents}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Active student records
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
              👥
            </div>

          </div>
        </div>

        {/* Departments */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Departments
              </p>

              <h2 className="text-4xl font-bold text-slate-900 mt-3">
                {departments.length}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Academic departments
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
              🎓
            </div>

          </div>
        </div>

        {/* Semesters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Semesters
              </p>

              <h2 className="text-4xl font-bold text-slate-900 mt-3">
                {semesters.length}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Active semesters
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
              📚
            </div>

          </div>
        </div>

      </section>

      {/* Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Department Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Department Distribution
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Student distribution across departments
            </p>
          </div>

          <div className="space-y-5">

            {Object.entries(departmentCounts).map(
              ([department, count]) => {

                const percentage =
                  (count / totalStudents) * 100;

                return (
                  <button
                    key={department}
                    onClick={() => onDepartmentClick(department)}
                    className="w-full text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition"
                  >

                    <div className="flex justify-between mb-2">

                      <span className="text-sm font-medium text-slate-700">
                        {department}
                      </span>

                      <span className="text-sm font-semibold text-slate-900">
                        {count}
                      </span>

                    </div>

                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-slate-900 rounded-full"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </button>
                );
              }
            )}

          </div>
        </div>

        {/* Semester Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Semester Distribution
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Students grouped by semester
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            {Object.entries(semesterCounts)
              .sort(([firstSemester], [secondSemester]) =>
                getSemesterNumber(firstSemester) -
                getSemesterNumber(secondSemester)
              )
              .map(
              ([semester, count]) => (

                <div
                  key={semester}
                  className="border border-slate-200 rounded-xl p-5"
                >

                  <p className="text-sm text-slate-500">
                    Semester {semester}
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-2">
                    {count}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    students
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </section>

      {/* Recent Students */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-200 flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Students
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Recently added student records
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onViewAllStudents}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
            >
              View all →
            </button>

            <span className="text-sm text-slate-500">
              {students.length} records
            </span>
          </div>

        </div>

        <div className="divide-y divide-slate-100">

          {students.slice(0, 4).map((student) => (

            <div
              key={student.registerNo}
              className="p-5 flex items-center justify-between hover:bg-slate-50 transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-700">
                  {student.name.charAt(0)}
                </div>

                <div>
                  <p className="font-medium text-slate-900">
                    {student.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {student.registerNo} • {student.department}
                  </p>
                </div>

              </div>

              <div className="hidden sm:block text-right">

                <p className="text-sm font-medium text-slate-700">
                  {student.year} Year
                </p>

                <p className="text-xs text-slate-400">
                  Semester {student.semester}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;
