import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import bg from "./background.svg";
export default class App extends Component {
  state = {
    rules: [],
    flag: false
  };
  show = () =>{
    if(this.state.flag===false){
      return (<button className="rulecreate"><span>+&emsp;Create Firewall Rule</span></button>);
    }
    else{
      return(<div></div>);
    }
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
              <input className="inputfilt" type="text" placeholder="Filter" />
            </div>
            <br/>

            <div>{this.show()}</div>
            test
          </div>
        </div>
      </div>
    );
  }
}
