import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"; // Ensure this is correctly imported

const apiKey = "AIzaSyBAK4pRwhzQ8FGvtJmIQ5sMbTy8RlHrrgw"; // Directly using the API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
});

const generationConfig = {
    temperature: 0.9,
    topP: 1,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    }
];

async function runChat(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });

    try {
        const result = await chatSession.sendMessage(prompt);
        const responseText = await result.response.text();
        console.log(responseText);
        return responseText;
    } catch (error) {
        console.error("Error in runChat function:", error);
        throw error;
    }
}

export default runChat;
