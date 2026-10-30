import {useState} from "react";

function Buy(props){                    

    const [count, setCount] = useState(0);
    
    function handleChange(event){
        
        let val = Number(event.target.value)

        if(val < 0) val = 1

        if(val > 300000) val = 300000

        setCount(val);
    }

    return <div>
        <div className="buy-cont trade-cont" role="dialog" aria-modal="true" aria-labelledby="buy-dialog-title" style={{display : props.trade == 1 ? "flex" : "none"}}>
        
        <div className="head">
            <p className="title" id="buy-dialog-title">Buy Shares</p>
            <button onClick={props.close} className="close" aria-label="Close buy dialog" type="button">✖</button>
        </div>
        
        <p className="tradeName">{props.selectedCompany.name}</p>
        <p className="totalShares">Total Shares in the company: {props.selectedCompany.stocks}</p>
        <p className="yourShares">Your shares in the company: {props.stocksHeld?.numOfStocks}</p>
            
        <label className="sr-only" htmlFor="buy-shares-count">Number of shares to buy</label>
        <input id="buy-shares-count" type="number" min="1" max="300000" onChange={(event) => handleChange(event)} className="numShares" value={count}/>
            
        <button onClick={() => {props.handle(1, props.selectedCompany.id, count); setCount(0)}} className="trade-btn" type="button">Buy</button>
    </div>

    <div className="sell-cont trade-cont" role="dialog" aria-modal="true" aria-labelledby="sell-dialog-title" style={{display : props.trade == 2 ? "flex" : "none"}}>
        <div className="head">
            <p className="title" id="sell-dialog-title">Sell Shares</p>
            <button onClick={props.close} className="close" aria-label="Close sell dialog" type="button">x</button>
        </div>
        
        <p className="tradeName">{props.selectedCompany.name}</p>
        <p className="totalShares">Total Shares in the company: {props.selectedCompany.stocks}</p>
        <p className="yourShares">Your shares in the company: {props.stocksHeld?.numOfStocks}</p>
            
        <label className="sr-only" htmlFor="sell-shares-count">Number of shares to sell</label>
        <input id="sell-shares-count" type="number" min="1" max="300000" onChange={(event) => handleChange(event)} className="numShares" value={count}/>
            
        <button onClick={() => {props.handle(2, props.selectedCompany.id, count); setCount(0)}} className="trade-btn main-color" type="button">Sell</button>
    </div>

    </div>
}

export default Buy;