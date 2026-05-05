import {React, useState, useEffect} from "react"; 

function Timer(){       

    const [seconds, setSeconds] = useState(() => {
        const savedSeconds = localStorage.getItem("seconds"); 

        if(savedSeconds) return Number(JSON.parse(savedSeconds)); 
        else return 600; 
    })
    useEffect(() => {
        localStorage.setItem("seconds", JSON.stringify(seconds))
    }, [seconds])

    useEffect(() => {        
        const timer = setInterval(() => {
            setSeconds(prev => {
                if(prev <= 0){
                    return 600; 
                }
                return prev - 1;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [])

    const minutes = Math.floor(seconds / 60); 
    const sec = seconds % 60; 

    return <p className="clock sec-color">Next update in: {minutes}:{sec < 10 ? 0 : ""}{sec}</p>
}

export default Timer; 