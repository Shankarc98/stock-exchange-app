import { useState, useEffect } from 'react'
import Card from "./Card"
import companies from '../assets/Data.jsx';
import Buy from './Buy';
import Timer from "./Timer";
import Portfolio from "./Portfolio"
import { useNavigate } from 'react-router-dom';

function Home(props){
  const navigate = useNavigate(); 

  //main array - all companies
  const [shares, setShares] = useState(() => {
  const savedShares = localStorage.getItem("shares"); 

    if(savedShares) 
      return JSON.parse(savedShares) 
    else 
      return companies
  });

  useEffect(() => {
    localStorage.setItem("shares", JSON.stringify(shares))
  }, [shares]);

  //wallet
  let [wallet, setWallet] = useState(() => {
    const savedWallet = localStorage.getItem("wallet"); 

    return savedWallet ? JSON.parse(savedWallet) :  {wal : 200000, curPrice : 0};
  })
  useEffect(() => {
    localStorage.setItem("wallet", JSON.stringify(wallet))
  }, [wallet])
  

  let [buyState, setBuyState] = useState(false);
  let [sellState, setSellState] = useState(false);
  
  let [trade, setTrade] = useState(0);  
  useEffect(() => {
    if(buyState)  setTrade(1);
    else if(sellState)  setTrade(2);
    else setTrade(0);
  }, [buyState, sellState])

  let [compId, setCompId] = useState(null);
  

  //buy and sell button in card clicked
  function handleClick(a, id, cp){
    
    a == 1 ? setBuyState(true) : setSellState(true)
    setCompId(id);
    setWallet(prev => { return {...prev, curPrice: cp}})
    console.log(wallet); 
  }
  
  useEffect(() => {
      const interval = setInterval(market, 600000)
      
      return () => clearInterval(interval); 
  }, [])
  
   
  //market logic
  function market(){    

    setShares(prev => {
      return prev.map(p => {
        let flucDirection = Number(Math.round(Math.random() * 1))
        let fluc = Number(Math.random() * 4.2)

        let newPrice = flucDirection === 0 ? (p.price - fluc) : p.price + fluc
        newPrice = Number(newPrice.toFixed(2));
        return {...p, price: Number(Math.max(3, newPrice)), change: Number(fluc.toFixed(2)), direction: flucDirection !== 0 }
      })
    })

    console.log(shares);
  }


  //Shares Held
  const [sharesHeld, setSharesHeld] = useState(() => {
          const savedShares = localStorage.getItem("sharesHeld");
  
          if(savedShares) 
              return JSON.parse(savedShares)
          else{
              return companies.map(c => {
                  return {
                      companyId: c.id,
                      companyName: c.name,
                      totalShares: 300000,
                      yourShares: 0
                  }
              })                               
          }
          
      })
      useEffect(() => {
          localStorage.setItem("sharesHeld", JSON.stringify(sharesHeld))
      }, [sharesHeld])

     //trading 
     function handleTrade(trade, id, stocks){
        if(trade == 1)
          handleBuy(id, stocks);        
        else
          handleSell(id, stocks);
      }
      function handleBuy(id, stocks){
        const i = sharesHeld.findIndex(s => s.companyId === id); 

        const share = sharesHeld[i].totalShares - stocks;
        const cost = wallet.curPrice * stocks;

        if(share > 0 && wallet.wal >= cost){
            setSharesHeld(prev => {
                const updated = [...prev]; 
                
                updated[i] = {
                    ...updated[i], totalShares: share, yourShares: updated[i].yourShares + stocks
                }
                return updated;
            })             
            
            setWallet(prev => {
              return {...prev, wal: prev.wal - cost}
            })   
        }        

    }
    function handleSell(id, stocks){
        const i = sharesHeld.findIndex(s => s.companyId === id);
        

        const share = sharesHeld[i].yourShares - stocks; 
        const profit = stocks * wallet.curPrice;        

        if(share >= 0){
            setSharesHeld(prev => {
                const updated = [...prev]; 

                updated[i] = {...updated[i], totalShares: updated[i].totalShares + stocks, yourShares: share}

                return updated;
            })

            setWallet(prev => {
              return {...prev, wal: prev.wal + profit}
            })
        }

        
    }

  const [portfolio, setPortfolio] = useState(false);
  
  //App component
  return <div className="container">
      <div className="header main-color">
        <img className="stock-logo" src="/images/stock.svg" alt="stock market logo"/>
        <h1 className="brand">Stock Market Simulation</h1> 
        <h2 className="wallet">Your Wallet = {wallet.wal}</h2>
      </div>
      <div className="navigation" >
        <Timer /> 
        <button onClick={() => navigate("/history")} className="history-button navi-btn sec-color">Transaction History</button>
        <button onClick={() => setPortfolio(true)} className='navi-btn sec-color'>Portfolio</button>
      </div>
      <div className="company-cards-cont">
          {shares.map(s => {
            return <Card id={s.id} key={s.id} picture={s.picture} name={s.name} price={s.price} change={s.change} direction={s.direction} handleClick={handleClick}/>
          })}          
      </div>

      <Buy 
        compId={compId ?? 0} 
        close={() => {setBuyState(false); setSellState(false)}} 
        trade={trade} 
        style={buyState ? "flex" : "none"}
        sharesHeld = {sharesHeld}
        handle = {(tr, id, stocks) => {
          handleTrade(tr, id, stocks);
          props.updateHistory(tr === 1? "BOUGHT" : "SOLD", sharesHeld[id].companyName, stocks, shares[id].price);
        }}
        />

      <Portfolio sharesHeld={sharesHeld} closePort={() => {setPortfolio(false)}} style={portfolio ? "flex" : "none"}/>  
  </div>
}

export default Home;