import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import bg from "./background.svg";
import Rule from "./components/Rule";
export default class App extends Component {
  state = {
    rules: [{name:"Block HTTP from the break-room",
  createdOn:new Date(2020,1,17,0,0,0,0),
  mode:false,
protocols:[],
source:"10.0.0.0/16",
destination:"ANY",
expiration:new Date(2020,1,27,0,0,0,0)}],
    flag: false,
    filter:''
  };
  updateflag =()=>{
    this.setState({flag:!this.state.flag});
  };
  show = () =>{
    if(this.state.flag===false){
      return (<button className="rulecreate" onClick={this.updateflag}><span>+&emsp;Create Firewall Rule</span></button>);
    }
    else{
      return(<div></div>);
    }
  };
  updatefilter=(e)=>{
    this.setState({filter:e.target.value});
  };
  render() {
    return (
      <div>
        <div className="bg">
          <div className="header"></div>
          <p className="firewallrules">Firewall Rules</p>
          <img className="Group" src={bg} alt="background" />
          <div className="rule_container">
            <div className="input_container">
              <input className="inputfilt" type="text" onChange={this.updatefilter} placeholder="Filter" />
            </div>
            <br/>

            <div>{this.show()}</div>
            {this.state.rules.filter(elm => {
                  return elm.name.toLowerCase().includes(this.state.filter.toLowerCase())===true;
                }).map((elm, i) => {
            return (
              <Rule elm={elm}/>
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}
