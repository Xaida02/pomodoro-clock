import React from 'react';
import { useState, useEffect } from "react";
import "./styles.css";

// audio "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"




const App = () => {

    const breakInitialState = 5;
    const sessionInitialState = 25;
    // let secondInitialState = 60;

    const [breakLength, setBreakLength] = useState(breakInitialState);
    const [sessionLength, setSessionLength] = useState(sessionInitialState);
    const [clockSecond, setClockSecond] = useState(60);
    const [timerBool, setTimerBool] = useState(false);
    


   const handleLength = (e) => {
        if(e.target.className === "fas fa-arrow-down arrow") {
            if(breakLength !== 1) {
                setBreakLength(breakLength - 1)
            }
        }
        else {
            if(breakLength !== 59) {
            setBreakLength(breakLength + 1)
            }
        }
   }

   const handleSession = (e) => {
        if(e.target.className === "fas fa-arrow-down arrow") {
            if(sessionLength !== 1) {
                setSessionLength(sessionLength - 1)
            }
        }
        else {
            if(sessionLength !== 59) {
                setSessionLength(sessionLength + 1)
                }
        }
   }


   
//    const startTimer = () => {
//     if(clockSecond !== 0 && !timerBool) {
//         setTimeout(() => {
//             setClockSecond(clockSecond - 1);
//             console.log("The count is: ", clockSecond);
//             startTimer()
//             }, 1000)
//     } 
//     else {
//         console.log("The clock couldn't continue.")
//     }  
//    }

   const togglePause = () => {
       setTimerBool(!timerBool);
       console.log(timerBool);
       startTimer();
   }

   const redoClock = () => {
        setBreakLength(breakInitialState);
        setSessionLength(sessionInitialState);
   }

   const handleSeconds = () => {
       if(clockSecond === 60) {
           return "00"
       }
       else {
           return `${clockSecond}`
       }
   }

   useEffect(() => {
    
   }, [clockSecond])


  return (
        <div>
            <div className="main-container">
                <div id="break-label"> 
                    <h2>Break Length</h2>
                    <h2 id="break-length">{breakLength}</h2>
                    <i onClick={handleLength} id="break-decrement" className="fas fa-arrow-down arrow"></i>
                    <i onClick={handleLength} id="break-increment" className="fas fa-arrow-up arrow"></i>
                </div>
                <div id="session-label">
                    <h2>Session Length</h2>
                    <h2 id="session-length">{sessionLength}</h2>
                    <i onClick={handleSession} id="session-decrement" className="fas fa-arrow-down arrow"></i>
                    <i onClick={handleSession} id="session-increment" className="fas fa-arrow-up arrow"></i>
                </div>
            </div>
            <div id="timer-label" className='display'>
                <h2>Session</h2>
                <h1 id="time-left">{sessionLength}:{clockSecond}</h1>
            </div>
            <div className="clock-btns">
                <i onClick={togglePause} id="start_stop" className='fa fa-play clock-btn'></i>
                {/* <i onClick={togglePause} className='fa fa-pause clock-btn'></i> */}
                <i onClick={redoClock} id="reset" className='fa fa-undo clock-btn'></i>
                <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep"/>
            </div>
        </div>
    )
}

export default App;


