import React from 'react';
import styled from 'styled-components';

const SmurfCard = styled.li`
  border: 1px solid lightblue;
  margin-bottom: 30px;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  
  img {
    margin-top: 10px;
    max-width: 100%;
  }
`;

const Button = styled.button`
  cursor: pointer;
  margin-bottom: 12px;
`;

const Smurf = props => {
  return (
    <SmurfCard>
      <CardContent>
        <img src="https://prazdniksharov96.ru/image/cache/data/foto/folga/Smurfik-190x190.jpg" alt="smurf"/>
        <div>
          <h3>{props.name}</h3>
          <strong>{props.height} tall</strong>
          <p>{props.age} smurf years old</p>
        </div>
      </CardContent>

      <Button onClick={() => {props.deleteSmurf(props.id)}}>
        Delete
      </Button>
    </SmurfCard>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

