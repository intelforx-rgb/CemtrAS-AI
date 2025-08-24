import React, { memo, useMemo } from 'react';
import { User, Bot, AlertTriangle, CheckCircle, Info, Target, BarChart3, Lightbulb, Shield } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = memo(({ message }) => {
  const isUser = message.role === 'user';
  
  const renderStructuredContent = useMemo(() => (content: string) => {
    // Split content by sections
    const sections = content.split(/(?=Section \d+:|Problem Understanding|Analysis|Actionable Recommendations|Compliance Notes|Cost & Efficiency)/g);
    
    return sections.map((section, index) => {
      if (section.trim() === '') return null;
      
      // Check for section headers
      if (section.includes('Problem Understanding') || section.includes('Section 1:')) {
        return (
          <div key={index} className="mb-6">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-red-200 bg-red-50 text-red-700 font-bold text-sm mb-3">
              <Target className="w-4 h-4" />
              PROBLEM UNDERSTANDING
            </div>
            <div className="text-slate-700 leading-relaxed pl-4 border-l-4 border-red-200">
              {section.replace(/Problem Understanding|Section 1:/g, '').trim()}
            </div>
          </div>
        );
      }
      
      if (section.includes('Analysis') || section.includes('Section 2:')) {
        return (
          <div key={index} className="mb-6">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-blue-200 bg-blue-50 text-blue-700 font-bold text-sm mb-3">
              <BarChart3 className="w-4 h-4" />
              ANALYSIS / BEST PRACTICES
            </div>
            <div className="text-slate-700 leading-relaxed pl-4 border-l-4 border-blue-200">
              {formatBulletPoints(section.replace(/Analysis|Best Practices|Section 2:/g, '').trim())}
            </div>
          </div>
        );
      }
      
      if (section.includes('Actionable Recommendations') || section.includes('Solution') || section.includes('Section 3:')) {
        return (
          <div key={index} className="mb-6">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-green-200 bg-green-50 text-green-700 font-bold text-sm mb-3">
              <Lightbulb className="w-4 h-4" />
              ACTIONABLE RECOMMENDATIONS
            </div>
            <div className="text-slate-700 leading-relaxed pl-4 border-l-4 border-green-200">
              {formatBulletPoints(section.replace(/Actionable Recommendations|Solution|Recommendation|Section 3:/g, '').trim())}
            </div>
          </div>
        );
      }
      
      if (section.includes('Compliance Notes') || section.includes('Safety') || section.includes('Section 4:')) {
        return (
          <div key={index} className="mb-6">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-yellow-200 bg-yellow-50 text-yellow-700 font-bold text-sm mb-3">
              <Shield className="w-4 h-4" />
              COMPLIANCE & SAFETY NOTES
            </div>
            <div className="text-slate-700 leading-relaxed pl-4 border-l-4 border-yellow-200">
              {formatBulletPoints(section.replace(/Compliance Notes|Safety|Best Practices|Section 4:/g, '').trim())}
            </div>
          </div>
        );
      }
      
      if (section.includes('Cost & Efficiency') || section.includes('Section 5:')) {
        return (
          <div key={index} className="mb-6">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-purple-200 bg-purple-50 text-purple-700 font-bold text-sm mb-3">
              <BarChart3 className="w-4 h-4" />
              COST & EFFICIENCY IMPLICATIONS
            </div>
            <div className="text-slate-700 leading-relaxed pl-4 border-l-4 border-purple-200">
              {formatBulletPoints(section.replace(/Cost & Efficiency|Section 5:/g, '').trim())}
            </div>
          </div>
        );
      }
      
      // Default content
      return (
        <div key={index} className="text-slate-700 leading-relaxed mb-4">
          {formatBulletPoints(section)}
        </div>
      );
    });
  }, []);

  const structuredContent = useMemo(() => {
    return renderStructuredContent(message.content);
  }, [message.content, renderStructuredContent]);
  
  const formatBulletPoints = (text: string) => {
    return text.split('\n').map((line, lineIndex) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
        return (
          <div key={lineIndex} className="flex items-start gap-3 ml-4 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>{trimmedLine.replace(/^[•\-*]\s*/, '')}</span>
          </div>
        );
      }
      return trimmedLine ? <p key={lineIndex} className="mb-2">{trimmedLine}</p> : null;
    });
  };
  
  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-8`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
        isUser 
          ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
          : 'bg-gradient-to-br from-slate-700 to-slate-900'
      }`}>
        {isUser ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
      </div>
      
      <div className={`max-w-4xl ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-6 py-4 shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl rounded-br-md'
            : 'bg-white text-slate-800 border-4 border-slate-200 rounded-2xl rounded-bl-md'
        }`}>
          <div className="text-sm leading-relaxed">
            {isUser ? (
              <div className="font-semibold">{message.content}</div>
            ) : (
              <div className="space-y-2">
                {structuredContent}
              </div>
            )}
          </div>
        </div>
        <div className={`text-xs text-slate-500 mt-2 font-semibold ${isUser ? 'text-right' : 'text-left'}`}>
          {isUser ? 'YOU' : 'CemtrAS AI'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
});