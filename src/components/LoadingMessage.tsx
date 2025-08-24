import React from 'react';
import { Bot, Cog } from 'lucide-react';

export const LoadingMessage: React.FC = () => {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center 
                      bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg">
        <Bot size={20} className="text-white" />
      </div>
      
      <div className="max-w-4xl">
        <div className="inline-block px-6 py-4 rounded-2xl rounded-bl-md 
                        bg-white border-4 border-slate-200 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <Cog className="text-slate-600 animate-spin" size={16} />
              <span className="text-sm text-slate-700 font-semibold">CemtrAS AI is analyzing your query...</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-2 font-semibold">
          CemtrAS AI • Processing...
        </div>
      </div>
    </div>
  );
};