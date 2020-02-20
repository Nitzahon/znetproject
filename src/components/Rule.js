import React, { Component } from "react";
import arrow from "./arrow.svg";
import x from "./X.svg";
import v from "./V.svg";
export default class Rule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rule: props.elm
      
    };
    
  }
  getdays = () => {
    var today = new Date();
    var createdOn = this.state.rule.createdOn;
    var msInDay = 24 * 60 * 60 * 1000;
    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    var diff = Math.abs(today - createdOn) / msInDay;
    ///msInDay;
    return diff;
    
  };
  showmode = ()=>{
      if(this.state.rule.mode===true){
        return(<div className="greenbx">
<img className="vee" src={v} alt="v" /><span>ALLOW</span>
        </div>)
      }
      else{
          return(<div className="redbx"><img className="ex" src={x} alt="x" /><span>DENY</span></div>)
      }
  };
  render() {
    return (
      <div className="rulebar Row">
        <img className="arrowBox Column" src={arrow} alt="arrow" />
        <div className="nameBox Column">
          <div className="nbtitle">{this.state.rule.name}</div>
          <div className="nbcreated">Created {this.getdays()} days ago</div>
        </div>
    <div className="mode Column">{this.showmode()}</div>
      </div>
    );
  }
}
