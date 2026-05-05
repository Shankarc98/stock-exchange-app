import React, { useState, useEffect } from "react"; 

function Portfolio(props){

    const [portfolio, setPortfolio] = useState(() => {
        const savedPortfolio = localStorage.getItem("portfolio"); 
    
        if(savedPortfolio) return JSON.parse(savedPortfolio); 
        else return props.sharesHeld;
    })
    
    useEffect(() => {
        localStorage.setItem("portfolio", JSON.stringify(portfolio));     
    }, [portfolio])
    
    return <div style = {{display: props.style}} className="portfolio">
        
        <div className="portfolio-top">
            <p className="portfolio-comp-name">Company</p> 
            <p className="portfolio-shares">Shares</p>
            <button onClick={props.closePort} className="port-close">x</button>

           
        </div>

        {props.sharesHeld.map(s => {
                return (<div key={s.companyId}className="records">
                    <p className="port-comp-name">{s.companyName}</p>
                    <p>{s.yourShares}</p>
                </div>);
            })}

    </div>
}

export default Portfolio