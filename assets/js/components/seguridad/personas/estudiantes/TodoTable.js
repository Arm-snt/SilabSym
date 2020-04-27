import React, { useContext, useState, Fragment } from "react";
import { Table, TableHead,TableRow, TableCell, TableBody, TableContainer,TablePagination } from "@material-ui/core";
import {Container,Paper,Typography,TextField,IconButton,} from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiCircleEditOutline,} from "@mdi/js";
import { Autocomplete } from "@material-ui/lab";
import { CancelRounded } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { TodoContext } from "./TodoContext";
import DeleteDialog from "./DeleteDialog";

const style = {
  table: {
    minWidth: 650,
    paddingTop: "40px",
  },
  container: {
    paddingTop: "20px",
  },
  paper: {
    marginTop: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  link: {
    display: "flex",
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: "4px",
  },
  form: {
    width: "100%",
  },
  submit: {
    marginTop: 20,
    marginBottom: 20,
  },
  space: {
    paddingTop: "20px",
  },
  divider: {
    marginBottom: 20,
  },
  search: {
    width: 400,
    marginBottom: 20,
  },
  error: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHead: {
    color: "#ffffff",
    backgroundColor: "#E2001A",
  },
  tableCell: {
    color: "#ffffff",
  },
};

function TodoTable() {
  const context = useContext(TodoContext);
  const [editIsShown, setEditIsShown] = useState(false);
  const [editTodoCodigo, setEditTodoCodigo] = useState("");
  const [editTodoNombre, setEditTodoNombre] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
  const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const onEditSubmit = (todoId, event) => {
    event.preventDefault();
    context.updateTodo({
      id: todoId,
      codigo: editTodoCodigo,
      nombre: editTodoNombre,
      programa: editTodo,
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

  const programas = [
    { state: "Ingeniería Civil" },
    { state: "Ingeniería Mecánica" },
    { state: "Ingeniería de Sistemas" },
  ];
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, context.todos.length - page * rowsPerPage);

  return (
    <Fragment>
      <Container
        style={style.container}
        component="main"
        maxWidth="lg"
        justify="center">
        <TableContainer component={Paper}>
            <Table style={style.table} aria-label="customized table">
              {/*HEAD*/}
              <TableHead style={style.tableHead}>
                <TableRow>
                  <TableCell style={style.tableCell} align="center">
                    Código
                  </TableCell>
                  <TableCell style={style.tableCell} align="center">
                    Nombre
                  </TableCell>
                  <TableCell style={style.tableCell} align="center">
                    Programa
                  </TableCell>
                  <TableCell style={style.tableCell} align="center">
                    Opciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {context.todos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .reverse()
                  .map((todo, index) => (
                    <TableRow key={"todo " + index}>
                      {/*NAME*/}
                      <TableCell align="center">
                        {editIsShown === todo.
                        id ? (
                          <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                            <TextField
                              type="text"
                              fullWidth={true}
                              autoFocus={true}
                              value={editTodoCodigo}
                              onChange={(event) => {
                                setEditTodoCodigo(event.target.value);
                              }}
                            />
                          </form>
                        ) : (
                          <Typography>{todo.codigo}</Typography>
                        )}
                      </TableCell>

                      {/*NOMBRE*/}
                      <TableCell align="center">
                        {editIsShown === todo.id ? (
                          <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                            <TextField
                              type="text"
                              fullWidth={true}
                              value={editTodoNombre}
                              onChange={(event) =>
                                setEditTodoNombre(event.target.value)
                              }
                            />
                          </form>
                        ) : (
                          <Typography style={{ whiteSpace: "pre-wrap" }}>
                            {todo.nombre}
                          </Typography>
                        )}
                      </TableCell>

                      {/*PROGRAMA*/}
                      <TableCell align="center">
                        {editIsShown === todo.id ? (
                          <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                            <Autocomplete
                              fullWidth={true}
                              options={programas}
                              onChange={(e, a) => {
                                setEditTodo(a !== null ? a.state : "");
                              }}
                              getOptionLabel={(option) => option.state}
                              renderInput={(params) => (
                                <TextField {...params} label="Programa" />
                              )}
                            />
                          </form>
                        ) : (
                          <Typography style={{ whiteSpace: "pre-wrap" }}>
                            {todo.programa}
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell align="right">
                        {editIsShown === todo.id ? (
                          <Fragment>
                            <IconButton
                              onClick={onEditSubmit.bind(this, todo.id)}
                            >
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
                                  setEditTodoCodigo(todo.codigo);
                                  setEditTodoNombre(todo.nombre);
                                  setEditTodo(todo.programa);
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={context.todos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}/>
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

export default TodoTable;
