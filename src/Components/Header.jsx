
import {formatCurrency} from "../utils/currency";

export default function Header(props){
    
    return <div className="header">
        <div className="logo-brand">
          <img className="stock-logo" src="/images/stocklogo.png" alt="stock market logo"/>          
        </div>
        <div className="financial-summary">
          {props.netWorth !== undefined && (
            <div className="net-worth">
              <span>Net Worth</span>
              <strong>{formatCurrency(props.netWorth)}</strong>
            </div>
          )}
          <div className="wallet">
            <img src="/images/wallet.svg" className="wallet-logo" alt=""/>
            <span className="wallet-label">Wallet</span>
            <strong>{formatCurrency(props.money)}</strong>
          </div>
        </div>
      
    </div>
}