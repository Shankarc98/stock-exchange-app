import {React, useState} from "react"; 
import { useNavigate } from "react-router-dom";

function Login(){   
    
    const navigate = useNavigate(); 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 

    const url = import.meta.env.VITE_API_URL;

    function handleUsername(event){
        setUsername(event.target.value); 
    }
    function handlePassword(event){
        setPassword(event.target.value);
    }

    async function loggedIn(event){
        event.preventDefault(); 

        try{

            const response = await fetch(`${url}/player/${username}/name`);
            const player = await response.json(); 

            if(response.ok && player.password == password){ 
                
                navigate("/home", {
                    state: {
                        player
                    }
                })
            }
            else {
                console.log(response);
                alert("invalid username or password");
            }
        }
        catch(error){
            console.log(error); 
        }
        
    }

    return <div className = "login-page credential-page">
            
            <div className="brand-header">
                <img className="stock-logo" src="/images/stock.svg" alt="stock market logo"/>
                <h1 className="brand">Stock Market Simulation</h1>
            </div>

        <div className="login-cont">
            <div className="login-title credential-main-title">Login</div>
            <form className="form" onSubmit={loggedIn}>
                <div className="username-container credential-container">
                    <p className="credential-title">Username</p>
                    <input className="username-input credential-input" onChange={handleUsername} value={username} type="text" size="15"/>
                </div>
                
                <div className="password-container credential-container">
                    <p className="credential-title">Password</p>
                    <input className="password-input credential-input" onChange={handlePassword} value={password} type="password" size="15"/>
                </div>                

                <div className="access-buttons">
                    <button className="signup-button further-button" onClick={() => {navigate("/signup")}}>Sign Up</button>
                    <button className="login-button further-button" onClick={loggedIn}>Login</button>
                </div>
                
            </form>
        </div>
    </div>
}

export default Login;  