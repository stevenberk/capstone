import React from 'react';
import axios from 'axios';
import Login from './login';
import Accountpage from './Accountpage';


class Youraccount extends React.Component{
    constructor(props){
        super(props);
     this.state ={
        SearchResults : [
            {
                location: "NULL",
                currency: "NULL",
                amount: 0,
                valueInUSD: 0,
                sellerEmail: "",
                // notes: ""
            },
              
        ],
        loginFlag: true 
    }
    axios.get(`http://${process.env.REACT_APP_FETCHURL}:3006/posts`)
        .then(response => {
            this.setState({
            SearchResults : response["data"]
            })
        })
    }

    render(){

        return(
            <div className="transition">
                <div className="pageheader">
                <h1 >Welcome, thanks for signing up!</h1>
                </div>
                <Login />
            </div>
        )
    }
}

export default Youraccount;