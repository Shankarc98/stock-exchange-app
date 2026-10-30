function Card(props){
 const changeIsValid = Number.isFinite(props.change) && props.change >= 0;
 const movementIsValid = changeIsValid && (
   (props.direction === 1 && props.change > 0) ||
   (props.direction === -1 && props.change > 0) ||
   (props.direction === 0 && props.change === 0)
 );
 const direction = movementIsValid ? props.direction : 0;
 const change = movementIsValid ? props.change : null;

 return <div className="card-cont">
           <div className = "name-price">
                <div className="logo-comp">
                    <img  src={props.picture} className="logo" alt={props.name + "logo"}/>
                    <p className="comp-name">{props.name}</p>
                </div> 

            <p className="price">₹ {(props.price).toFixed(2)}</p>
            <p className="change" style={{color: direction === 1 ? "green" : direction === -1 ? "red" : "black"}}>
              {change === null ? "Price change unavailable" : `₹ ${direction === 1 ? "↑" : direction === -1 ? "↓" : "—"} ${change.toFixed(2)}`}
            </p>
              
           </div> 
            

        <div className="card-buttons">
            <button onClick={() => props.handleClick(1, props.name)} className="btn" type="button">Buy</button>
            <button onClick={() => props.handleClick(2, props.name)} className="btn" type="button">Sell</button>
        </div>
    </div>
}

export default Card;