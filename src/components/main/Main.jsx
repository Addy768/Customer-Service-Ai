import React, { useContext } from 'react';
import './Main.css';
import { assets } from "../../assets/assets.js";
import { Context } from "../../Context/Context.jsx"; // Import the correct context

const Main = () => {
    const { onSet, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context); // Use the correct context

    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon"/>
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How Can I Help You Today</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest some beautiful places to visit on a road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon"/>
                            </div>
                            <div className="card">
                                <p>Summarize urban planning</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon"/>
                            </div>
                            <div className="card">
                                <p>Brainstorming activity to do with a group</p>
                                <img src={assets.message_icon} alt="Message Icon"/>
                            </div>
                            <div className="card">
                                <p>Improve the following code</p>
                                <img src={assets.code_icon} alt="Code Icon"/>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Icon"/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini Icon"/>

                            {loading
                                ?<div className='loader'>
                                    <hr/>
                                    <hr/>
                                    <hr/>
                                </div>
                            :<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }

                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder='Enter a prompt here'
                            value={input}
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon"/>
                            <img src={assets.mic_icon} alt="Mic Icon"/>
                            <img onClick={() => onSet(input)} src={assets.send_icon} alt="Send Icon"/>
                        </div>
                    </div>
                    <p className="bottom-info">
                        This AI chat box may display inaccurate information, so double check its responses. Your privacy
                        and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
