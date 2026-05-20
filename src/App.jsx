import { React, useState, useEffect } from 'react'
import Home from "./Components/Home";
import History from "./Components/History.jsx";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {Routes, Route} from "react-router-dom";

function App(){
  
    
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

  return <Routes>
    <Route path="/" element = {<Login />}/>
    <Route path="/signup" element = {<Signup />}/>
    <Route path="/home" element={<Home updateHistory={updateHistory}/>} />
    <Route path="/history" element={<History />}/>
  </Routes>  
}

export default App;