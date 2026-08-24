import {useState} from "react"; 


function Portfolio(props){
    
    
    return <div style = {{display: props.style}} className="portfolio">
        
        <div className="portfolio-top">
            <p className="portfolio-comp-name">Company</p> 
            <p className="portfolio-shares">Shares</p>
            <button onClick={props.closePort} className="port-close">x</button>           
        </div>

        {props.sharesHeld.map(s => {
                return (<div key={crypto.randomUUID()} className="records">
                    <p className="port-comp-name">{s.companyName}</p>
                    <p>{s.numOfStocks}</p>
                </div>);
            })}

    </div>
}

export default Portfolio