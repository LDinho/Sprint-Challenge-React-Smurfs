import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

const HeaderOne = styled.h1`
  color: steelblue;
  text-align: center;
  margin-bottom: 42px;
`;

const NavBar = styled.nav`
  background-color: lightblue;
  margin-bottom: 20px;
  padding: 2%;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 26px;
  color: white;
  
  &:hover {
   // text-decoration: underline;
   color: steelblue;
   // font-size: 26px;
  }
`;

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
        <NavBar>
          <HeaderOne>My Favorite Smurfs</HeaderOne>
          <NavLinkWrapper>
            <StyledNavLink exact to="/" activeStyle={{
              fontWeight: "bold",
              color: "steelblue"
            }}>Smurf Home</StyledNavLink>
            <StyledNavLink to="/smurf-form" activeStyle={{
              fontWeight: "bold",
              color: "steelblue"
            }}>Add a Smurf</StyledNavLink>
          </NavLinkWrapper>
        </NavBar>

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

        <Route path='/smurfs/:id' render={(props) => {

          const smurfSelected = this.state.smurfs.find((smurf) => {
            return smurf.id === Number(props.match.params.id);
          });

          if (!smurfSelected) {
            return <div>Loading...</div>
          }

          return (
            <Smurf id={smurfSelected.id}
                   name={smurfSelected.name}
                   age={smurfSelected.age}
                   height={smurfSelected.height}
            />
          )
        }}/>
      </div>
    );
  }
}

export default App;

/*
Notes on preventing 'id not found error' if page is refreshed on the single smurf view:

const smurfSelected = this.state.smurfs.find((smurf) => {
            return smurf.id === Number(props.match.params.id);

          }) || {}   //Option A- setting a default


 return ( // Option B-
            <Smurf id={smurfSelected && smurfSelected.id}
                   name={smurfSelected && smurfSelected.name}
                   age={smurfSelected && smurfSelected.age}
                   height={smurfSelected && smurfSelected.height}
            />
          )
 */
