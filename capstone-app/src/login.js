import React from 'react';
import axios from 'axios';
import Signup from "./signup"
import Accountpage from "./Accountpage";
 
class Login extends React.Component{
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
            loginFlag: false,
            signupFlag: false,
          
        }

 
     if(localStorage.getItem("token")){
         this.setState({loginFlag: true})
         axios.post(`http://${process.env.REACT_APP_FETCHURL}/seedaccountpage`,
            {
           email:localStorage.getItem("email")
            }).then((response)=>{ 
            this.setState({SearchResults: response.data})})
     }


    }
    
    

render(){
let loginForms = 
<div className="submaincontainter transition">
    <div className="buyersearchmenucontainer">
    <h1 className="pageheader">Please Log In</h1>
        <form className="buyerdropdowns spaceAlittle">
            
            <input className="spaceAlittle" type="text" placeholder="Email" onChange={(event)=>{this.setState({email:event.target.value})}}/>
            <input  className="spaceAlittle" type="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}}/>
        </form>
    
    
    <button className="btn btn-primary btn-sm spaceAlittle" onClick={(event)=>{

        
        axios.post(`http://${process.env.REACT_APP_FETCHURL}/querylogin`, {
            email: this.state.email,
            password: this.state.password
        }).then((response)=> {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", this.state.email);
            localStorage.setItem("firstname", response.data.firstname);
            localStorage.setItem("userid", response.data.userid)
            this.setState({loginFlag : true});
           
        })
        .catch((event)=> {
            alert('Invalid Login')
        })  
        }   
    }>
        Login
    </button>
    <button className="btn btn-primary btn-sm spaceAlittle" onClick={(click)=>{
        this.setState({signupFlag:true})
    }}>
        signup
    </button>
    <div >
    </div>
    </div>
</div>

let signuppage =
<div>
    <Signup />
</div>

let accountInfo = 
<div>
    <Accountpage />
   
</div>    


return(this.state.loginFlag  ?  
    accountInfo
   : this.state.signupFlag ? signuppage 
   : loginForms  
   )
}
}

export default Login;