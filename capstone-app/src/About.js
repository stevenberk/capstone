import React from 'react';


class About extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }
render(){
    return(
        <div className="submaincontainter transition">
        <h1 className="pageheader">Exact Change</h1>
        <div className="instructioncontainer">
        <h4 className="pageheader">Don't pay exchange fees and commissions. Buy and Sell foreign currency in your area for the exact exchange rate!</h4>
        </div>
        <h2 className="pageheader underliner">How it works:</h2>
        <div className="instructioncontainer">
            <h5 className="pageheader">1. Create an account</h5>
            <h5 className="pageheader">2. Before your trip, browse and purchase foreign banknotes</h5>
            <h5 className="pageheader">3. After you return, post and sell your unused foreign currency to other travelers</h5>
        </div>
            <a href="https://github.com/stevenberk/Capstone">GitHub repo</a>
            <a href="https://stevenberk.github.io">Resume</a>
      
        </div>
    )
}
}

export default About;