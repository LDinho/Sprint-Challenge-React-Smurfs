import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then((res) => {
        console.log('RES.DATA:', res.data);
        this.setState({
          smurfs: res.data,
        })
      })
      .catch((error) => {
        console.error('Server Error', error);
      });
  }

  updateSmurfList = (smurfs) => {
    this.setState({
      smurfs,
    }, ()=> {console.log('NewSmurfList:', smurfs)})
  }

  deleteSmurf = (smurfId) => {
    axios.delete(`http://localhost:3333/smurfs/${smurfId}`)
      .then( (res) => {
        this.setState({
          smurfs: res.data,
        })
      })
      .catch((error) => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div className="App">
        <nav>
          <h1>My Favorite Smurfs</h1>
          <div>
            <NavLink exact to="/">Smurf Home</NavLink>
            <NavLink to="/smurf-form">Add a Smurf</NavLink>
          </div>
        </nav>

        <Route exact path='/' render={(props) => (
          <Smurfs {...props}
                  smurfs={this.state.smurfs}
                  deleteSmurf={this.deleteSmurf}
          />
        )}/>
        <Route path='/smurf-form' render={(props) => (
          <SmurfForm {...props}
                     updateSmurfList={this.updateSmurfList}
          />
        )}/>

      </div>
    );
  }
}

export default App;
