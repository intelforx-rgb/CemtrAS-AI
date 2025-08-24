import React from 'react';
import { Factory, BarChart3, TrendingUp, ShoppingCart, Wrench, Settings, MessageSquare } from 'lucide-react';
import type { UserRole, GeneralRole, AllRoles } from '../types';

interface RoleSelectorProps {
  selectedRole: AllRoles;
  onRoleChange: (role: AllRoles) => void;
  isLoggedIn: boolean;
}

const specialistRoles: { value: UserRole; label: string; icon: React.ReactNode; color: string; description: string }[] = [
  { 
    value: 'Operations', 
    label: 'Operations & Maintenance', 
    icon: <Factory size={18} />, 
    color: 'border-yellow-500 bg-yellow-50 text-yellow-700',
    description: 'Machinery troubleshooting & process optimization'
  },
  { 
    value: 'Project Management', 
    label: 'Project Management', 
    icon: <BarChart3 size={18} />, 
    color: 'border-blue-500 bg-blue-50 text-blue-700',
    description: 'EPC scheduling & resource planning'
  },
  { 
    value: 'Sales & Marketing', 
    label: 'Sales & Marketing', 
    icon: <TrendingUp size={18} />, 
    color: 'border-green-500 bg-green-50 text-green-700',
    description: 'Market analysis & customer strategies'
  },
  { 
    value: 'Procurement', 
    label: 'Procurement & Supply Chain', 
    icon: <ShoppingCart size={18} />, 
    color: 'border-purple-500 bg-purple-50 text-purple-700',
    description: 'Vendor negotiations & inventory optimization'
  },
  { 
    value: 'Erection & Commissioning', 
    label: 'Erection & Commissioning', 
    icon: <Wrench size={18} />, 
    color: 'border-red-500 bg-red-50 text-red-700',
    description: 'Installation sequencing & safety compliance'
  },
  { 
    value: 'Engineering & Design', 
    label: 'Engineering & Design', 
    icon: <Settings size={18} />, 
    color: 'border-orange-500 bg-orange-50 text-orange-700',
    description: 'Process flow design & equipment selection'
  },
];

const generalRole: { value: GeneralRole; label: string; icon: React.ReactNode; color: string; description: string } = {
  value: 'General AI Assistant',
  label: 'General AI Assistant',
  icon: <MessageSquare size={18} />,
  color: 'border-indigo-500 bg-indigo-50 text-indigo-700',
  description: 'ChatGPT-like general assistance & conversations'
};

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange, isLoggedIn }) => {
  const allRoles = isLoggedIn ? [...specialistRoles, generalRole] : specialistRoles;

  return (
    <div className="space-y-3">
      <div className="text-xs text-slate-400 uppercase tracking-wide font-bold mb-4">
        {isLoggedIn ? 'ALL AVAILABLE MODES:' : 'CEMENT SPECIALIST MODES:'}
      </div>
      
      {/* Specialist Roles */}
      <div className="space-y-2">
        <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">
          🏭 Cement Industry Specialist
        </div>
        {specialistRoles.map((role) => (
          <button
            key={role.value}
            onClick={() => onRoleChange(role.value)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-2 ${
              selectedRole === role.value
                ? `${role.color} shadow-lg transform scale-105`
                : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500'
            }`}
          >
            <div className={`p-2 rounded-lg ${selectedRole === role.value ? 'bg-white/20' : 'bg-slate-700'}`}>
              {role.icon}
            </div>
            <div className="text-left flex-1">
              <div className={`font-bold text-sm ${selectedRole === role.value ? '' : 'text-white'}`}>
                {role.label}
              </div>
              <div className={`text-xs ${selectedRole === role.value ? 'opacity-80' : 'text-slate-400'}`}>
                {role.description}
              </div>
            </div>
            {selectedRole === role.value && (
              <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
            )}
          </button>
        ))}
      </div>

      {/* General AI Assistant (Logged-in only) */}
      {isLoggedIn && (
        <div className="space-y-2 pt-4 border-t-2 border-slate-700">
          <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">
            🤖 General Assistant
          </div>
          <button
            onClick={() => onRoleChange(generalRole.value)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-2 ${
              selectedRole === generalRole.value
                ? `${generalRole.color} shadow-lg transform scale-105`
                : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500'
            }`}
          >
            <div className={`p-2 rounded-lg ${selectedRole === generalRole.value ? 'bg-white/20' : 'bg-slate-700'}`}>
              {generalRole.icon}
            </div>
            <div className="text-left flex-1">
              <div className={`font-bold text-sm ${selectedRole === generalRole.value ? '' : 'text-white'}`}>
                {generalRole.label}
              </div>
              <div className={`text-xs ${selectedRole === generalRole.value ? 'opacity-80' : 'text-slate-400'}`}>
                {generalRole.description}
              </div>
            </div>
            {selectedRole === generalRole.value && (
              <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};