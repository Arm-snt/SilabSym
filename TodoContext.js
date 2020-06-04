import React, { Component } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			ele: [],
			usu: [],
			message: {}
		};
		this.readTodo();
		this.readElemento();
		this.readUsuario();
	}

	//read
	readTodo() {
		axios
			.get('api/laboratorio/read')
			.then((response) => {
				this.setState({
					todos: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//read
	readElemento() {
		axios
			.get('api/elemento/read')
			.then((response) => {
				this.setState({
					ele: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//read
	readUsuario() {
		axios
			.get('api/usuario/read')
			.then((response) => {
				this.setState({
					usu: response.data
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
			.post('api/laboratorio/create', todo)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let data = [ ...this.state.todos ];
					data.push(response.data.todo);
					this.setState({
						todos: data,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//update
	updateTodo(data) {
		axios
			.put('api/laboratorio/update/' + data.id, data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});
					todo.codlaboratorio = response.data.todo.codlaboratorio;
					todo.usuario_id = response.data.todo.usuario_id;
					todo.nombre = response.data.todo.nombre;
					todo.ubicacion = response.data.todo.ubicacion;
					todo.observacion = response.data.todo.observacion;

					this.setState({
						todos: todos,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	updateElemento(data) {

		data.codelemento.forEach(elemento => {
			let informacion = [elemento,data.id]
			axios
			.put('api/elemento/update/' + elemento, informacion)
			.then((response) => {
				if(response.data.message.level === 'success'){
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});
					todo.codelemento = response.data.todo.codelemento;
					todo.elemento = response.data.todo.elemento;
					todo.stock = response.data.todo.stock;
					todo.horauso = response.data.todo.horauso;
					todo.categoria = response.data.todo.categoria;
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
		});
    }

	//delete
	deleteTodo(data) {
		axios
			.delete('api/laboratorio/delete/' + data.id, data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});

					todos.splice(todos.indexOf(todo), 1);

					this.setState({
						todos: todos,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
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
					updateElemento: this.updateElemento.bind(this),
					deleteTodo: this.deleteTodo.bind(this),
					setMessage: (message) => this.setState({ message: message })
				}}
			>
				{this.props.children}
			</TodoContext.Provider>
		);
	}
}

export default TodoContextProvider;
