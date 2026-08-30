
export default function Header(props){
    
    return <div className="header">
        <div className="logo-brand">
          <img className="stock-logo" src="/images/stocklogo.png" alt="stock market logo"/>          
        </div>
        
        <h2 className="wallet"> <img src = "/images/wallet.svg" className = "wallet-logo" alt = "wallet logo"/> ₹ {Number(props.money.toFixed(2))}</h2>
      
    </div>
}