import React, { Component } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component{

    constructor(props) {
		super(props);
		this.state = {
			todos: [],
			message: {},
		};
		this.readTodo();
    }
    
    //Leer
	readTodo() {
		axios
			.get('api/usuario/read')
			.then((response) => {
				this.setState({
					todos: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
    }
    
    //Crear
    createTodo(event, todo) {
		event.preventDefault();
		axios.post('api/usuario/create', todo)
			 .then(response => {
					if(response.data.message.level === 'success'){
						let data = [ ...this.state.todos ];
						data.push(response.data.todo);
						this.setState({
							todos: data,
							message: response.data.message,
						});
					} else {
						this.setState({
							message: response.data.message,
						})
					 }
			})
			.catch((error) => {
				console.error(error);
			}); 
    }
    
    //Actualizar
    updateTodo(data) {
		axios
			.put('api/usuario/update/' + data.id, data)
			.then((response) => {
				if(response.data.message.level === 'success'){
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});
					todo.codusuario = response.data.todo.codusuario;
					todo.usuario = response.data.todo.usuario;
					todo.nombre = response.data.todo.nombre;
					todo.apellido = response.data.todo.apellido;
					todo.correo = response.data.todo.correo;
					todo.password = response.data.todo.password;
					todo.telefono = response.data.todo.telefono;
					todo.tipousuario = response.data.todo.tipousuario;
					todo.estado = response.data.todo.estado;
	
					this.setState({
						todos: todos,
						message: response.data.message,
					});
				} else { 
					this.setState({
						message: response.data.message,
					})
				}

			})
			.catch((error) => {
				console.error(error);
			});
    }
    
    //Eliminar
    deleteTodo(data) {
		axios
			.delete('api/usuario/delete/' + data.id)
			.then((response) => {
				if(response.data.message.level === 'success'){
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});
	
					todos.splice(todos.indexOf(todo), 1);
	
					this.setState({
						todos: todos,
						message: response.data.message,
					});
				} else { 
					this.setState({
						message: response.data.message,
					})
				}

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
					setMessage: (message)=>this.setState({message:message}),
				}}
			>
				{this.props.children}
			</TodoContext.Provider>
		);
	}
}

export default TodoContextProvider;