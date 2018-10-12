import React from "react";
import buyerSearchPage from './buyerSearchPage';
import SellerPostPage from './sellerPostPage';
import Login from './login';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import About from './About';
import Accountpage from './Accountpage';

let withAuthentication = (Component) => 
class Authenticated extends React.Component{
     render(){
       return(localStorage.getItem('token') ? <Component {...this.props}/>  : <Redirect to="/login"/>)       
     }
}

const App = () => (
  <BrowserRouter>
    <div className="mainpagecontainer">
      <div className="navbar">
        <div className="nav-item">
          <Link className="darkcyan" to="/about">About</Link>
        </div>
        <div className="nav-item">
          <Link className="darkcyan" to="/acount">Account</Link>
        </div>
        <div className="nav-item">
          <Link className="darkcyan" to="/sell">Sell</Link>
        </div>
        <div className="nav-item">
          <Link className="darkcyan" to="/buy">Buy</Link>
        </div>
      </div>
      <Route path="/" component={About} exact/>
      <Route path="/about" component={About} /> 
      <Route path="/login" component={Login}  />
      <Route path="/Acount" component={withAuthentication(Accountpage)}  />
      <Route path="/buy" component={withAuthentication(buyerSearchPage)} />
      <Route path="/sell" component={withAuthentication(SellerPostPage)} />
    </div>
  </BrowserRouter> 
)






export default App;