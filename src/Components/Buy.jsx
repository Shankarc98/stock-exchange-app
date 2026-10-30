import {useState} from "react";
import {calculateTradeAmount, formatCurrency} from "../utils/currency";

function Buy(props){                    

    const [count, setCount] = useState(0);

    const company = props.selectedCompany ?? {};
    const quantity = Number(count);
    const validQuantity = Number.isInteger(quantity) && quantity > 0;
    const amount = calculateTradeAmount(company.price, quantity);
    const availableShares = props.availableShares ?? props.stocksHeld?.numOfStocks ?? 0;
    const insufficientFunds = validQuantity && amount > props.walletBalance;
    const insufficientShares = validQuantity && quantity > availableShares;

    function handleChange(event){
      const value = event.target.value;
      setCount(value === "" ? "" : Number(value));
    }

    async function submitTrade(action){
      if (!validQuantity){
        props.onValidationError("Enter a whole number of shares greater than zero.");
        return;
      }

      if (action === 1 && amount > props.walletBalance){
        props.onValidationError(
          `Insufficient balance. You need ${formatCurrency(amount)}, but your available balance is ${formatCurrency(props.walletBalance)}.`
        );
        return;
      }

      if (action === 1 && quantity > company.stocks){
        props.onValidationError(`Only ${company.stocks} shares are currently available to buy.`);
        return;
      }

      if (action === 2 && quantity > availableShares){
        props.onValidationError(`You do not have enough shares to sell. Available quantity: ${availableShares}.`);
        return;
      }

      const succeeded = await props.handle(action, company.id, quantity);
      if (succeeded) setCount(0);
    }

      return <div>
        <div className="buy-cont trade-cont" role="dialog" aria-modal="true" aria-labelledby="buy-dialog-title" style={{display : props.trade == 1 ? "flex" : "none"}}>
        
        <div className="head">
            <p className="title" id="buy-dialog-title">Buy Shares</p>
            <button onClick={props.close} className="close" aria-label="Close buy dialog" type="button">✖</button>
        </div>
        
        <p className="tradeName">{company.name}</p>
        <p className="totalShares">Total Shares in the company: {company.stocks}</p>
        <p className="yourShares">Available to sell: {availableShares}</p>
            
        <label className="sr-only" htmlFor="buy-shares-count">Number of shares to buy</label>
        <input id="buy-shares-count" type="number" min="1" max="300000" step="1" onChange={handleChange} className="numShares" value={count} aria-invalid={insufficientFunds}/>
        <p className={`trade-preview${insufficientFunds ? " trade-warning" : ""}`}>
          Total amount to pay: <strong>{formatCurrency(amount)}</strong>
          {insufficientFunds && <span>Insufficient balance.</span>}
        </p>
            
        <button onClick={() => submitTrade(1)} className="trade-btn" type="button">Buy</button>
    </div>

    <div className="sell-cont trade-cont" role="dialog" aria-modal="true" aria-labelledby="sell-dialog-title" style={{display : props.trade == 2 ? "flex" : "none"}}>
        <div className="head">
            <p className="title" id="sell-dialog-title">Sell Shares</p>
            <button onClick={props.close} className="close" aria-label="Close sell dialog" type="button">x</button>
        </div>
        
        <p className="tradeName">{company.name}</p>
        <p className="totalShares">Total Shares in the company: {company.stocks}</p>
        <p className="yourShares">Available to sell: {availableShares}</p>
            
        <label className="sr-only" htmlFor="sell-shares-count">Number of shares to sell</label>
        <input id="sell-shares-count" type="number" min="1" max="300000" step="1" onChange={handleChange} className="numShares" value={count} aria-invalid={insufficientShares}/>
        <p className={`trade-preview${insufficientShares ? " trade-warning" : ""}`}>
          Expected amount to receive: <strong>{formatCurrency(amount)}</strong>
          {insufficientShares && <span>Not enough shares to sell.</span>}
        </p>
            
        <button onClick={() => submitTrade(2)} className="trade-btn main-color" type="button">Sell</button>
    </div>

    </div>
}

export default Buy;