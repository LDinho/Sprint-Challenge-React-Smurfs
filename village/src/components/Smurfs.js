import React, { Component } from 'react';
import styled from 'styled-components';

import Smurf from './Smurf';

const HeaderOne = styled.h1`
  color: lightblue;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 50px;
`;

const UnOrderedList = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-inline-start: unset;
`;

class Smurfs extends Component {
  render() {
    const {deleteSmurf} = this.props;

    return (
      <div className="smurfs-list-wrapper">
        <HeaderOne>Smurf Village</HeaderOne>
        <UnOrderedList>
          {this.props.smurfs.map(smurf => {
            return (
              <Smurf
                name={smurf.name}
                id={smurf.id}
                age={smurf.age}
                height={smurf.height}
                deleteSmurf={deleteSmurf}
                key={smurf.id}
              />
            );
          })}
        </UnOrderedList>
      </div>
    );
  }
}

Smurf.defaultProps = {
 smurfs: [],
};

export default Smurfs;
