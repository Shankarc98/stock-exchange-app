import {React, useState, useEffect} from "react";
import Transaction from "./Transaction";
import { useNavigate, useLocation } from "react-router-dom";
import apiFetch from "../utils/helper";
import Header from "./Header";

function History(){
    const navigate = useNavigate();
    const {state} = useLocation(); 
    const [history, setHistory] = useState([]);
    const player = state.player;

    useEffect(() => {
        
        const fetchPlayer = async () => {
            let response = await apiFetch(`/player/${state.player.name}/name`)

            let data = await response.json(); 

            setHistory(data.transactions); 
        }
        fetchPlayer(); 
    }, [])
    async function deleteHistory(id){
        let response = await apiFetch(`/${state.player.id}/deleteTransaction/${id}`, {
            method: "PATCH",                       
        });

        if(response.ok){
            setHistory(prev => {
                return prev.filter(p => {
                    return p.id !== id;
                })
            })
        }
        
    }
    return <div className="history-cont">
        
        <Header money = {state.player.money}/>

        <div className="transaction-page-navigation">
            <button className = "navi-btn"onClick={() => navigate("/home", {
                state : {player}
            })} type="button">Home</button>
            <button className = "navi-btn" onClick = {() => navigate("/")} type="button">Logout</button>
        </div>
        <div className="history-header">
            <h3>Transaction History</h3>
        </div>
        
    <div className="table-cont">
            
       { history.map(h => {
          return <Transaction 
                key = {h.id}
                id = {h.id}
                type={h.trade} 
                compName={h.company}
                sharesTraded={h.sharesTraded}
                atPrice={h.price.toFixed(2)}
                money={h.totalMoney.toFixed(2)}
                deleteHistory={deleteHistory}
                />
        })}

        </div>
        
    </div>
}

export default History;