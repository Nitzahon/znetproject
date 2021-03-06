import React, { Component } from "react";
import Post from "./Post";
export default class NewRule extends Component {
  constructor(props) {
    super(props);
    //TODO:add onChange function to each input
    this.state = {
      name: "",
      createdOn: "",
      mode: true,
      protocols: ["HTTP"],
      source: "",
      destination: "",
      expiration: "",
      favorite: false
      //,inputarget:""
    };
  }
  updaterules = () => {
      var tmp = this.state;

    if(tmp.name==="" || tmp.source===""|| tmp.destination===""|| tmp.expiration==="" || tmp.protocols.length===0){
        alert("One or more fields missing.");
        return;
    }
    else{
    tmp.createdOn=new Date();
    this.setState({      name: "",
    createdOn: "",
    mode: true,
    protocols: ["HTTP"],
    source: "",
    destination: "",
    expiration: "",
    favorite: false});
    this.props.updaterules(tmp);
    this.props.updateflag();
    }
  };
  updateflag = () => {
    this.props.updateflag();
  };
  updatename = e => {
    this.setState({ name: e.target.value });
  };
  deny = () => {
    if (this.state.mode === false) {
      return <div className="deny-selected">DENY</div>;
    } else {
      return <div className="deny-not">DENY</div>;
    }
  };
  allow = () => {
    if (this.state.mode === false) {
      return <div className="allow-not">ALLOW</div>;
    } else {
      return <div className="allow-selected">ALLOW</div>;
    }
  };
  delete = ind => {
    console.log("test2");
    this.setState({
      protocols: [
        ...this.state.protocols.filter((post, index) => {
          return index !== ind;
        })
      ]
    });
  };
  updateinputmodef = () => {
    this.setState({ mode: false });
  };
  updateinputmodet = () => {
    this.setState({ mode: true });
  };
  addprot = e => {
    var pro = e.target.value;
    if (this.state.protocols.indexOf(pro) === -1) {
      this.setState({ protocols: [...this.state.protocols, pro] });
    }
  };
  sourcechange = e => {
    var tar = e.target.value;
    if (tar === "ANY") {
      this.setState({ source: tar });
      document.getElementById("sourceinput").value = "";
    } else {
      this.setState({ source: "" });
    }
  };
  addipsource = e => {
    if (e.target.value === "ANY") {
      document.getElementById("sourceinput").value = "";
    }
    this.setState({ source: e.target.value });
  };
  deschange = e => {
    var tar = e.target.value;
    if (tar === "ANY") {
      this.setState({ destination: tar });
      document.getElementById("desinput").value = "";
    } else {
      this.setState({ destination: "" });

    }
  };
  addipdes = e => {
    if (e.target.value === "ANY") {
      document.getElementById("desinput").value = "";
    }
    this.setState({ destination: e.target.value });
  };
  // handleClick = e => {
  //   this.inputElement.click();
  // } //attempt to make calendar open onfocus
  _onFocus = e => {
    e.currentTarget.type = "date"; //change to date type
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var dd = tomorrow.getDate();
    var mm = tomorrow.getMonth() + 1; //January is 0!
    var yyyy = tomorrow.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    tomorrow = yyyy + "-" + mm + "-" + dd;
    e.currentTarget.min = tomorrow; //make it not normally possible to choose date in the past
    //this.handleClick(e);
  };

  _onBlur = e => {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Select date ...";
    let d1 = new Date();
    let d2 = new Date(e.target.value);
    if(d2<=d1){ //catch if date was changed to improper date in roundabout way
      e.target.value=""
      this.setState({ expiration: e.target.value });//remove stored date state if improper
      alert("Selected Date must be in the future");     
    }
  };
  expchange = e => {
    this.setState({ expiration: new Date(e.target.value) });

  };
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
                onChange={this.updatename}
              />
            </div>
          </div>
          <div className="modebox Row">
            <div className="Row modeboxtitle">Mode</div>
            <div className="Row modeboxbuttoncontainer">
              <div className="denybtn" onClick={this.updateinputmodef}>
                {this.deny()}
              </div>
              <div className="allowbtn" onClick={this.updateinputmodet}>
                {this.allow()}
              </div>
            </div>
          </div>
          <div className="newprotobox Row">
            <div className="Row newprototitle">Protocols</div>
            <div className="Row">
              <select
                id="protocol"
                className="newprotoselect"
                placeholder="Select Protocol"
                onChange={this.addprot}
              >
                <option value="" disabled selected hidden>
                  Select Protocol
                </option>
                <option value="HTTP">HTTP</option>
                <option value="SMTP">SMTP</option>
                <option value="ICMP">ICMP</option>
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
                <option value="FTP">FTP</option>
              </select>
            </div>
            <div className="protolist">
              {this.state.protocols.map((element, i) => {
                return <Post title={element} index={i} delete={this.delete} />;
              })}
            </div>
          </div>
        </div>
        <div className="Column column2">
          <div className="Row sourceinput-box">
            <div className="Row">Source</div>
            <form>
              <div className="radios">
              <label class="radio-container">Any
                  <input
                    type="radio"
                    value="ANY"
                    checked={this.state.source === "ANY"}
                    onChange={this.sourcechange}
                  />
                    <span class="selradio"></span>
                </label>
              </div>
              <div className="radios">
              <label class="radio-container">Custom
                  <input
                    type="radio"
                    value="Custom"
                    checked={this.state.source !== "ANY"}
                    onChange={this.sourcechange}
                  />
                  <span class="selradio"></span>
                </label>
                <input
                  type="text"
                  disabled={this.state.source === "ANY"}
                  className="Row ipinput"
                  id="sourceinput"
                  placeholder="Type IP Address"
                  onChange={this.addipsource}
                />
              </div>
            </form>
          </div>
          <div className="Row desinput-box">
            <div className="Row">Destination</div>
            <form>
              <div className="radios">
              <label class="radio-container">Any
                  <input
                    type="radio"
                    value="ANY"
                    checked={this.state.destination === "ANY"}
                    onChange={this.deschange}
                  />
                    <span class="selradio"></span>
                </label>
              </div>
              <div className="radios">
              <label class="radio-container">Custom
                  <input
                    type="radio"
                    value="Custom"
                    checked={this.state.destination !== "ANY"}
                    onChange={this.deschange}
                  />
                  <span class="selradio"></span>
                </label>
                <input
                  type="text"
                  disabled={this.state.destination === "ANY"}
                  className="Row ipinput"
                  id="desinput"
                  placeholder="Type IP Address"
                  onChange={this.addipdes}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="Column cloumn3">
          <div className="Row expiration-box">
            <div className="Row expirationtext">Expiration</div>
            <div className="Row" >
              <input
                class="dateinput"
                type="text"
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                onChange={this.expchange}
                placeholder="Select date..."
                //ref={input => this.inputElement = input}//attempt to make calendar open on focus

              />
            </div>
          </div>
        </div>
        <div className="Column column4">
          <div className="btnbox">
            <button className="createbtn" onClick={this.updaterules}><div className="crttxt">Create</div></button>
            <button className="cnclbtn" onClick={this.updateflag}><div className="cncltxt">Cancel</div></button>
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
         
        </div> */}
        <div className="Row"></div>
      </div>
    );
  }
}
