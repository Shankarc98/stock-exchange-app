
function Portfolio(props){
    
    
    return <div style = {{display: props.style}} className="portfolio">
        
        <div className="portfolio-top">
            <p className="portfolio-comp-name">Company</p>             
            <p className="portfolio-shares">Shares</p>
            <button onClick={props.closePort} className="port-close" type="button">x</button>           
        </div>

        {props.sharesHeld.length === 0 && <p className="portfolio-empty">No shares in your portfolio yet.</p>}

        {props.sharesHeld.map(s => {
                return (<div key={s.companyName} className="records">
                    <p className="port-comp-name">{s.companyName}</p>
                    <p>{s.numOfStocks}</p>
                </div>);
            })}

    </div>
}

export default Portfolio