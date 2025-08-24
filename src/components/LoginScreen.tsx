import React from 'react';
import { Factory, LogIn, Zap, ArrowRight, Shield, Clock, FileText } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onGuestAccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGuestAccess }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 flex">
      {/* Left Side - 50% */}
      <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-yellow-500 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-blue-500 rounded-lg rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full"></div>
        </div>

        {/* Logo */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
              <Factory className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">CEMENT PLANT</h1>
              <p className="text-yellow-400 text-sm font-semibold">EXPERT AI</p>
            </div>
          </div>
        </div>

        {/* Profile Photo Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <div className="w-48 h-48 rounded-full overflow-hidden border-6 border-yellow-500 shadow-2xl mx-auto mb-6">
            <img 
              src="/untitled (10).jpeg" 
              alt="Vipul Sharma"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-white font-bold text-2xl mb-2">Vipul Sharma</h2>
            <p className="text-yellow-400 font-semibold text-lg mb-1">Technical Assistant</p>
            <p className="text-slate-300 text-sm">Plant Operations Expert</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center max-w-lg">
          <h3 className="text-white font-bold text-3xl mb-4 leading-tight">
            👷 Welcome to Cement Plant Expert AI
          </h3>
          <p className="text-slate-300 text-lg mb-2 font-semibold">
            Your Partner in Optimizing Operations, Safety & Efficiency
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            I am <span className="text-yellow-400 font-bold">Vipul</span>, your technical assistant, here to provide expert guidance for cement plant operations, maintenance, and performance improvement.
          </p>
        </div>
      </div>

      {/* Right Side - 50% */}
      <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Choose Access Method</h2>
            <p className="text-slate-600 text-lg">Select how you'd like to proceed</p>
          </div>

          {/* Login/Register Button */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-3xl">
            <div className="text-center">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <LogIn className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">🔑 Login / Register</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Access advanced features and personalized experience
              </p>
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <Shield className="text-blue-600 w-5 h-5" />
                  <span className="text-slate-700 font-semibold">Save chat history & detailed reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-green-600 w-5 h-5" />
                  <span className="text-slate-700 font-semibold">Extended session capabilities</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="text-purple-600 w-5 h-5" />
                  <span className="text-slate-700 font-semibold">Personalized plant recommendations</span>
                </div>
              </div>
              <button
                onClick={onLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 px-6 rounded-xl
                         hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl
                         flex items-center justify-center gap-3 text-lg"
              >
                <LogIn size={20} />
                Login / Register
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Guest Access Button */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-3xl">
            <div className="text-center">
              <div className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Zap className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">⚡ Quick Guest Access</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Continue without login for fast one-time queries
              </p>
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-yellow-600 w-5 h-5" />
                  <span className="text-slate-700 font-semibold">Instant access to AI assistant</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-yellow-600 w-5 h-5" />
                  <span className="text-slate-700 font-semibold">No registration required</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-yellow-600 w-5 h-5" />
                  <span className="text-slate-700 font-semibold">Perfect for quick consultations</span>
                </div>
              </div>
              <button
                onClick={onGuestAccess}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 px-6 rounded-xl
                         hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl
                         flex items-center justify-center gap-3 text-lg"
              >
                <Zap size={20} />
                Continue as Guest
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Powered by <span className="text-blue-600 font-bold">Advanced AI Technology</span> | 
            © 2024 Cement Plant Expert
          </p>
        </div>
      </div>
    </div>
  );
};