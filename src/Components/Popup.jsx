import {useState} from "react";

export default function Popup(props){

    const [popup, setPopup] = useState(props.popup);

    function handleClick(){
        props.setPopup(false);
        console.log("clicked close");
    }

    return <div className = "popup" style = {{display : props.popup ? "flex" : "none"}}>
        <button className = "close" onClick = {handleClick} type="button">x</button>
        <p className = "popup-message">{props.message}</p>
    </div>
}