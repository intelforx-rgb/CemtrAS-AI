import React, { useState } from "react";

interface Role {
  id: string;
  name: string;
}

interface RoleSelectorProps {
  selectedRole: string;
  onSelectRole: (roleId: string) => void;
  userName?: string;
}

const roles: Role[] = [
  { id: "operations", name: "Cement Plant Operations & Maintenance" },
  { id: "project", name: "Project Management" },
  { id: "sales", name: "Sales & Marketing" },
  { id: "procurement", name: "Procurement & Supply Chain" },
  { id: "erection", name: "Erection & Commissioning" },
  { id: "engineering", name: "Engineering & Design" },
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onSelectRole, userName }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-2">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-blue-700 text-white px-4 py-2 rounded font-bold w-full"
        >
          {isMobileOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg p-4 flex flex-col justify-between transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:flex md:flex-col md:translate-x-0 z-50`}
      >
        {/* Branding */}
        <div className="mb-6 text-center md:text-left">
          <img src="/logo.png" alt="CemtrAS AI Logo" className="w-32 mx-auto md:mx-0 mb-2" />
          <h1 className="font-bold text-xl">CemtrAS AI</h1>
          <p className="text-yellow-600 text-sm">AI-Driven Engineering for Cement Excellence.</p>
        </div>

        {/* User Info */}
        {userName && (
          <div className="mb-6 text-center md:text-left">
            <span className="font-semibold">Logged in as:</span>
            <p className="mt-1">{userName}</p>
          </div>
        )}

        {/* Roles */}
        <div className="flex-1 overflow-y-auto">
          <h2 className="font-bold mb-2">Select Role</h2>
          <ul className="flex flex-col gap-2">
            {roles.map((role) => (
              <li key={role.id}>
                <button
                  onClick={() => onSelectRole(role.id)}
                  className={`w-full text-left p-2 rounded font-medium ${
                    selectedRole === role.id
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {role.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer / Founder */}
        <div className="mt-4 text-center md:text-left">
          <img
            src="/untitled (10) copy.jpeg"
            alt="Founder Vipul Sharma"
            className="w-16 h-16 rounded-full shadow-md mx-auto md:mx-0 mb-1"
          />
          <span className="text-sm font-semibold">Founder: Vipul Sharma</span>
        </div>
      </div>
    </>
  );
};
