export default function Popup(props){

    function handleClick(){
        props.setPopup(false);
    }

    return <div className="popup" role="alertdialog" aria-modal="true" aria-label="Message" style={{display : props.popup ? "flex" : "none"}}>
        <button className="close" onClick={handleClick} aria-label="Close message" type="button">x</button>
        <p className = "popup-message">{props.message}</p>
    </div>
}