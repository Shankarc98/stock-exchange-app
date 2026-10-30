import { useState, useEffect } from 'react'
import Card from "./Card"
import Buy from './Buy';
import Portfolio from "./Portfolio"
import Header from "./Header";
import Popup from "./Popup";
import { useNavigate, useLocation } from 'react-router-dom';
import apiFetch from '../utils/helper.jsx';
import {getApiErrorMessage, getRequestFailureMessage} from "../utils/apiErrors";
import {calculateNetWorth, calculateTradeAmount, formatCurrency} from "../utils/currency";

function Home(){
    
  const navigate = useNavigate(); 
  const {state} = useLocation(); 

  const [player, setPlayer] = useState(state.player);
  const [seconds, setSeconds] = useState(0); 
  const [popup, setPopup] = useState(false);
  const [popMessage, setPopMessage] = useState("");


  useEffect(() => {
    const fetchPlayer  = async () => {
      const response = await apiFetch(`/player/${player.name}/name`,{
        method: "GET",        
      })
      
      const playerResponse = await response.json();
      setPlayer(playerResponse);
    }
          
    fetchPlayer();

  }, [player.name]);

  //main array - all companies
  const [companies, updateCompanies] = useState([]); 

  useEffect(() => {
   const fetchCompanies = async () => {
    const response = await apiFetch(`/company`, {
      method: "GET"
    })
    const data = await response.json();
    updateCompanies(data.companies);
    setSeconds(Math.floor((data.nextUpdateTime - Date.now()) / 1000));
   }
    fetchCompanies();
  }, []);
  

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await apiFetch(`/company`, {
        method: "GET",
      });
      const data = await response.json();
      updateCompanies(data.companies);
      setCompany(current => data.companies.find(company => company.id === current?.id) ?? current);
      setSeconds(Math.floor((data.nextUpdateTime - Date.now()) / 1000));
    };

    const interval = setInterval(() => {
      setSeconds(previous => {
        if (previous <= 0) fetchPrices();
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
    

  const [portfolio, setPortfolio] = useState(false);
  const [trade, setTrade] = useState(0);
  
    
  const [selectedCompany, setCompany] = useState(null);

  
  //buy and sell button in card clicked
  function handleClick(action, name){
    const company = companies.find(item => item.name === name);
    if (!company) return;

    setTrade(action);
    setCompany(company);
  }
           
     //trading 
  async function handleTrade(action, id, stocks){
    const company = companies.find(item => item.id === id) ?? selectedCompany;
    if (!company || !Number.isInteger(stocks) || stocks <= 0){
      setPopMessage("Enter a whole number of shares greater than zero.");
      setPopup(true);
      return false;
    }

    const amount = calculateTradeAmount(company.price, stocks);
    const heldShares = player.stocksHeld
      .filter(holding => holding.companyName === company.name)
      .reduce((total, holding) => total + holding.numOfStocks, 0);

    if (action === 1 && amount > player.money){
      setPopMessage(`Insufficient balance. You need ${formatCurrency(amount)}, but your available balance is ${formatCurrency(player.money)}.`);
      setPopup(true);
      return false;
    }

    if (action === 1 && stocks > company.stocks){
      setPopMessage(`Only ${company.stocks} shares are currently available to buy.`);
      setPopup(true);
      return false;
    }

    if (action === 2 && stocks > heldShares){
      setPopMessage(`You do not have enough shares to sell. Available quantity: ${heldShares}.`);
      setPopup(true);
      return false;
    }

    try {
      const response = await apiFetch(`/trade/${player.id}/${action === 1 ? "buy" : "sell"}`, {
        method: "PUT",
        body: JSON.stringify({
          numOfStocks: stocks,
          companyId: company.id
        })
      });

      if (!response.ok){
        setPopMessage(await getApiErrorMessage(response, "trade"));
        setPopup(true);
        return false;
      }

      const updatedPlayer = await response.json();
      const updatedCompany = updatedPlayer.c;
      setPlayer(updatedPlayer.p);
      setCompany(updatedCompany);
      updateCompanies(previous => previous.map(item =>
        item.id === id ? updatedCompany : item
      ));
      return true;
    } catch (error) {
      setPopMessage(getRequestFailureMessage(error));
      setPopup(true);
      return false;
    }
  }

  function transactions(){
    
    navigate("/history", {
      state: {player}
    })
  }

  //App component
  return <div className="container">
      <Header
        money={player.money}
        netWorth={calculateNetWorth(player.money, player.stocksHeld, companies)}
      />
      <div className="navigation" >
        <p className="clock">Next update in: {Math.floor(seconds / 60)}:{(seconds % 60) < 10 ? 0 : ""}{seconds % 60}</p> 
        <div className="portfolio-history">
          <button onClick={() => transactions()} className="history-button navi-btn " type="button">Transaction History</button>
          <button onClick={() => setPortfolio(true)} className='navi-btn' type="button">Portfolio</button>
          <button onClick={() => navigate("/")} className='navi-btn ' type="button">Log out</button>
        </div>
        
      </div>
      <div className="company-cards-cont">
          {companies.map(s => {
            return <Card id={s.id} key={s.id} picture={s.picture} name={s.name} direction = {s.direction} price={s.price} change={s.change} handleClick={handleClick}/>
          })}          
      </div>

      <Buy
        key={`${trade}-${selectedCompany?.id ?? ""}`}
        selectedCompany={selectedCompany}       
        close={() => setTrade(0)}
        trade={trade} 
        walletBalance={player.money}
        availableShares={player.stocksHeld
          .filter(holding => holding.companyName === selectedCompany?.name)
          .reduce((total, holding) => total + holding.numOfStocks, 0)}
        stocksHeld = {player.stocksHeld.find(company => {
          if(company.companyName === selectedCompany?.name){
            return company;
          }
        }          
          
        )}
        handle={handleTrade}
        onValidationError={message => {
          setPopMessage(message);
          setPopup(true);
        }}
        />

      <Portfolio sharesHeld={player.stocksHeld} closePort={() => {setPortfolio(false)}} style={portfolio ? "flex" : "none"}/>  
      <Popup popup={popup} message={popMessage} setPopup={setPopup}/>

  </div>
}


export default Home;