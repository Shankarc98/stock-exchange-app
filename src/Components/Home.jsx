import { useState, useEffect } from 'react'
import Card from "./Card"
import companies from '../assets/Data.jsx';
import Buy from './Buy';
import Portfolio from "./Portfolio"
import { useNavigate, useLocation } from 'react-router-dom';

function Home(props){
  
  const navigate = useNavigate(); 
  const {state} = useLocation(); 

  const [player, setPlayer] = useState(state.player);

  useEffect(() => {
    const fetchPlayer  = async () => {
      const response = await fetch(`https://stock-backend-server.onrender.com/${player.name}/name`)
      
      const playerResponse = await response.json();
      setPlayer(playerResponse);
    }
    
    fetchPlayer();

  }, []);
  //main array - all companies
  const [companies, updateCompanies] = useState([]); 

  useEffect(() => {
   const fetchCompanies = async () => {
    const response = await fetch("https://stock-backend-server.onrender.com/company", {
      method: "GET"
    })
    const data = await response.json();
    updateCompanies(data);
   }
    fetchCompanies();
  }, []);

  async function fetchPrices(){
    const response = await fetch("https://stock-backend-server.onrender.com/company", {
        method: "GET",            
    })
    const data = await response.json();
    return updateCompanies(data);
}


  //timer 
  const [seconds, setSeconds] = useState(() =>{
    const savedSeconds = localStorage.getItem("seconds"); 

    if(savedSeconds) return Number(JSON.parse(savedSeconds));

    else return 600;
  }); 
  

  useEffect(() => {        
          const  fetchCompanies = setInterval(() => {
              setSeconds(prev => {
                  if(prev <= 0){                                           
                    fetchPrices();  
                    return 600;                      
                  }
                  return prev - 1;
              });
          }, 1000);
          
          return () => clearInterval(fetchCompanies);
      }, [])

    useEffect(() => {
        localStorage.setItem("seconds", JSON.stringify(seconds));
      }, [seconds]);

  let [buyState, setBuyState] = useState(false);
  let [sellState, setSellState] = useState(false);
  const [portfolio, setPortfolio] = useState(false);

  let [trade, setTrade] = useState(0);  

  useEffect(() => {
    if(buyState)  setTrade(1);
    else if(sellState)  setTrade(2);
    else setTrade(0);
  }, [buyState, sellState])
  
    
  let [selectedCompany, setCompany] = useState({});

  
  //buy and sell button in card clicked
  function handleClick(a, name, cp){
    
    a == 1 ? setBuyState(true) : setSellState(true)
    companies.map((c) => {
      if(c.name === name){ 
        setCompany(c);
      }
    })
    
  }
           
     //trading 
     function handleTrade(trade, id, stocks){
        if(trade == 1)
          handleBuy(id, stocks);        
        else
          handleSell(id, stocks);
      }

      async function handleBuy(id, stocks){
        const response =  await fetch(`https://stock-backend-server.onrender.com/${player.id}/buy`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

          },

          body: JSON.stringify({
            numOfStocks: stocks,
            price: selectedCompany.price,
            companyName: selectedCompany.name,
            companyId: selectedCompany.id
          })

        });

        const updatedPlayer = await response.json();
        
        if(response.ok){
          setPlayer(prev => {
           return {...prev, money: updatedPlayer.p.money, stocksHeld: updatedPlayer.p.stocksHeld}
          }); 
          setCompany(updatedPlayer.c);
          updateCompanies(prev => 
          prev.map(p => 
            p.id === id ? {...p, stocks: updatedPlayer.c.stocks} : p            
          ));

          let savedPlayer = await fetch(`https://stock-backend-server.onrender.com/${player.id}/transaction`, {
            method: "PATCH", 

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
                trade: "BOUGHT",
                company: selectedCompany.name,
                sharesTraded: stocks,
                price: selectedCompany.price,
                totalMoney: stocks * selectedCompany.price

            })
          })
          savedPlayer = await savedPlayer.json(); 

          if(savedPlayer.ok){
            setPlayer(savedPlayer);
            console.log(savedPlayer);
          }
        }
          
      } 

    async function handleSell(id, stocks){
        
       const response =  await fetch(`https://stock-backend-server.onrender.com/${player.id}/sell`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

          },

          body: JSON.stringify({
            numOfStocks: stocks,
            price: selectedCompany.price,
            companyName: selectedCompany.name,
            companyId: selectedCompany.id
          })

        });

        
          const updatedPlayer = await response.json();
        
        
        if(response.ok){
          setPlayer(updatedPlayer.p); 
          setCompany(updatedPlayer.c);
          updateCompanies(prev => 
          prev.map(p => 
            p.id === id ? {...p, stocks: updatedPlayer.c.stocks} : p            
          )  
          
        );

          let savedPlayer = await fetch(`https://stock-backend-server.onrender.com/${player.id}/transaction`, {
            method: "PATCH", 

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
                trade: "SOLD",
                company: selectedCompany.name,
                sharesTraded: stocks,
                price: selectedCompany.price,
                totalMoney: stocks * selectedCompany.price
            })
          })

          savedPlayer = await savedPlayer.json(); 

          if(savedPlayer.ok){
            setPlayer(savedPlayer);
            console.log(savedPlayer);
          }
        }
        
    }

  function transactions(){
    navigate("/history", {
      state: {player}
    })
  }
  //App component
  return <div className="container">
      <div className="header main-color">
        <div className="logo-brand">
          <img className="stock-logo" src="/images/stock.svg" alt="stock market logo"/>
          <h1 className="brand">Stock Market Simulation</h1>           
        </div>
        
        <h2 className="wallet">Your Wallet = {Number(player.money.toFixed(2))}</h2>

      </div>
      <div className="navigation" >
        <p className="clock sec-color" >Next update in: {Math.floor(seconds / 60)}:{(seconds % 60) < 10 ? 0 : ""}{seconds % 60}</p> 
        <div className="portfolio-history">
          <button onClick={() => transactions()} className="history-button navi-btn sec-color">Transaction History</button>
          <button onClick={() => setPortfolio(true)} className='navi-btn sec-color'>Portfolio</button>
          <button onClick={() => navigate("/")} className='navi-btn sec-color'>Log out</button>
        </div>
        
      </div>
      <div className="company-cards-cont">
          {companies.map(s => {
            return <Card id={s.id} key={s.id} picture={s.picture} name={s.name} direction = {s.direction} price={s.price} change={s.change} handleClick={handleClick}/>
          })}          
      </div>

      <Buy 
        selectedCompany={selectedCompany}       
        close={() => {setBuyState(false); setSellState(false)}} 
        trade={trade} 
        style={buyState ? "flex" : "none"}
        stocksHeld = {player.stocksHeld.find(company => {
          if(company.companyName === selectedCompany?.name){
            return company;
          }
        }          
          
        )}
        handle = {(tr, id, stocks) => {
          handleTrade(tr, id, stocks);
        }}
        />

      <Portfolio sharesHeld={player.stocksHeld} closePort={() => {setPortfolio(false)}} style={portfolio ? "flex" : "none"}/>  

  </div>
}


export default Home;