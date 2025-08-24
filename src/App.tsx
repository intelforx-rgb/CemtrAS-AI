import React, { useState, useRef, useEffect } from 'react';
import { Factory, Settings, User, MessageSquare, Zap, LogIn, UserPlus, ArrowRight, Menu, X } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { RoleSelector } from './components/RoleSelector';
import { LoadingMessage } from './components/LoadingMessage';
import { ErrorMessage } from './components/ErrorMessage';
import { LoginScreen } from './components/LoginScreen';
import { AuthScreen } from './components/AuthScreen';
import { generateResponse } from './utils/gemini';
import type { Message, AllRoles, ChatState, User as UserType } from './types';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    selectedRole: 'Operations'
  });
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isLoading]);

  // Check if API key is available
  useEffect(() => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setError('GEMINI_API_KEY is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
    }
  }, []);

  // Load saved chat history for logged-in users
  useEffect(() => {
    if (currentUser) {
      const savedHistory = localStorage.getItem(`cemtras_chat_${currentUser.id}`);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setChatState(prev => ({ ...prev, messages: parsedHistory }));
      }
    }
  }, [currentUser]);

  // Save chat history for logged-in users
  useEffect(() => {
    if (currentUser && chatState.messages.length > 0) {
      localStorage.setItem(`cemtras_chat_${currentUser.id}`, JSON.stringify(chatState.messages));
    }
  }, [chatState.messages, currentUser]);

  const handleLogin = () => {
    setShowLogin(false);
    setShowAuth(true);
    setIsGuest(false);
  };

  const handleGuestAccess = () => {
    setShowLogin(false);
    setShowAuth(false);
    setIsGuest(true);
  };

  const handleAuthComplete = () => {
    // Simulate user login
    const mockUser: UserType = {
      id: 'user_' + Date.now(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      chatHistory: []
    };
    setCurrentUser(mockUser);
    setShowAuth(false);
    setIsGuest(false);
  };

  const handleSendMessage = async (content: string) => {
    if (error) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));

    try {
      const aiResponse = await generateResponse(content, chatState.selectedRole);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (err) {
      setChatState(prev => ({ ...prev, isLoading: false }));
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleRoleChange = (role: AllRoles) => {
    setChatState(prev => ({ ...prev, selectedRole: role }));
    setMobileMenuOpen(false);
  };

  const clearError = () => setError(null);

  const isLoggedIn = !!currentUser;

  if (showLogin) {
    return <LoginScreen onLogin={handleLogin} onGuestAccess={handleGuestAccess} />;
  }

  if (showAuth) {
    return <AuthScreen onComplete={handleAuthComplete} />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex ${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-gradient-to-b from-slate-800 to-slate-900 border-r-4 border-yellow-500 flex-col shadow-2xl`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b-2 border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Settings className="text-slate-300" size={20} />
            </button>
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
                  <Factory className="text-white" size={28} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-wide">CemtrAS AI</h1>
                  <p className="text-yellow-400 text-xs font-semibold">AI-Driven Engineering</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Founder Section */}
        {sidebarOpen && (
          <div className="p-6 border-b-2 border-slate-700">
            <div className="text-center">
              <div className="text-xs text-slate-400 uppercase tracking-wide font-bold mb-3">FOUNDER</div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg mx-auto mb-3">
                <img 
                  src="/untitled (10).jpeg" 
                  alt="Vipul Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white font-bold text-lg">Vipul Sharma</h3>
              <p className="text-slate-400 text-xs">Cement Industry Expert</p>
            </div>
          </div>
        )}

        {/* Role Selector */}
        {sidebarOpen && (
          <div className="p-6 flex-1 overflow-y-auto">
            <RoleSelector 
              selectedRole={chatState.selectedRole}
              onRoleChange={handleRoleChange}
              isLoggedIn={isLoggedIn}
            />
          </div>
        )}

        {/* Stats */}
        {sidebarOpen && (
          <div className="p-6 border-t-2 border-slate-700">
            <div className="space-y-4">
              <div className="bg-slate-800/80 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="text-blue-400" size={18} />
                  <span className="text-slate-300 text-sm font-semibold">QUERIES PROCESSED</span>
                </div>
                <p className="text-white text-2xl font-bold">{chatState.messages.length}</p>
              </div>
              
              <div className="bg-slate-800/80 rounded-lg p-4 border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-yellow-400" size={18} />
                  <span className="text-slate-300 text-sm font-semibold">SYSTEM STATUS</span>
                </div>
                <p className={`text-sm font-bold ${chatState.isLoading ? 'text-yellow-400' : 'text-green-400'}`}>
                  {chatState.isLoading ? 'ANALYZING...' : 'READY'}
                </p>
              </div>

              {isGuest && (
                <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500">
                  <p className="text-yellow-300 text-xs font-semibold mb-2">GUEST MODE</p>
                  <p className="text-slate-300 text-xs">Login to save chats & access general AI</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t-2 border-slate-700">
          {sidebarOpen ? (
            <div className="text-center">
              <p className="text-slate-400 text-xs">
                Powered by <span className="text-yellow-400 font-bold">CemtrAS AI</span>
              </p>
              <p className="text-slate-500 text-xs mt-1">© 2024 CemtrAS AI</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <span className="text-white text-xs font-bold">CA</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm border-b-4 border-blue-600 p-4 lg:p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
                <Factory className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-slate-800 font-bold text-lg lg:text-xl">🏭 CemtrAS AI</h2>
                <p className="text-slate-600 text-xs lg:text-sm font-semibold">
                  Mode: <span className="text-blue-600 font-bold">{chatState.selectedRole}</span>
                  {isGuest && <span className="ml-2 text-yellow-600">(Guest)</span>}
                  {isLoggedIn && <span className="ml-2 text-green-600">({currentUser?.name})</span>}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-slate-700 text-sm font-semibold hidden sm:inline">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Mobile Role Selector */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-slate-800 to-slate-900 border-b-4 border-yellow-500 p-4 max-h-96 overflow-y-auto">
            <RoleSelector 
              selectedRole={chatState.selectedRole}
              onRoleChange={handleRoleChange}
              isLoggedIn={isLoggedIn}
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4">
            <ErrorMessage 
              message={error} 
              onRetry={error.includes('GEMINI_API_KEY') ? undefined : clearError}
            />
          </div>
        )}

        {/* Chat Container */}
        <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-gray-100 to-white">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
            {chatState.messages.length === 0 && !error ? (
              <div className="text-center py-8 lg:py-12">
                <div className="p-6 lg:p-8 bg-gradient-to-br from-blue-600/10 to-blue-800/10 rounded-3xl w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 lg:mb-8 flex items-center justify-center border-4 border-blue-200 shadow-xl">
                  <Factory className="text-blue-600 w-12 h-12 lg:w-16 lg:h-16" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">🏭 Hello, I'm CemtrAS AI</h3>
                <p className="text-slate-600 mb-6 lg:mb-8 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed px-4">
                  AI-Driven Engineering for Cement Excellence.<br/>
                  Choose your area of expertise to get tailored guidance for cement plant operations, maintenance, and performance improvement.
                </p>
                <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto border-4 border-slate-200 shadow-xl">
                  <h4 className="text-lg lg:text-xl font-bold text-slate-800 mb-4 lg:mb-6">🔧 Available Expertise Areas:</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 text-sm">
                    <div className="text-left space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <p className="text-slate-700 font-semibold">Plant Operations & Maintenance</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="text-slate-700 font-semibold">Project Management</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <p className="text-slate-700 font-semibold">Sales & Marketing</p>
                      </div>
                    </div>
                    <div className="text-left space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <p className="text-slate-700 font-semibold">Procurement & Supply Chain</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <p className="text-slate-700 font-semibold">Erection & Commissioning</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <p className="text-slate-700 font-semibold">Engineering & Design</p>
                      </div>
                    </div>
                  </div>
                  {isLoggedIn && (
                    <div className="mt-6 pt-6 border-t-2 border-slate-200">
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <p className="text-slate-700 font-semibold">General AI Assistant (ChatGPT-like)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                {chatState.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {chatState.isLoading && <LoadingMessage />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t-4 border-blue-600 bg-white/95 backdrop-blur-sm p-4 lg:p-6 shadow-lg">
            <ChatInput 
              onSend={handleSendMessage}
              isLoading={chatState.isLoading || !!error}
              placeholder={`Ask about cement plant operations (${chatState.selectedRole} mode)...`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;