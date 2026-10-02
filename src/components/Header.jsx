function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Student Management System
        </h2>
        <p className="text-sm text-gray-500">
          Manage student records easily
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="font-semibold text-gray-600">A</span>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-800">
            Admin
          </p>
          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;