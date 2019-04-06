import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormWrapper = styled.div`
  
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  border: 1px solid lightblue;
  border-radius: 2px;
  margin: 80px;
  padding: 6%;
  
  input {
    background-color: white;
    border: 1px solid lightblue;
    border-radius: 4px;
    margin-bottom: 18px;
    padding: 2%;
    width: 50%;
    font-size: 20px;
  }
  
  input[name=name] {
    margin-top: 40px;
  }
  
  button {
    border: 1px solid lightblue;
    border-radius: 4px;
    background-color: lightblue;
    color: midnightblue;
    cursor: pointer;
    font-size: 18px;
    margin-top: 10px;
    padding: 8px;
    
    &:hover {
      background-color: white;
    }
  }
`;

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  addSmurf = event => {
    event.preventDefault();
    axios.post('http://localhost:3333/smurfs', this.state)
      .then((res) => {
        this.props.updateSmurfList(res.data);

        this.setState({
          name: '',
          age: '',
          height: '',
        });
      })
      .catch((error) => {
        console.error('Server Error', error);
      });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <FormWrapper>
        <Form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </Form>
      </FormWrapper>
    );
  }
}

export default SmurfForm;
