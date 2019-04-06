import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SmurfCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid lightblue;
  margin-bottom: 30px;
  list-style: none;
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

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #469cb8;
  margin-bottom: 10px;
  text-decoration: none;

`;

const Button = styled.button`
  border: 1px solid lightblue;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-bottom: 12px;
  padding: 2px;
  width: 80px;
  
  &:hover {
    color: lightcoral;
  }
`;

const Smurf = props => {
  const {id, name, age, height} = props;

  console.log("SMURF CARD:", props);
  return (
    <SmurfCard>
      <CardContent>
        <StyledLink to={`/smurfs/${id}`}>
          <img src="https://prazdniksharov96.ru/image/cache/data/foto/folga/Smurfik-190x190.jpg"
               alt="smurf"
          />
          <div>
            <h3>{name}</h3>
            <strong>{height} tall</strong>
            <p>{age} smurf years old</p>
          </div>
        </StyledLink>
      </CardContent>

      <Button onClick={() => {props.deleteSmurf(id)}}>
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

