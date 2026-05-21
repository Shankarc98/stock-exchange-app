import { React, useState, useEffect } from 'react'
import Home from "./Components/Home";
import History from "./Components/History.jsx";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {Routes, Route} from "react-router-dom";

function App(){        

  return <Routes>
    <Route path="/" element = {<Login />}/>
    <Route path="/signup" element = {<Signup />}/>
    <Route path="/home" element={<Home updateHistory={updateHistory}/>} />
    <Route path="/history" element={<History />}/>
  </Routes>  
}

export default App;