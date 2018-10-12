import React from 'react';
import axios from 'axios';

import Login from './login';





class buyerSearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            SearchResults : [
                {
                    postid: 0,
                    location: "NULL",
                    currency: "NULL",
                    amount: 0,
                    valueinusd: 0,
                    sellername: "null",
                    sellerid: 0,
                    selleremail: "n",
                    notes: "n"
                }    
            ],
            SelectedLocation: "null",
            SelectedCurrency: "null"
    }
    }

 
render() 

{

let ArrayMapperRenderer = (props)=>
<div className="merchcardcontainer transition">    
        {props.submissions.map(post =>
            <div className="merchcard" >
                <div className="merchcardheader">
                    <h3>{post.amount} {post.currency}</h3> 
                <h4>Value in USD: ${post.valueinusd}</h4>
            </div>
            <div className="merchcardsubheader">
                <p>Seller Email:<br/>{post.selleremail}</p>
                <p>{post.location}</p>
                {/* <p>Notes: {post.notes}</p>   */}
            </div>
        </div> 
    )}
</div>

let logout=()=>{
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("firstname");
        localStorage.removeItem("userid");
        window.location.reload();
}
let displayIfLoggedIn = <div className="submaincontainter transition" >
    <div className="pageheader">
    <h1 >
        Browse banknotes
    </h1>
    </div>
    <div className="buyersearchmenucontainer">
    <select className="buyerdropdowns" value={this.state.SelectedLocation} onChange={(event)=>{this.setState({SelectedLocation:event.target.value})}} >
       <option value="SelectNULL">Select Location</option>
       <option value="Atlanta">Atlanta</option>
       <option value="Boston">Boston</option>
       <option value="Chicago">Chicago</option>
       <option value="Dallas">Dallas</option>
       <option value="Bay Area">Bay Area</option>
       <option value="New York">New York</option>
       <option value="Seattle">Seattle</option>
       <option value="Los Angeles">Los Angeles</option>
       <option value="Miami">Miami</option> 
    </select>
    <select className="buyerdropdowns" value={this.state.SelectedCurrency} onChange={(event)=>{this.setState({SelectedCurrency:event.target.value})}} >
        <option  value="SelectNULL">Select Currency</option>
        <option value="CAD">Canadian Dollar (CAD)</option>
        <option value="EUR">Euros (EUR)</option>
        <option value="GBP">GB Pounds (GBP)</option>
        <option value="JPY">Japanese Yen (JPY)</option>
        <option value="MXN">Mexican Peso (MXN)</option>
        <option value="CUC">Cuban Convertible Peso (CUC)</option>
        <option value="AUD">Australian Dollar (AUD)</option>
        <option value="THB">Thai Baht (THB)</option>
        <option value="CHF">Swiss Franc (CHF)</option>     
    </select>

    <button className="btn btn-primary btn-sm" onClick={(event)=>{
        //this does a PostgreSQL SELECT
        axios.post(`http://${process.env.REACT_APP_FETCHURL}/querysubmissions`, {
            location: this.state.SelectedLocation,
            currency: this.state.SelectedCurrency
        }
    ).then((response)=> this.setState({
        SearchResults: response.data
    }));
    }}
    
    >Search</button>
    <button className="btn btn-link" onClick={(event)=>{logout()}}>
            logout
        </button>
    </div>
    
  <ArrayMapperRenderer submissions={this.state.SearchResults.filter(entry =>(
      entry.location === this.state.SelectedLocation &&
      entry.currency === this.state.SelectedCurrency))
      }/>

   
</div>


return (displayIfLoggedIn)   
}
}

export default buyerSearchPage;