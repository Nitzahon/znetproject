import React, { Component } from 'react'
import del from "./art/del.svg"
export default class Post extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          index: props.index
        };
      }
      delete=()=>{
        this.props.delete(this.state.index);
      };
    render() {
        return (
            <div className="protoitem Row" >
                <div className="protoitemtext Column">{this.props.title}</div>
                <img src={del} onClick={this.delete} className="delbutton Column" alt="Remove Protocol"/>
            </div>
        )
    }
}
