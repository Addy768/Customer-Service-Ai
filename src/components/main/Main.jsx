import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from "../../assets/assets.js";
import { Context } from "../../Context/Context.jsx";

const Main = () => {
    const { onSet, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    const gradients = [
        'linear-gradient(to right, #004e92, #000428)',
        'linear-gradient(to right, #FD746C, #2C3E50)',
        'linear-gradient(to right, #904e95, #e96443)',
        'linear-gradient(to right, rgb(101, 78, 163), rgb(234, 175, 200))'
    ];

    const [currentGradient, setCurrentGradient] = useState(0);

    const changeGradient = () => {
        setCurrentGradient((currentGradient + 1) % gradients.length);
    };

    return (
        <div className='main' style={{ background: gradients[currentGradient] }}>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
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
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="card">
                                <p>Summarize urban planning</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div className="card">
                                <p>Brainstorming activity to do with a group</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="card">
                                <p>Improve the following code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini Icon" />
                            {loading
                                ? <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
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
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            {input ? <img onClick={() => onSet(input)} src={assets.send_icon} alt="Send Icon" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        This AI chat box may display inaccurate information, so double check its responses. Your privacy
                        and Gemini Apps.
                    </p>
                </div>
            </div>
            {/* Sun Icon for changing gradient */}
            <i className="fa-regular fa-sun-bright sun-icon" onClick={changeGradient}></i>
        </div>
    );
};

export default Main;
