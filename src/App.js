import React, { Component } from "react";
import "./App.css";
import bg from "./background.svg";
import Rule from "./components/Rule";
import NewRule from "./components/NewRule";
export default class App extends Component {
  state = {
    rules: [
      {
        id:0,
        name: "Block HTTP from the break-room",
        createdOn: new Date(2020, 1, 17, 0, 0, 0, 0),
        mode: false,
        protocols: ["HTTP"],
        source: "10.0.0.0/16",
        destination: "ANY",
        expiration: new Date(2020, 1, 27, 0, 0, 0, 0),
        favorite:true
      },
      {
        id:1,
        name: "Allow SMTP server integration. created per request of ... ",
        createdOn: new Date(2020, 1, 17, 0, 0, 0, 0),
        mode: true,
        protocols: ["SMTP", "2 more ..."],
        source: "ANY",
        destination: "10.0.1.215/32",
        expiration: false,
        favorite:false
      },
      { 
        id:2,
        name: "Ping in the company",
        createdOn: new Date(2020, 1, 10, 0, 0, 0, 0),
        mode: true,
        protocols: ["ICMP"],
        source: "ANY",
        destination: "ANY",
        expiration: false,
        favorite:false
      }
    ],
    flag: false,
    filterr: ""
  };

  updateflag = () => {
    this.setState({ flag: !this.state.flag });
  };
  updaterules = (rule)=>{
    rule.id=this.state.rules.length;
    this.setState({rules:[...this.state.rules, rule]});
  };
  updatefavorite = (i)=>{
    var rules=this.state.rules;
    rules[i].favorite=!rules[i].favorite;
    this.setState({rules:rules});
  };
  show = () => {
    if (this.state.flag === false) {
      return (
        <button className="rulecreate" onClick={this.updateflag}>
          <span>+&emsp;Create Firewall Rule</span>
        </button>
      );
    } else {
      return (<div><NewRule updaterules={this.updaterules} updateflag={this.updateflag}/></div>);
    }
  };
  updatefilter = e => {
    this.setState({ filterr: e.target.value });
  };
  rules = () =>{
    var filtarr=this.state.rules
      .filter((elm) => {
        return elm.name
          .toUpperCase()
          .includes(this.state.filterr.toUpperCase())===true;
      });
      return(filtarr.map((element,i) => {
        return <Rule key={i} elm={element} updatefavorite={this.updatefavorite}/>
        
      }));
  }
  render() {
    return (
      <div>
        <div className="bg">
          <div className="header"></div>
          <p className="firewallrules">Firewall Rules</p>
          <img className="Group" src={bg} alt="background" />
          <div className="rule_container">
            <div className="input_container">
              <input
                className="inputfilt"
                type="text"
                onChange={this.updatefilter}
                placeholder="Filter"
              />
            </div>
            <br />

            <div className="nrcontainer">{this.show()}</div>
            <div>{this.rules()}</div>
          </div>
        </div>
      </div>
    );
  }
}
