import React, { Component } from "react";
import arrow from "./art/arrow.svg";
import x from "./art/X.svg";
import v from "./art/V.svg";
import comp from "./art/comp.svg";
import arrowgrey from "./art/arrow-grey.svg";
import clk from "./art/clock.svg";
import options from "./art/options.svg";
import fullstar from "./art/fullstar.svg";
import empstar from "./art/emptystar.svg";
export default class Rule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rule: props.elm
    };
  }
  getdays = () => {
    var today = new Date();
    var createdOn = this.props.elm.createdOn;
    var msInDay = 24 * 60 * 60 * 1000;
    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    var diff = Math.abs(today - createdOn) / msInDay;
    ///msInDay;
    return diff;
  };
  getexdays = () => {
    var today = new Date();
    var expired = this.props.elm.expiration;
    var msInDay = 24 * 60 * 60 * 1000;
    expired.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    var diff = Math.abs(expired - today) / msInDay;
    ///msInDay;
    return diff;
  };
  showmode = () => {
    if (this.props.elm.mode === true) {
      return (
        <div className="greenbx">
          <img className="vee" src={v} alt="v" />
          <span>ALLOW</span>
        </div>
      );
    } else {
      return (
        <div className="redbx">
          <img className="ex" src={x} alt="x" />
          <span>DENY</span>
        </div>
      );
    }
  };
  updatefavorite = () => {
    this.props.updatefavorite(this.props.elm.id);
  };
  protolist = () => {
    return this.props.elm.protocols.map(element => {
      return <div className="prototag">{element}</div>;
    });
  };
  expiredisplay = () => {
    if (this.props.elm.expiration === false) {
      return <div></div>;
    } else {
      return (
        <div className="expire-box Column">
          <div className="clk">
            <img src={clk} alt="source" />
          </div>
          <div className="exp-text-container">
            <div className="Row greytext">Expire</div>
            <div className="Row iptext">In {this.getexdays()} days</div>
          </div>
        </div>
      );
    }
  };
  star=()=>{
    if(this.props.elm.favorite===true){
        return(<div><img src={fullstar} alt="favorite"/></div>);
    }
    else{
        return(<div><img src={empstar} alt="favorite"/></div>);

    }
  };
  render() {
    return (
      <div className="rulebar Row">
        <img className="arrowBox Column" src={arrow} alt="arrow" />
        <div className="nameBox Column">
          <div className="nbtitle">{this.props.elm.name}</div>
          <div className="nbcreated">Created {this.getdays()} days ago</div>
        </div>
        <div className="mode Column">{this.showmode()}</div>
        <div className="protocolbox Column">
          <div className="prototext">Protocols</div>
          <div className="prototypes">{this.protolist()}</div>
        </div>
        <div className="source-box Column">
          <div className="source-img">
            <img src={comp} alt="source" />
          </div>
          <div className="source-text-container">
            <div className="Row iptext">{this.props.elm.source}</div>
            <div className="Row greytext">Source</div>
          </div>
        </div>
        <div>
          <img className="arrow-grey Column" src={arrowgrey} alt="" />
        </div>
        <div className="des-box Column">
          <div className="des-img">
            <img src={comp} alt="destination" />
          </div>
          <div className="des-text-container">
            <div className="Row iptext">{this.props.elm.destination}</div>
            <div className="Row greytext">Destination</div>
          </div>

        </div>
        {this.expiredisplay()}
        {/* TODO  ADD expiration, favorite star(use flag function to switch between full and empty, add triple dots for options) */}
        <div className="Column star" onClick={this.updatefavorite}>{this.star()}</div>
        <div className="Column option"><img src={options} alt="options"/></div>
      </div>
    );
  }
}
