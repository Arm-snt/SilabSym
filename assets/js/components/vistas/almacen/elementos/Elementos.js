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

function Elementos(){
  const context = useContext(TodoContext);
  const [editarVisible, setEditarVisible] = useState(false);
  const [editarCodElemento, setEditarCodElemento] = useState("");
  const [editarElemento, setEditarElemento] = useState("");
  const [editarStock, setEditarStock] = useState("");
  const [editarHoraUso, setEditarHoraUso] = useState("");
  const [editarCategoria, setEditarCategoria] = useState("");
  const [editarEstado, setEditarEstado] = useState("");
  const [eliminarVisible, setEliminarVisible] = useState(false);
  const [todoEliminar, setTodoEliminar] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const onEditSubmit = (todoId, event) => {
    event.preventDefault();
    context.updateTodo({
      id: todoId,
      codelemento: editarCodElemento,
      elemento: editarElemento,
      stock: editarStock,
      horauso: editarHoraUso,
      categoria: editarCategoria,
      estado: editarEstado,
    });
    setEditarVisible(false);
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

  const estado = [{ state: "Activo" }, { state: "Inactivo" }];
  const categoria = [{ state: "A" }, { state: "B" }, { state: "C" }];

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, context.todos.length - page * rowsPerPage);

  return (
    <Fragment>
      <Container
        style={style.container}
        component="main"
        maxWidth="lg"
        justify="center">
          <TableContainer component={Paper} style={style.space}>
            <Table style={style.table} aria-label="customized table">
              <TableHead style={style.tableHead}> 
                <TableRow>
                  <TableCell style={style.tableCell} align="center">Elemento</TableCell>
                  <TableCell style={style.tableCell} align="center">Imagen</TableCell>
                  <TableCell style={style.tableCell} align="center">Stock</TableCell>
                  <TableCell style={style.tableCell} align="center">Horas de Uso</TableCell>
                  <TableCell style={style.tableCell} align="center">Categoría</TableCell>
                  <TableCell style={style.tableCell} align="center">Estado</TableCell>
                  <TableCell style={style.tableCell} align="center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {context.todos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .reverse()
                  .map((todo, index) => (
                  <TableRow key={"todo " + index}>
                    {/*codigo elemento*/}
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                          <TextField 
                          type="text"
                          fullWidth={true}
                          autoFocus={true}
                          value={editarCodElemento}
                          onChange={(event) => {
                            setEditarCodElemento(event.target.value);
                          }}/>                          
                        </form>                      
                      ) : (
                        <Typography>{todo.codelemento}</Typography>
                      )}                    
                    </TableCell>
                    {/*nombre elemento*/}
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                          <TextField 
                          type="text"
                          fullWidth={true}
                          autoFocus={true}
                          value={editarElemento}
                          onChange={(event) => {
                            setEditarElemento(event.target.value);
                          }}/>                          
                        </form>                      
                      ) : (
                        <Typography>{todo.elemento}</Typography>
                      )}                    
                    </TableCell>
                    {/*stock elemento*/}
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                          <TextField 
                          type="text"
                          fullWidth={true}
                          autoFocus={true}
                          value={editarStock}
                          onChange={(event) => {
                            setEditarStock(event.target.value);
                          }}/>                          
                        </form>                      
                      ) : (
                        <Typography>{todo.stock}</Typography>
                      )}                    
                    </TableCell> 
                    {/*hora de uso*/}   
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                          <TextField 
                          type="text"
                          fullWidth={true}
                          autoFocus={true}
                          value={editarHoraUso}
                          onChange={(event) => {
                            setEditarHoraUso(event.target.value);
                          }}/>                          
                        </form>                      
                      ) : (
                        <Typography>{todo.horauso}</Typography>
                      )}                    
                    </TableCell>
                    {/* categoria */}
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                          <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                            <Autocomplete
                              
                              options={categoria}
                              onChange={(e, a) => {
                                setEditarCategoria(a !== null ? a.state : "");
                              }}
                              getOptionLabel={(option) => option.state}
                              renderInput={(params) => (
                                <TextField {...params} label="Categoria" />
                              )}
                            />
                          </form>
                        ) : (
                          <Typography style={{ whiteSpace: "pre-wrap" }}>
                            {todo.categoria}
                          </Typography>
                        )}
                      </TableCell>
                      {/* estado */}
                      <TableCell align="left">
                      {editarVisible === todo.id ? (
                          <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                            <Autocomplete
                              
                              options={estado}
                              onChange={(e, a) => {
                                setEditarEstado(a !== null ? a.state : "");
                              }}
                              getOptionLabel={(option) => option.state}
                              renderInput={(params) => (
                                <TextField {...params} label="Estado" />
                              )}
                            />
                          </form>
                        ) : (
                          <Typography style={{ whiteSpace: "pre-wrap" }}>
                            {todo.estado}
                          </Typography>
                        )}
                      </TableCell>
                      {/* opciones */}
                      <TableCell align="right">
                        {editarVisible === todo.id ? (
                          <Fragment>
                            <IconButton
                              onClick={onEditSubmit.bind(this, todo.id)}>
                              <DoneIcon />
                            </IconButton>
                            <IconButton onClick={() => setEditarVisible(false)}>
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
                                  setEditarVisible(todo.id);
                                  setEditarCodElemento(todo.codelemento);
                                  setEditarElemento(todo.elemento);
                                  setEditarStock(todo.stock);
                                  setEditarHoraUso(todo.horauso);
                                  setEditarCategoria(todo.categoria);
                                  setEditarEstado(todo.estado);
                                }}
                              />
                            </IconButton>
                            <IconButton 
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                setEliminarVisible(true);
                                setTodoEliminar(todo);
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
      {eliminarVisible && (
        <DeleteDialog
          todo={todoEliminar}
          open={eliminarVisible}
          setEliminarVisible={setEliminarVisible}
        />
      )}
    </Fragment>

  );

}

export default Elementos;





