import {useState} from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../utils/helper";
import {getApiErrorMessage, getRequestFailureMessage} from "../utils/apiErrors";
import Popup from "./Popup";

function Login(){   
    
    const navigate = useNavigate(); 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [popup, setPopup] = useState(false);
    const [popMessage, setPopMessage] = useState("");

    function handleUsername(event){
        setUsername(event.target.value); 
    }
    function handlePassword(event){
        setPassword(event.target.value);
    }

    async function loggedIn(event){
        event.preventDefault(); 

        try {
            const response = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            });
        
            if (!response.ok) {
                setPopMessage(await getApiErrorMessage(response, "login"));
                setPopup(true);
                return;
            }
        
            const body = await response.json();
            const player = body.player;
            const token = body.token;
        
            localStorage.setItem("token", token);
        
            navigate("/home", {
                state: {
                    player
                }
            });
        }
        catch (error) {
            setPopup(true);
            setPopMessage(getRequestFailureMessage(error));
        }
        
    }

    return <div className = "login-page credential-page">
            
            <div className="brand-header">
                <img className="stock-logo" src="/images/stocklogo.png" alt="stock market logo"/>
            </div>

        <div className="login-cont">
            <div className="login-title credential-main-title">Login</div>
            <form className="form" onSubmit={loggedIn}>
                <div className="username-container credential-container">
                    <p className="credential-title">Username</p>
                    <input className="username-input credential-input" onChange={handleUsername} value={username} placeholder = "Enter username"type="text" size="15"/>
                </div>
                
                <div className="password-container credential-container">
                    <p className="credential-title">Password</p>
                    <input className="password-input credential-input" onChange={handlePassword} value={password} type="password" size="15" placeholder="Enter password"/>
                </div>                

                <div className="access-buttons">
                    <button className="signup-button further-button" onClick={() => {navigate("/signup")}} type="button">Sign Up</button>
                    <button className="login-button further-button" type="submit">Login</button>
                </div>
                
            </form>
        </div>

        <Popup 
            popup = {popup}
            message = {popMessage}
            setPopup = {setPopup}
        />
    </div>
}

export default Login;  