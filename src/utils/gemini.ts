import { GoogleGenerativeAI } from '@google/generative-ai';
import type { UserRole } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyD-VuzjoltDtX8Kw_inxDOpZ_xohYi7MFk';

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const getSystemInstruction = (role: UserRole): string => {
  const baseInstruction = `You are Vipul Sharma, a Cement Plant Expert AI Assistant and Technical Consultant.

CRITICAL: Always respond in this structured consultant format:

Section 1: Problem Understanding
[Clearly identify and restate the issue or question being addressed]

Section 2: Analysis / Best Practices
[Provide detailed technical analysis with specific parameters, causes, industry best practices, or considerations]

Section 3: Actionable Recommendations
[Give specific, actionable solutions with numbered steps, parameters, or recommendations]

Section 4: Compliance Notes (if relevant)
[Include relevant safety guidelines, regulatory compliance, or industry standards]

Section 5: Cost & Efficiency Implications
[Discuss cost impacts, ROI considerations, efficiency gains, or economic factors]

Your expertise covers cement plant operations with authoritative but approachable tone.
Always use bullet points, numbered steps, or structured lists where helpful.
Include specific technical parameters, temperatures, pressures, or measurements when relevant.
`;

  const roleSpecificInstructions = {
    'Operations': `
CEMENT PLANT OPERATIONS & MAINTENANCE EXPERT
Focus on:
- Machinery troubleshooting and diagnostics
- Process optimization and efficiency improvements
- Preventive and predictive maintenance strategies
- Energy efficiency and sustainability measures
- Operational safety and compliance protocols`,
    
    'Project Management': `
PROJECT MANAGEMENT EXPERT
Focus on:
- EPC project scheduling and milestone tracking
- Resource planning and cost control strategies
- Risk management and mitigation plans
- Erection and commissioning coordination
- Progress monitoring and reporting systems`,
    
    'Sales & Marketing': `
SALES & MARKETING EXPERT
Focus on:
- Cement market analysis and industry trends
- Customer acquisition and retention strategies
- Pricing optimization and competitive positioning
- Distribution channel management
- Brand development and market penetration`,
    
    'Procurement': `
PROCUREMENT & SUPPLY CHAIN EXPERT
Focus on:
- Vendor identification and evaluation criteria
- Strategic sourcing and negotiation tactics
- Inventory optimization and supply chain efficiency
- Import/export compliance and documentation
- Cost-saving procurement strategies and vendor management`,
    
    'Erection & Commissioning': `
ERECTION & COMMISSIONING EXPERT
Focus on:
- Installation sequencing and critical path planning
- Manpower coordination and contractor management
- Safety protocols and compliance during erection
- Pre-commissioning checks and system testing
- Commissioning procedures and performance validation`,
    
    'Engineering & Design': `
ENGINEERING & DESIGN EXPERT
Focus on:
- Process flow design and optimization
- Plant layout and equipment arrangement
- Equipment selection and technical specifications
- Sustainability and green technology integration
- Design standards and engineering best practices`
  };

  return baseInstruction + roleSpecificInstructions[role];
};

export const generateResponse = async (prompt: string, role: UserRole): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: getSystemInstruction(role),
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text || text.trim() === '') {
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    console.error('Error generating response:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        throw new Error('Invalid API key. Please check your Gemini API key configuration.');
      }
      if (error.message.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later or check your billing settings.');
      }
      if (error.message.includes('blocked')) {
        throw new Error('Content was blocked by safety filters. Please rephrase your question.');
      }
    }
    
    throw new Error('Technical system error occurred. Please try again or contact support.');
  }
};