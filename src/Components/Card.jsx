import React from "react";

function Card(props){
        
    return <div className="card-cont">
       <div className="logo-comp">
        <img  src={props.picture} className="logo" alt="avionics logo"/>
        <p className="comp-name">{props.name}</p>
       </div> 

        <p className="price main-font-color">₹ {(props.price).toFixed(2)}</p>
        <p className="change" style={{color: props.direction == 1 ? "green" : props.direction == -1 ? "red" : "black"}}>₹ {props.direction == 1? "↑" : props.direction == -1 ?  "↓" : "—"} {(props.change).toFixed(2)}</p>

       <div className="card-buttons">
        <button onClick={() => props.handleClick(1, props.name, props.price, props.id)} className="buy-btn btn main-color" type="button">Buy</button>
        <button onClick={() => props.handleClick(2, props.name, props.price, props.id)} className="sell-btn btn main-color" type="button">Sell</button>
       </div>
    </div>
}

export default Card;