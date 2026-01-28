import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { DINITH_INFO, PROJECTS } from '../constants';

// Initialize the API client
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-3-flash-preview';

const PROJECT_CONTEXT = PROJECTS.map(p => 
  `- ${p.title}: ${p.description} (Stack: ${p.techStack.join(', ')})`
).join('\n');

const SYSTEM_INSTRUCTION = `
You are an AI Assistant for Dinith's personal portfolio website. 
Dinith is a ${DINITH_INFO.role}.
Education: ${DINITH_INFO.education[0].degree} at ${DINITH_INFO.education[0].institution}.
Skills: ${JSON.stringify(DINITH_INFO.skills)}.

Here are his key projects:
${PROJECT_CONTEXT}

Your goal is to represent Dinith professionally but authentically. 
- He describes himself as "brutally honest, logical, curious, and prefers accuracy over comfort".
- Be helpful to recruiters, developers, and hackathon judges.
- If asked about contact info, direct them to the contact section or mention ${DINITH_INFO.socials.email}.
- Keep answers concise and relevant to software engineering, Web3, and AI.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const generateProjectSummary = async (projectTitle: string, techStack: string[]): Promise<string> => {
  try {
    const prompt = `
      Analyze the project titled "${projectTitle}" which uses the following tech stack: ${techStack.join(', ')}.
      
      Generate a concise technical summary (under 100 words) that explicitly covers:
      1. Technical challenges inherent to this domain.
      2. Key architectural decisions likely involved.
      3. The specific value provided by using this tech stack.
      
      Format the output as a single cohesive paragraph. Do not use bullet points.
    `;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    if (!response.text) {
      throw new Error("No summary generated");
    }
    
    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
};

export const generateProjectDeepDive = async (projectTitle: string, techStack: string[]): Promise<string> => {
  try {
    const prompt = `
      Create a "Technical Deep Dive" for the software project: "${projectTitle}".
      Tech Stack: ${techStack.join(', ')}.

      Please structure the response in Markdown with the following sections (keep it professional and detailed):
      
      ## 🔧 System Architecture
      [Explain the hypothetical or likely architecture pattern (e.g., Microservices, Event-Driven) suitable for this stack]

      ## 🚀 Key Technical Challenges
      [Describe 2-3 complex engineering problems this project likely solves]

      ## 💡 Optimization Strategy
      [Mention how specific tools in the stack (like ${techStack[0]}) are used for performance or security]
      
      Keep the tone confident, technical, and suitable for a Senior Engineer's portfolio.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "Deep dive generation unavailable.";
  } catch (error) {
    console.error("Error generating deep dive:", error);
    return "Unable to retrieve technical analysis at this moment.";
  }
};

export const generateBlogPost = async (topic: string): Promise<string> => {
  try {
    const prompt = `
      Write a short, engaging technical blog post (approx 200 words) about "${topic}".
      Write it from the perspective of Dinith, a Web3 and AI developer.
      Include a title at the start, followed by the content.
      Use Markdown formatting.
    `;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    return response.text || "Blog post generation failed.";
  } catch (error) {
    console.error("Error generating blog:", error);
    return "Could not generate blog post at this time.";
  }
};

export const sendMessageToChat = async (message: string): Promise<string> => {
  try {
    const session = getChatSession();
    const response: GenerateContentResponse = await session.sendMessage({ message });
    return response.text || "I didn't catch that.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I'm having trouble connecting to the neural network right now.";
  }
};