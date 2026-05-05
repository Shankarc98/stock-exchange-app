import React from "react";

function Card(props){
    
    
    return <div className="card-cont">
       <div className="logo-comp">
        <img  src={props.picture} className="logo" alt="avionics logo"/>
        <p className="comp-name">{props.name}</p>
       </div> 

        <p className="price main-font-color">₹ {props.price}</p>
        <p className="change" style={{color: props.direction ? "green" : "red"}}>₹ {props.direction ? "↑" : "↓"} {props.change}</p>

       <div className="card-buttons">
        <button onClick={() => props.handleClick(1, props.id, props.price)} className="buy-btn btn main-color">Buy</button>
        <button onClick={() => props.handleClick(2, props.id, props.price)} className="sell-btn btn main-color">Sell</button>
       </div>
    </div>
}

export default Card;