import { createContext, useState } from "react";
import runChat from "../config/Gemini.js";

// Create and export the context
export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [responses, setResponses] = useState({});

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };
    const newChat=() =>{
        setLoading(false)
        setShowResult(false)
    }

    const displayResponse = (response) => {
        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
    };

    // Function to call the runChat function with a prompt
    const onSet = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        // Check if we already have a response for this prompt
        if (responses[prompt]) {
            displayResponse(responses[prompt]);
            setLoading(false);
            return;
        }

        const response = await runChat(prompt);
        setRecentPrompt(prompt);
        setPrevPrompts(prev => [...new Set([...prev, prompt])]);
        setResponses(prev => ({ ...prev, [prompt]: response }));

        displayResponse(response);
        setLoading(false);
        setInput(""); // Clear the input after processing
    };

    // Define the context value you want to provide to the consumers
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSet,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
