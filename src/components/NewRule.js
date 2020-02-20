import React, { Component } from "react";
import deny from "./deny.svg";
import allow from "./allow.svg";
import create from "./create.svg";
import cancel from "./cancel.svg";
export default class NewRule extends Component {
    constructor(props) {
        super(props);
        //TODO:add onChange function to each input
        this.state = {
            name: "",
            createdOn: new Date(),
            mode: false,
            protocols: [],
            source: "",
            destination: "",
            expiration: new Date(),
            favorite:true
        };
      }
      updaterules=()=>{
        this.props.updaterules(this.state);
      };
      updateflag=()=>{
          this.props.updateflag();
      }
  render() {
    return (
      <div className="newrule">
        <div className="createfwrtext Row">Create Firewall Rule</div>
        <div className="Column column1">
          <div className="Row namebox">
            <div className="Row">Name</div>
            <div className="Row">
              <input
                type="text"
                className="choosename"
                placeholder="Choose name"
              />
            </div>
          </div>
          <div className="modebox Row">
            <div className="Row">Mode</div>
            <div className="Row"><img src={deny}/><img src={allow}/></div>
          </div>
          <div className="tempcon">
          <button onClick={this.updaterules} ><img src={create}/></button>
          <button onClick={this.updateflag} ><img src={cancel}/></button>
          </div>
        </div>

        {/* <div className="Row">
          <div className="Column namebox">
            <div className="Row">Name</div>
            <div className="Row">
              <input
                type="text"
                className="choosename"
                placeholder="Choose name"
              />
            </div>
          </div>
          <div className="Column sourceinput-box">
            <div className="Row">Source</div>
            <form>
              <div className="radio">
                <label>
                  <input type="radio" value="option1" checked={true} />
                  Any
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="option2" />
                  Custom
                </label>
                <input
                  type="text"
                  className="Row ipinput"
                  placeholder="Type IP Address"
                />
              </div>
            </form>
          </div>
          <div className="Column expiration-box">
            <div className="Row expirationtext">Expiration</div>
            <div className="Row dateinput"><input type="text/date" placeholder="Select Date..."/></div>
          </div>
        </div> */}
        <div className="Row"></div>
      </div>
    );
  }
}
