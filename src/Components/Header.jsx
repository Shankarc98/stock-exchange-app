import { useEffect } from "react"

export default function Header(props){
    
    useEffect(() => {console.log("props.money in header", props.money)}, [props.money])
    return <div className="header">
        <div className="logo-brand">
          <img className="stock-logo" src="/images/stock.svg" alt="stock market logo"/>          
          <h1 className="brand">Stock Market Simulation</h1>           
        </div>
        
        <h2 className="wallet">Your Wallet = ₹ {Number(props.money.toFixed(2))}</h2>
      
    </div>
}