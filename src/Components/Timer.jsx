import {React, useState, useEffect} from "react"; 

function Timer(props){       

    const [seconds, setSeconds] = useState(() => {
        const savedSeconds = localStorage.getItem("seconds"); 

        if(savedSeconds) return Number(JSON.parse(savedSeconds)); 
        else return props.seconds; 
    })
    useEffect(() => {
        localStorage.setItem("seconds", JSON.stringify(seconds))
    }, [seconds])
          
    const minutes = Math.floor(seconds / 60); 
    const sec = seconds % 60; 

    return <p className="clock sec-color" >Next update in: {minutes}:{sec < 10 ? 0 : ""}{sec}</p>
}

export default Timer; 