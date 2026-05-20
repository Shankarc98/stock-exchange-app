import {useState} from "react"; 

function Transaction(props){
    
    const [focus, setFocus] = useState(false); 

    return <div key={props.id} className="history-record hist-row" onMouseEnter={() => {setFocus(true)}} onMouseLeave={() => setFocus(false)}>
         <p className="transactionType transactionRec">{props.type}</p>
         <p className="transactionName transactionRec">{props.compName}</p>
         <p className="transactionShares transactionRec">{props.sharesTraded}</p>
         <p className="transactionPrice transactionRec">{props.atPrice}</p>
         <p className="transactionMoney transactionRec">{props.money}</p>
         <button className="del-transaction" onClick={() => props.deleteHistory(props.id)} style={{display : focus ? "block" : "none"}}>🗑</button>
</div>
}

export default Transaction;