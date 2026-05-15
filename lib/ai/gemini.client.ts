import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export class GeminiClient {
  private model: any;

  constructor(modelName: string = "gemini-1.5-pro") {
    this.model = genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      }
    });
  }

  async generateJSON(prompt: string, systemPrompt: string) {
    try {
      const result = await this.model.generateContent({
        contents: [
          { role: "user", parts: [{ text: systemPrompt + "\n\nUser Query: " + prompt }] }
        ],
      });
      const response = await result.response;
      const text = response.text();
      
      try {
        // Clean the response in case it has markdown blocks
        const cleaned = text.replace(/```json\n?|```/g, "").trim();
        return JSON.parse(cleaned);
      } catch (e) {
        console.error("Gemini JSON Parse Error. Raw Text:", text);
        return { 
          text: text, 
          type: "text",
          severity: "info"
        };
      }
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw error;
    }
  }

  async generateText(prompt: string, systemPrompt: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent({
        contents: [
          { role: "user", parts: [{ text: systemPrompt + "\n\nUser Query: " + prompt }] }
        ],
      });
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Text Error:", error);
      throw error;
    }
  }
}

export const gemini = new GeminiClient();
