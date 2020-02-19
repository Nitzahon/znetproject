import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import bg from './background.svg';
export default class App extends Component {
  state={
    rules:[],
    flag:false
  }
  
  render() {
    return (
      <div>

   
        <div className="bg">
        <div className="header"></div>
        <img className="Group" src={bg}/>
        </div>
      </div>
    )
  }
}


