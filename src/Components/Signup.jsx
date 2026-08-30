import {React, useState} from "react"; 
import {useNavigate} from "react-router-dom"; 
import apiFetch from "../utils/helper";
import Popup from "./Popup";

function Signup(){

    const navigate = useNavigate(); 
    const [popup, setPopup] = useState(false);
    const [popMessage, setPopMessage] = useState("");
    let [usernameInp, setUnameInp] = useState(""); 
    let [pwdInp, setPwdInp] = useState("");
    let [confirmPwd, setConfirmPwd] = useState(""); 

    async function handleSignup(event){

        event.preventDefault(); 

        if(usernameInp.length < 5){
            alert("username should have atleast 5 characters"); 
            return
        }
        if(pwdInp !== confirmPwd){
            alert("passwords dont match");
            return
        }

        try{
            const check = await apiFetch(`/auth/signup`, {
                method: "POST",
                
                body: JSON.stringify({
                    name: usernameInp,
                    password: pwdInp
                })  
            })
    
            if(!check.ok){
                throw new Error("request failed");

            }
            else{
                
                navigate("/");                
            }
                                
        }
        catch(error){
            setPopup(true);
            setPopMessage("Server is down. Please try again later");
            console.log(error);
        }
                                                                          
    }

    function handleUsername(event){
        setUnameInp(event.target.value);
    }
    function handlePassword(event){
        setPwdInp(event.target.value)
    }
    function handleConfirmPassword(event){
        setConfirmPwd(event.target.value)
    }

        return <div className = "signup-page credential-page">
            
            <div className="brand-header">
                <img className="stock-logo" src="/images/stocklogo.png" alt="stock market logo"/>
            </div>
            

            <div className="signup-cont">
                <div className="signup-title credential-main-title">Sign Up</div>
                <form className="signup-form form" onSubmit={handleSignup}>
                    <div className="username-container credential-container">
                        <p className="credential-title">Username</p>
                        <input className="username-input credential-input" onChange={handleUsername} value={usernameInp} type="text" size="15" placeholder="Enter username" required/>
                    </div>
                    
                    <div className="password-container credential-container">
                        <p className="credential-title">Password</p>
                        <input className="password-input credential-input" onChange={handlePassword} type="password" size="15" placeholder="Enter password" required/>
                    </div>
                    
                    <div className="confirm-password-container credential-container">
                        <p className="credential-title">Confirm Password</p>
                        <input className="confirm-password-input credential-input" onChange={handleConfirmPassword} type="password" size="15" placeholder="Enter password again" required/>
                    </div>
    
                    <div className="access-buttons">
                        <button className="signup-button further-button" type="submit">Sign Up</button>
                    </div>
                    
                </form>
            </div>

            <button className="back-to-login" onClick={() => navigate("/")} type="button">Back to Login</button>

            <Popup 
                popup = {popup}
                message = {popMessage}
                setPopup = {setPopup}
            />
        </div>        
}

export default Signup; 