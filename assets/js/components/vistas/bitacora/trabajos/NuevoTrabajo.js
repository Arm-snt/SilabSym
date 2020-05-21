import React, { useContext, useState, Fragment } from 'react';
import {
	Container,
	Paper,
	Grid,
	Breadcrumbs,
	Link,
	Typography,
	TextField,
	IconButton,
	Divider,
	Button
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';
//Mantenimientosimport { v4 as uuidv4 } from "uuid";

const style = {
	container: {
		paddingTop: '20px'
	},
	paper: {
		marginTop: 15,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	},
	link: {
		display: 'flex'
	},
	form: {
		width: '100%'
	},
	submit: {
		marginTop: 20,
		marginBottom: 20
	},
	space: {
		paddingTop: '20px'
	}
};

function NuevoTrabajo() {
	const context = useContext(TodoContext);
	const [ addTodoRegistro, setAddTodoRegistro ] = useState('');
	const [ addTodoDescripcion, setAddTodoDescripcion ] = useState('');
	const [ addTodo, setAddTodo ] = useState('');

	const onCreateSubmit = (event) => {
		event.preventDefault();
		context.createTodo(event, {
			estudiante_id: addTodo,
			registro: addTodoRegistro,
			descripcion: addTodoDescripcion
		});
		setAddTodo('');
		setAddTodoRegistro('');
		setAddTodoDescripcion('');
	};

	const element = [ { state: '191158 - Aldemar' }, { state: '191161 - Armando' } ];

	function historyBack() {
		window.history.back();
	}

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addTodo}
								onChange={(event) => {
									setAddTodo(event.target.value);
								}}
								label="Estudiante"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addTodoRegistro}
								onChange={(event) => {
									setAddTodoRegistro(event.target.value);
								}}
								label="Registrado por"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addTodoDescripcion}
								onChange={(event) => {
									setAddTodoDescripcion(event.target.value);
								}}
								label="Descripción"
								fullWidth={true}
							/>
						</Grid>
						<Grid item xs={6} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
								color="primary"
								style={style.submit}
								onClick={onCreateSubmit}
							>
								Guardar
							</Button>
						</Grid>
						<Grid item xs={2} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
								color="secondary"
								style={style.submit}
								onClick={historyBack}
							>
								Cancelar
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
}
export default NuevoTrabajo;
