const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAI2OAMTkojHjaWErwRrcIZcwAXU16qrXQ");

async function listModels() {
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-pro" });
    // This is a trick to see if we can even initialize. 
    // But better yet, use the listModels method if available in this SDK version.
    console.log("Checking model initialization...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log("Model initialized. Trying a simple prompt...");
    const result = await model.generateContent("Hello");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("Error Detail:", error.message);
    if (error.stack) console.log("Stack Trace:", error.stack);
  }
}

listModels();
