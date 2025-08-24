export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type UserRole = 'Operations' | 'Project Management' | 'Sales & Marketing' | 'Procurement' | 'Erection & Commissioning' | 'Engineering & Design';

export type GeneralRole = 'General AI Assistant';

export type AllRoles = UserRole | GeneralRole;

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  selectedRole: AllRoles;
}

export interface User {
  name: string;
  email: string;
  chatHistory: Message[];
}