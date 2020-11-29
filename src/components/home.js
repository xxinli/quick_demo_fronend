import React, { Component } from 'react';
import { request } from '../services/request';
import '../App.css';
import Search from "./search/search";
 
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Backend is not connected'
        };
    }
  
    componentDidMount() {
      request('home')
      .then(res => this.setState({ text: res.description }))
      .catch(err => console.log(err));
    }
  
    render() {
        return (
            <div>
                <h1 className="header">{this.state.text}</h1>
            <div>
				<Search/>
			</div>
            </div>
            
        );
    }
    
  }
  