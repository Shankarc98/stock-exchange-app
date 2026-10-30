import {useState, useEffect} from "react";
import Transaction from "./Transaction";
import { useNavigate, useLocation } from "react-router-dom";
import apiFetch from "../utils/helper";
import Header from "./Header";
import {clearAuthToken, isSessionControlError} from "../utils/session";

function History(){
    const navigate = useNavigate();
    const {state} = useLocation(); 
    const [history, setHistory] = useState([]);
    const player = state.player;

    useEffect(() => {
        
        const fetchPlayer = async () => {
            try {
                let response = await apiFetch(`/player/${state.player.name}/name`)

                let data = await response.json();

                setHistory(data.transactions);
            } catch (error) {
                if (!isSessionControlError(error)) throw error;
            }
        }
        fetchPlayer(); 
    }, [state.player.name])
    async function deleteHistory(id){
        try {
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
        } catch (error) {
            if (!isSessionControlError(error)) throw error;
        }
    }

    function logOut(){
        clearAuthToken();
        navigate("/");
    }
    return <div className="history-cont">
        
        <Header money = {state.player.money}/>

        <div className="transaction-page-navigation">
            <button className = "navi-btn"onClick={() => navigate("/home", {
                state : {player}
            })} type="button">Home</button>
            <button className = "navi-btn" onClick={logOut} type="button">Logout</button>
        </div>
        <div className="history-header">
            <h3>Transaction History</h3>
        </div>
        
    <div className="table-cont">
       {history.length === 0 && <p className="empty-state">No transactions yet.</p>}
            
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