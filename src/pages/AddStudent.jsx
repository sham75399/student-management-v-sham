import { useState } from "react";

function AddStudent({
  students,
  onAddStudent,
  editingStudent,
  onUpdateStudent,
}) {
  const semesterOptions = {
    "I": ["I", "II"],
    "II": ["III", "IV"],
    "III": ["V", "VI"],
    "IV": ["VII", "VIII"],
  };

  const [formData, setFormData] = useState(
    editingStudent || {
      registerNo: "",
      name: "",
      email: "",
      phone: "",
      department: "",
      year: "",
      semester: "",
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "year") {
      setFormData((previous) => ({
        ...previous,
        year: value,
        semester: "",
      }));

      setErrors((previous) => ({
        ...previous,
        year: "",
        semester: "",
      }));
      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.registerNo.trim()) {
      newErrors.registerNo = "Register number is required.";
    } else {
      const duplicate = students.some(
        (student) =>
          student.registerNo.toLowerCase() ===
            formData.registerNo.trim().toLowerCase() &&
          student.registerNo !== editingStudent?.registerNo
      );

      if (duplicate) {
        newErrors.registerNo =
          "This register number already exists.";
      }
    }

    if (!formData.name.trim()) {
      newErrors.name = "Student name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }

    if (!formData.department) {
      newErrors.department = "Select a department.";
    }

    if (!formData.year) {
      newErrors.year = "Select a year.";
    }

    if (!formData.semester) {
      newErrors.semester = "Select a semester.";
    }

    if (
      formData.year &&
      formData.semester &&
      !semesterOptions[formData.year]?.includes(formData.semester)
    ) {
      newErrors.semester =
        `${formData.year} Year students can only be in the corresponding semesters.`;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (editingStudent) {
      onUpdateStudent(formData);
    } else {
      onAddStudent(formData);
    }
  };

  return (
    <div className="space-y-7">

      {/* Heading */}
      <section>
        <p className="text-sm font-medium text-slate-500">
          PEC • STUDENT DIRECTORY
        </p>

        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          {editingStudent ? "Edit Student" : "Add Student"}
        </h1>

        <p className="text-slate-500 mt-2">
          {editingStudent
            ? "Update the student's academic information."
            : "Create a new student record."}
        </p>
      </section>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8"
      >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Register Number */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Register Number
            </label>

            <input
              type="text"
              name="registerNo"
              value={formData.registerNo}
              onChange={handleChange}
              placeholder="Example: 23IT005"
              className={`w-full px-4 py-3 rounded-xl border outline-none ${
                errors.registerNo
                  ? "border-red-400"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            />

            {errors.registerNo && (
              <p className="text-sm text-red-500 mt-1">
                {errors.registerNo}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Student Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full px-4 py-3 rounded-xl border outline-none ${
                errors.name
                  ? "border-red-400"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            />

            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className={`w-full px-4 py-3 rounded-xl border outline-none ${
                errors.email
                  ? "border-red-400"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            />

            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
              maxLength="10"
              className={`w-full px-4 py-3 rounded-xl border outline-none ${
                errors.phone
                  ? "border-red-400"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            />

            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border outline-none ${
                errors.department
                  ? "border-red-400"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>

            {errors.department && (
              <p className="text-sm text-red-500 mt-1">
                {errors.department}
              </p>
            )}
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Year
            </label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border outline-none ${
                errors.year
                  ? "border-red-400"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            >
              <option value="">Select Year</option>
              <option value="I">I Year</option>
              <option value="II">II Year</option>
              <option value="III">III Year</option>
              <option value="IV">IV Year</option>
            </select>

            {errors.year && (
              <p className="text-sm text-red-500 mt-1">
                {errors.year}
              </p>
            )}
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Semester
            </label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border outline-none ${
                errors.semester
                  ? "border-red-400"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            >
              <option value="">Select semester</option>
              {(semesterOptions[formData.year] || []).map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>

            {errors.semester && (
              <p className="text-sm text-red-500 mt-1">
                {errors.semester}
              </p>
            )}
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3">

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddStudent;
