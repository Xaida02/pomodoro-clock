import React from 'react';
import { useState, useEffect } from "react";
import "./styles.css";

// audio "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"



const App = () => {

    const breakInitialState = 5;
    const sessionInitialState = 25;
    const timeLeftInitialState = 1500;

    const [breakLength, setBreakLength] = useState(breakInitialState);
    const [sessionLength, setSessionLength] = useState(sessionInitialState);
    const [timeLeft, setTimeLeft] = useState(timeLeftInitialState);
    const [sessionType, setSessionType] = useState("SESSION");
    const [start, setStart] = useState(false);
    const audio = document.getElementById("beep");


    

    const timeOut = setTimeout(() => {
        if(timeLeft && start === true) {
            setTimeLeft((time) => time -1 )
        }
   }, 1000)

    const timeDisplay = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft - minutes * 60;
        const formattedMinutes =  minutes < 10 ?  `0${minutes}` : minutes;
        const formattedSeconds =  seconds < 10 ?  `0${seconds}` : seconds;
        let product = `${formattedMinutes}:${formattedSeconds}`;
        return product;
    }


   const handleLength = (e) => {
        if(e.target.className === "fas fa-arrow-down arrow") {
            if(breakLength > 1) {
                setBreakLength(breakLength - 1)
            }
        }
        else {
            if(breakLength < 60) {
            setBreakLength(breakLength + 1)
            }
        }
   }

   const handleSession = (e) => {
        if(e.target.className === "fas fa-arrow-down arrow") {
            if(sessionLength > 1) {
                setSessionLength(sessionLength - 1)
                setTimeLeft((time) => time - 60);
            }
        }
        else {
            if(sessionLength < 60) {
                setSessionLength(sessionLength + 1)
                setTimeLeft((time) => time + 60);
                }
        }
   }

   const changeTimer = () => {
       if(!timeLeft && sessionType === "SESSION") {
           setTimeLeft(breakLength * 60);
           setSessionType("BREAK");
           audio.play()
       }
       else if (!timeLeft && sessionType === "BREAK") {
           setTimeLeft(sessionLength * 60);
           setSessionType("SESSION");
           audio.pause();
           audio.currentTime = 0;
       }
   };

   const clock = () => {
       if(start){
           timeOut()
           changeTimer()
       }
       else {
           clearTimeout(timeOut)
       }
   }



   const togglePause = () => {
        clearTimeout(timeOut)
        setStart(!start)
   }

   const redoClock = () => {
        clearTimeout(timeOut)
        setStart(false);
        setBreakLength(breakInitialState);
        setSessionLength(sessionInitialState);
        setTimeLeft(timeLeftInitialState);
        setSessionType("SESSION");
        audio.pause()
        audio.currentTime = 0;
   }

   useEffect(() => {
    changeTimer()
   }, [start, timeLeft, timeOut])


  return (
        <div>
            <div className="main-container">
                <h1 id="twitter"><a href="https://twitter.com/xaida02" target="_blank">Twitter: xaida02</a></h1>
                <div id="break-label">
                    <h2>Break Length</h2>
                    <h2 id="break-length">{breakLength}</h2>
                    <i disabled={start} onClick={handleLength} id="break-decrement" className="fas fa-arrow-down arrow"></i>
                    <i disabled={start} onClick={handleLength} id="break-increment" className="fas fa-arrow-up arrow"></i>
                </div>
                <div id="session-label">
                    <h2>Session Length</h2>
                    <h2 id="session-length">{sessionLength}</h2>
                    <i disabled={start} onClick={handleSession} id="session-decrement" className="fas fa-arrow-down arrow"></i>
                    <i disabled={start} onClick={handleSession} id="session-increment" className="fas fa-arrow-up arrow"></i>
                </div>
            </div>
            <div id="timer-label" className='display'>
                <h2>{sessionType}</h2>
                <h1 id="time-left">{timeDisplay()}</h1>
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


