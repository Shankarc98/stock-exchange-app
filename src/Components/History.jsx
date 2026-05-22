import {React, useState, useEffect} from "react";
import Transaction from "./Transaction";
import { useLocation } from "react-router-dom";

function History(props){
    
    const {state} = useLocation(); 
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchPlayer = async () => {
            let response = await fetch(`https://stock-backend-k87i.onrender.com/player/${state.player.name}/name`)

            let data = await response.json(); 

            setHistory(data.transactions); 
        }
        fetchPlayer(); 
    }, [])
    async function deleteHistory(id){
        let response = await fetch(`https://stock-backend-k87i.onrender.com/${state.player.id}/deleteTransaction/${id}`, {
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
        <div className="history-header main-color">
            <h1>Transaction History</h1>
        </div>
        
        <div className="table-cont">
        <div className="history-top-row hist-row">
            <p className="transactionType">Trade</p>
            <p className="transactionName">Company</p>
            <p className="transactionShares">Shares Traded</p>
            <p className="transactionPrice">Share Price at Transaction</p>
            <p className="transactionMoney">Total money</p>            
        </div>

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