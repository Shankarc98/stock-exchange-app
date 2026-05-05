import { React, useState, useEffect } from 'react'
import Home from "./Components/Home";
import History from "./Components/History.jsx";
import {Routes, Route} from "react-router-dom";

function App(){

  //id
  const [transactionId, setTransactionId] = useState(() => {
    const savedTranId = localStorage.getItem("transactionId");

    if(savedTranId) return Number(savedTranId);
    else return 0;
  })

  useEffect(() => {
      localStorage.setItem("transactionId", transactionId)
  }, [transactionId])

  //History array
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("history"); 

    if(savedHistory) return JSON.parse(savedHistory);
    else return [];
  })

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history))
  }, [history]);

  function updateHistory(tr, nm, sh, pr){
    
    let tran = sh * pr;
    tran = Number(tran.toFixed(2));
    
    console.log(pr);
    console.log(tran);
    setHistory(prev => {
      return [...prev, {id: transactionId, type: tr, compName: nm, sharesTraded: sh, atPrice: pr, money: tran} ]
    })

    setTransactionId(prev => prev + 1);
    console.log(history);
    
  }
  function deleteTransaction(id){
    setHistory(prev => {
      return prev.filter(p => p.id !== id)
    })
  }
  

  return <Routes>
    <Route path="/" element={<Home updateHistory={updateHistory}/>} />
    <Route path="/history" element={<History history={history} deleteTransaction={deleteTransaction}/>}/>
  </Routes>  
}

export default App;