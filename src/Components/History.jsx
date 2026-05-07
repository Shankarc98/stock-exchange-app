import React from "react";
import Transaction from "./Transaction";

function History(props){
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

       { props.history.map(h => {
          return <Transaction 
                key = {h.id}
                id = {h.id}
                type={h.type} 
                compName={h.compName}
                sharesTraded={h.sharesTraded}
                atPrice={h.atPrice}
                money={h.money}
                deleteTransaction={props.deleteTransaction}
                />
        })}
        </div>
        
    </div>
}

export default History;