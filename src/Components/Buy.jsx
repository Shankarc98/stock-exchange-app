import {React, useEffect, useState} from "react";

function Buy(props){                    

    const [count, setCount] = useState(0);
    function handleChange(event){
        
        let val = Number(event.target.value)

        if(val < 0) val = 1

        if(val > 300000) val = 300000

        setCount(val);
    }

    return <div>
        <div className="buy-cont trade-cont sec-color" style={{display : props.trade == 1 ? "flex" : "none" }}>
        
        <div className="head">
            <p className="title">Buy Shares</p>
            <button onClick={props.close} className="close">✖</button>
        </div>
        
        <p className="tradeName">{props.selectedCompany.name}</p>
        <p className="totalShares">Total Shares in the company: {props.selectedCompany.stocks}</p>
        <p className="yourShares">Your shares in the company: {props.stocksHeld?.numOfStocks}</p>
            
        <input type="number" onChange={(event) => handleChange(event)} className="numShares" size="3" value={count}></input>
            
        <button onClick={() => {props.handle(1, props.compId, count); setCount(0)}} className="trade-btn main-color" type="submit">Buy</button>
    </div>

    <div className="sell-cont trade-cont sec-color" style={{display : props.trade == 2 ? "flex" : "none"}}>
        <div className="head">
            <p className="title">Sell Shares</p>
            <button onClick={props.close} className="close" type="button">x</button>
        </div>
        
        <p className="tradeName">{props.selectedCompany.name}</p>
        <p className="totalShares">Total Shares in the company: {props.selectedCompany.stocks}</p>
        <p className="yourShares">Your shares in the company: {props.stocksHeld?.numOfStocks}</p>
            
        <input type="number" onChange={(event) => handleChange(event)} className="numShares" size="3" value={count}></input>
            
        <button onClick={() => {props.handle(2, props.compId, count); setCount(0)}} className="trade-btn main-color" type="submit">Sell</button>
    </div>

    </div>
}

export default Buy;