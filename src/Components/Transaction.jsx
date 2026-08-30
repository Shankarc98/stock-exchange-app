import {useState} from "react"; 

function Transaction(props){
    
    const [focus, setFocus] = useState(false); 

   
    return <div style = {{backgroundColor : focus ? "aliceblue" : "white"}} key={props.id} className="history-record hist-row" onMouseEnter={() => {setFocus(true)}} onMouseLeave={() => setFocus(false)}>
         <div className = "transaction-part-one">
            <p className="transactionName transactionRec">{props.compName}</p>
            <div className = "transaction-part-one-a">
                <p className="transactionType transactionRec">{props.type}</p>        
                <p className="transactionShares transactionRec">{props.sharesTraded + " shares"}</p>
                <p className="transactionPrice transactionRec">{"@ ₹"+props.atPrice}</p>
            </div>
            
         </div>
         
         <div className = "transaction-part-two">
             <p className="transactionMoney transactionRec">{"₹"+props.money}</p>
             <p className = "transaction-time"></p>
         </div>
         
         <button className="del-transaction" onClick={() => props.deleteHistory(props.id)}  type="button">x</button>
    </div>
}

export default Transaction;