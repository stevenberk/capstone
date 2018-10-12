import React from 'react';


class About extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }
render(){
    return(
        <div className="submaincontainter">
        <h1 className="pageheader">About My Capstone</h1>
        <p>Welcome to my capstone web app! The logistics of planning a trip to Cuba in 2018 is unlike planning a trip to anywhere else in the world. One major hurdle of traveling to Cuba in this day and age is accessing local currency to spend on the island. US debit and credit cards simply don't work in Cuba, and exchanging US dollars for local currency in Cuba is at best, time consuming and prohibitively expensive (long lines, double-digit commission fees, illegal street exchangers). The best option for American travlers visiting Cuba: bring enough money in a third currency to exchange in Cuba. Faced with an upcoming trip to Cuba for Thanksgiving 2018</p>
        <h1 className="pageheader">Technologies Used:</h1>
        <ul>
            <li>
                React.js
            </li>
            <li>
                CSS
            </li>
            <li>
                Bootstrap
            </li>
            <li>
                Responsive Design
            </li>
            <li>
                Node.js 
            </li>
            <li>
                JSON Web Tokens
            </li>
            <li>
                Bcrypt
            </li>
            <li>
                PostgreSQL 
            </li>
            <li>
            <a href="https://github.com/stevenberk/Capstone-react-app">GitHub repo</a>
            </li>
        </ul>
       
        </div>
    )
}
}

export default About;