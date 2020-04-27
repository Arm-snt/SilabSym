import React, { Component } from "react";
import { createContext } from "react";
import axios from "axios";

export const TodoContext = createContext();

class TodoContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.readTodo();
  }

  //read
  readTodo() {
    axios
      .get("api/trabajo/read")
      .then((response) => {
        this.setState({
          todos: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //create
  createTodo(event, todo) {
    event.preventDefault();
    axios
      .post("api/trabajo/create", todo)
      .then((response) => {
        console.log(response.data);
        let data = [...this.state.todos];
        data.push(response.data.todo);
        this.setState({
          todos: data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //update
  updateTodo(data) {
    axios
      .put("api/trabajo/update/" + data.id, data)
      .then((response) => {
        let todos = [...this.state.todos];
        let todo = todos.find((todo) => {
          return todo.id === data.id;
        });

        todo.nombre = response.data.todo.nombre;
        todo.registro = response.data.todo.registro;
        todo.descripcion = response.data.todo.descripcion;

        this.setState({
          todos: todos,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //delete
  deleteTodo(data) {
    axios
      .delete("api/trabajo/delete/" + data.id)
      .then((response) => {
        //message
        let todos = [...this.state.todos];
        let todo = todos.find((todo) => {
          return todo.id === data.id;
        });

        todos.splice(todos.indexOf(todo), 1);

        this.setState({
          todos: todos,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <TodoContext.Provider
        value={{
          ...this.state,
          createTodo: this.createTodo.bind(this),
          updateTodo: this.updateTodo.bind(this),
          deleteTodo: this.deleteTodo.bind(this),
        }}
      >
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}

export default TodoContextProvider;
