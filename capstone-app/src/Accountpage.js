import React from 'react';
import Login from './login';
import axios from 'axios';

class Accountpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        SearchResults : [
            {
                postid: 0,
                location: "",
                currency: "",
                amount: 0,
                valueinusd: 0,
                selleremail: "",
                sellername: '', 
                sellerid: '1' ,
                // notes: ""
            }    
        ],
        email: "null",
        password: "password",
        loadedContent: false
        
      
    }  
        axios.post(`http://${process.env.REACT_APP_FETCHURL}/seedaccountpage`,
    {
        email:localStorage.getItem("email")
    })   
    .then((response)=> {this.setState({SearchResults: response.data, loadedContent:true})})
    
}

render(){
  let ArrayMapperRenderer = (props)=>
    <div  className="submaincontainter ">
    <div className="pageheader">
    <h1>Your banknote submissions:</h1>
    </div>
    <button className="btn btn-link" onClick={(event)=>{
       localStorage.removeItem("email");
       localStorage.removeItem("token");
       localStorage.removeItem("firstname");
       localStorage.removeItem("userid");
       this.setState({loadedContent:false});
       window.location.reload();
      }}>
      logout
    </button>
    
    <div className="accountmerchcardcontainer"> 
       {props.submissions.map(post =>
        <div  className="merchcard">
          <h5>{post.amount} {post.currency}</h5> 
          <p>Value in USD: ${post.valueinusd}</p>
          <p>Your Email: {post.selleremail}</p>
          <p>Your Location: {post.location}</p>
          {/* <p>Notes: {post.notes}</p> */}
          <button className="btn btn-link " onClick={(event)=>{
             axios.post(`http://${process.env.REACT_APP_FETCHURL}/deletepost`,  
               {id:post.postid}
              )
               .then(()=>{
                 axios.post(`http://${process.env.REACT_APP_FETCHURL}/seedaccountpage`,
               {
                 email:localStorage.getItem("email")
                }
              ).then((response)=> this.setState({SearchResults:response.data}))})
          }}>Delete</button>  
      </div>  
      )}
   
    </div>
  
    
  
</div>
  

let UserAccountPage =
<div className="newsubmaincontainter transition">
    <ArrayMapperRenderer submissions={this.state.SearchResults}/>
</div>   




return (UserAccountPage)
}

}

export default Accountpage;