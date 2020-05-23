import React, { useContext, useState, Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from '@material-ui/core';
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
import Icon from '@mdi/react';
import { mdiCircleEditOutline } from '@mdi/js';
import { CancelRounded } from '@material-ui/icons';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { TodoContext } from './TodoContext';
import DeleteDialog from './DeleteDialog';

const style = {
	table: {
		minWidth: 650,
		paddingTop: '40px'
	},
	container: {
		paddingTop: '20px'
	},
	paper: {
		marginTop: 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	},
	link: {
		display: 'flex'
	},
	homeIcon: {
		width: 20,
		height: 20,
		marginRight: '4px'
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
	},
	divider: {
		marginBottom: 20
	},
	search: {
		width: 400,
		marginBottom: 20
	},
	error: {
		marginTop: 20,
		marginBottom: 20
	},
	tableHead: {
		color: '#ffffff',
		backgroundColor: '#E2001A'
	},
	tableCell: {
		color: '#ffffff'
	}
};

function Laboratorios() {
	const context = useContext(TodoContext);
	const [ editIsShown, setEditIsShown ] = useState(false);
	const [ editUsuario, seteditUsuario ] = useState('');
	const [ editCodigo, seteditCodigo ] = useState('');
	const [ editNombre, seteditNombre ] = useState('');
	const [ editUbicacion, seteditUbicacion ] = useState('');
	const [ editObservacion, seteditObservacion ] = useState('');
	const [ deleteConfirmationIsShown, setDeleteConfirmationIsShown ] = useState(false);
	const [ todoToBeDeleted, setTodoToBeDeleted ] = useState(null);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const onEditSubmit = (todoId, event) => {
		event.preventDefault();
		context.updateTodo({
			id: todoId,
			usuario_id: editUsuario,
			codlaboratorio: editCodigo,
			nombre: editNombre,
			ubicacion: editUbicacion,
			observacion: editObservacion
		});
		setEditIsShown(false);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	function historyBack() {
		window.history.back();
	}
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, context.todos.length - page * rowsPerPage);

	return (
		<Fragment>
			<Container style={style.container} component="main" maxWidth="lg" justify="center">
				<TableContainer component={Paper}>
					<Table style={style.table} aria-label="customized table">
						{/*HEAD*/}
						<TableHead style={style.tableHead}>
							<TableRow>
								<TableCell style={style.tableCell} align="center">
									Laboratorista
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Laboratorio
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Código
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Ubicación
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Observación
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Opciones
								</TableCell>
							</TableRow>
						</TableHead>
						{/*BODY*/}
						<TableBody>
							{context.todos
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.reverse()
								.map((todo, index) => (
									<TableRow key={'todo ' + index}>
										{/*USUARIO*/}
										<TableCell align="center">
											{editIsShown === todo.id ? (
												<form onSubmit={onEditSubmit.bind(this, todo.id)}>
													<Autocomplete
														fullWidth={true}
														options={context.usu}
														onChange={(e, a) => {
															seteditUsuario(a !== null ? a.id : '');
														}}
														getOptionLabel={(option) =>
															option.codusuario + ' - ' + option.usuario}
														renderInput={(params) => (
															<TextField {...params} label="Laboratorista" />
														)}
													/>
												</form>
											) : (
												<Typography>{todo.codusuario + ' - ' + todo.usuario}</Typography>
											)}
										</TableCell>

										{/*NOMBRE*/}
										<TableCell align="center">
											{editIsShown === todo.id ? (
												<form onSubmit={onEditSubmit.bind(this, todo.id)}>
													<TextField
														type="text"
														fullWidth={true}
														value={editNombre}
														onChange={(event) => seteditNombre(event.target.value)}
													/>
												</form>
											) : (
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.nombre}
												</Typography>
											)}
										</TableCell>

										<TableCell align="center">
											{editIsShown === todo.id ? (
												<form onSubmit={onEditSubmit.bind(this, todo.id)}>
													<TextField
														type="text"
														fullWidth={true}
														autoFocus={true}
														value={editCodigo}
														onChange={(event) => {
															seteditCodigo(event.target.value);
														}}
													/>
												</form>
											) : (
												<Typography>{todo.codlaboratorio}</Typography>
											)}
										</TableCell>

										{/*UBICACIÓN*/}
										<TableCell align="center">
											{editIsShown === todo.id ? (
												<form onSubmit={onEditSubmit.bind(this, todo.id)}>
													<TextField
														type="text"
														fullWidth={true}
														value={editUbicacion}
														onChange={(event) => seteditUbicacion(event.target.value)}
													/>
												</form>
											) : (
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.ubicacion}
												</Typography>
											)}
										</TableCell>

										{/*OBSERVACIÓN*/}
										<TableCell align="center">
											{editIsShown === todo.id ? (
												<form onSubmit={onEditSubmit.bind(this, todo.id)}>
													<TextField
														type="text"
														fullWidth={true}
														value={editObservacion}
														onChange={(event) => seteditObservacion(event.target.value)}
													/>
												</form>
											) : (
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.observacion}
												</Typography>
											)}
										</TableCell>

										<TableCell align="right">
											{editIsShown === todo.id ? (
												<Fragment>
													<IconButton onClick={onEditSubmit.bind(this, todo.id)}>
														<DoneIcon />
													</IconButton>
													<IconButton onClick={() => setEditIsShown(false)}>
														<CloseIcon />
													</IconButton>
												</Fragment>
											) : (
												<Fragment>
													<IconButton>
														<Icon
															path={mdiCircleEditOutline}
															size={1}
															color="red"
															onClick={() => {
																setEditIsShown(todo.id);
																seteditUsuario(todo.usuario_id);
																seteditNombre(todo.nombre);
																seteditCodigo(todo.codlaboratorio);
																seteditUbicacion(todo.ubicacion);
																seteditObservacion(todo.observacion);
															}}
														/>
													</IconButton>
													<IconButton
														color="primary"
														aria-label="upload picture"
														component="span"
														onClick={() => {
															setDeleteConfirmationIsShown(true);
															setTodoToBeDeleted(todo);
														}}
													>
														<CancelRounded fontSize="inherit" />
													</IconButton>
												</Fragment>
											)}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={context.todos.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Container>
			{deleteConfirmationIsShown && (
				<DeleteDialog
					todo={todoToBeDeleted}
					open={deleteConfirmationIsShown}
					setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
				/>
			)}
		</Fragment>
	);
}

export default Laboratorios;
