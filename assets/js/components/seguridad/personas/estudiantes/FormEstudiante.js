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

const style = {
	container: {
		padding: '20px'
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

function FormEstudiante() {
	const context = useContext(TodoContext);
	const [ addTodoCodigo, setAddTodoCodigo ] = useState('');
	const [ addTodoNombre, setAddTodoNombre ] = useState('');
	const [ addTodo, setAddTodo ] = useState('');

	const onCreateSubmit = (event) => {
		event.preventDefault();
		context.createTodo(event, {
			codigo: addTodoCodigo,
			nombre: addTodoNombre,
			programa: addTodo
		});
		setAddTodoCodigo('');
		setAddTodoNombre('');
		setAddTodo('');
	};

	function historyBack() {
		window.history.back();
	}

	const programas = [
		{ state: 'Ingeniería Civil' },
		{ state: 'Ingeniería Mecánica' },
		{ state: 'Ingeniería de Sistemas' }
	];

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addTodoCodigo}
								onChange={(event) => {
									setAddTodoCodigo(event.target.value);
								}}
								label="Código"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addTodoNombre}
								onChange={(event) => {
									setAddTodoNombre(event.target.value);
								}}
								label="Nombre"
								fullWidth={true}
							/>
						</Grid>

						<Grid item md={4} xs={6}>
							<Autocomplete
								id="combo-box-demo"
								options={programas}
								onChange={(e, a) => {
									setAddTodo(a !== null ? a.state : '');
								}}
								getOptionLabel={(option) => option.state}
								renderInput={(params) => <TextField {...params} label="Programa" />}
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
export default FormEstudiante;
