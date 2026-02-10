import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Rate limiting: Track requests per minute
let requestCount = 0;
let lastResetTime = Date.now();
const MAX_REQUESTS_PER_MINUTE = 10; // Conservative limit

function checkRateLimit(): boolean {
  const now = Date.now();
  if (now - lastResetTime > 60000) { // Reset every minute
    requestCount = 0;
    lastResetTime = now;
  }
  
  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }
  
  requestCount++;
  return true;
}

/**
 * Generate title from uploaded media using Gemini Vision
 */
export async function generateTitleFromMedia(file: File, url?: string): Promise<string | null> {
  if (!genAI) {
    return null; // Graceful degradation
  }

  if (!checkRateLimit()) {
    throw new Error('Rate limit exceeded. Please try again in a minute.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type;

    const prompt = `Analyze this UI component screenshot/image and generate a concise, descriptive title (max 60 characters). 
    Focus on what component or pattern is shown, not generic descriptions.
    Examples: "Search Bar with Autocomplete", "Dropdown Menu with Icons", "Tab Navigation Component"
    Return only the title, nothing else.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: mimeType,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text().trim();
    
    // Clean up the response
    return text.length > 60 ? text.substring(0, 60) : text;
  } catch (error) {
    console.error('AI title generation failed:', error);
    return null; // Graceful degradation
  }
}

/**
 * Generate description from uploaded media using Gemini Vision
 */
export async function generateDescriptionFromMedia(file: File, url?: string): Promise<string | null> {
  if (!genAI) {
    return null; // Graceful degradation
  }

  if (!checkRateLimit()) {
    throw new Error('Rate limit exceeded. Please try again in a minute.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type;

    const prompt = `Analyze this UI component screenshot/image and generate a brief description (2-3 sentences, max 200 characters).
    Describe what component or pattern is shown, its key features, and where it might be used.
    Be specific and concise.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: mimeType,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text().trim();
    
    // Clean up the response
    return text.length > 200 ? text.substring(0, 200) : text;
  } catch (error) {
    console.error('AI description generation failed:', error);
    return null; // Graceful degradation
  }
}

/**
 * Generate title from link URL
 */
export async function generateTitleFromLink(url: string): Promise<string | null> {
  if (!genAI) {
    return null; // Graceful degradation
  }

  if (!checkRateLimit()) {
    throw new Error('Rate limit exceeded. Please try again in a minute.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `Based on this URL: ${url}
    Generate a concise, descriptive title (max 60 characters) for a UI component inspiration.
    Focus on what component or pattern the link likely contains.
    Return only the title, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    return text.length > 60 ? text.substring(0, 60) : text;
  } catch (error) {
    console.error('AI link title generation failed:', error);
    return null; // Graceful degradation
  }
}

/**
 * Check if AI generation is available
 */
export function isAIGenerationAvailable(): boolean {
  return !!genAI;
}
