import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Grid, TextField } from "@material-ui/core";

export default class PersonInput extends Component {
  state = {
    name: ""
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = evento => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };
    axios
      .post("https://jsonplaceholder.typicode.com/users", { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          type="text"
          name="name"
          onChange={this.handleChange}
          label="Person Name"
        />
        <Button type="submit">Add</Button>
      </form>
    );
  }
}
