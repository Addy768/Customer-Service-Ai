import { createContext, useState, useEffect } from "react";
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

    // Function to call the runChat function with a prompt
    const onSet = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input)

        const response = await runChat(prompt); // Use the prompt passed in
        setResultData(response);
        setLoading(false);
        setInput(""); // Clear the input after processing
    };

    useEffect(() => {
        onSet("What is react js");
    }, []); // Only run on initial mount

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
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
