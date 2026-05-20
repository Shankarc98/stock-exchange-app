import {React, useState} from "react"; 
import {useNavigate} from "react-router-dom"; 

function Signup(){

    const navigate = useNavigate(); 
    let [usernameInp, setUnameInp] = useState(""); 
    let [pwdInp, setPwdInp] = useState("");
    let [confirmPwd, setConfirmPwd] = useState(""); 

    async function handleSignup(event){

        event.preventDefault(); 
        let exists = false;
        console.log("signed up"); 
        if(usernameInp.length < 5){
            alert("username should have atleast 5 characters"); 
            return
        }
        if(pwdInp !== confirmPwd){
            alert("passwords dont match");
            return
        }

        try{
            const check = await fetch("https://stock-backend-server.onrender.com/player", {
                method: "GET"
            })
    
            if(!check.ok){
                throw new Error("request failed");
            }
            
            const players = await check.json();
        
            players.map(p => {
                if(p.name === usernameInp) {                
                    alert("username already exists");   
                    exists = true;                             
                }
            })
        }
        catch(error){
            console.log(error);
        }
               
                
        if(!exists){
            const response = await fetch("https://stock-backend-server.onrender.com/player", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: usernameInp,
                    password: pwdInp,
                })
            })
            const player = await response.json(); 

            console.log(player); 

            if(!response.ok){
                throw new Error("failed to create player");
            }

            navigate("/home", {
                state: {
                    player
                }
            })
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
                <img className="stock-logo" src="/images/stock.svg" alt="stock market logo"/>
                <h1 className="brand">Stock Market Simulation</h1>
            </div>
            

            <div className="signup-cont">
                <div className="signup-title credential-main-title">Sign Up</div>
                <form className="signup-form form" onSubmit={handleSignup}>
                    <div className="username-container credential-container">
                        <p className="credential-title">Username</p>
                        <input className="username-input credential-input" onChange={handleUsername} value={usernameInp} type="text" size="15"/>
                    </div>
                    
                    <div className="password-container credential-container">
                        <p className="credential-title">Password</p>
                        <input className="password-input credential-input" onChange={handlePassword} type="password" size="15"/>
                    </div>
                    
                    <div className="confirm-password-container credential-container">
                        <p className="credential-title">Confirm Password</p>
                        <input className="confirm-password-input credential-input" onChange={handleConfirmPassword} type="password" size="15"/>
                    </div>
    
                    <div className="access-buttons">
                        <button className="signup-button further-button" >Sign Up</button>
                    </div>
                    
                </form>
            </div>

            <button className="back-to-login further-button" onClick={() => navigate("/")}>Back to Login</button>
        </div>        
}

export default Signup; 