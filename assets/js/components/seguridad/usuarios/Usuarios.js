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

function Usuarios() {
  const context = useContext(TodoContext);
  const [editarVisible, setEditarVisible] = useState(false);
  const [editarCodusuario,setEditarCodusuario] = useState(false);
  const [editarUsuario,setEditarUsuario] = useState(false);
  const [editarNombre,setEditarNombre] = useState(false);
  const [editarApellido,setEditarApellido] = useState(false);
  const [editarCorreo,setEditarCorreo] = useState(false);
  const [editarPassword,setEditarPassword] = useState(false);
  const [editarTelefono,setEditarTelefono] = useState(false);
  const [editarTipousuario,setEditarTipousuario] = useState(false);
  const [editarEstado, setEditarEstado] = useState("");
  const [eliminarVisible, setEliminarVisible] = useState(false);
  const [todoEliminar, setTodoEliminar] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const onEditSubmit = (todoId, event) => {
    event.preventDefault();
    context.updateTodo({
      id: todoId,
      codusuario: editarCodusuario,
      usuario: editarUsuario,
      nombre: editarNombre,
      apellido: editarApellido,
      correo: editarCorreo,
      password: editarPassword,
      telefono: editarTelefono,
      tipousuario: editarTipousuario,
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
  const tipousuario = [{tuser:"Administrador"},{tuser:"Laboratorista"},{tuser:"Beca-Trabajo"}];
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
                    <TableCell style={style.tableCell} align="center">Codigo Usuario</TableCell>
                    <TableCell style={style.tableCell} align="center">Usuario</TableCell>
                    <TableCell style={style.tableCell} align="center">Nombre</TableCell>
                    <TableCell style={style.tableCell} align="center">Correo</TableCell>
                    <TableCell style={style.tableCell} align="center">Estado</TableCell>
                    <TableCell style={style.tableCell} align="center">Telefono</TableCell>
                    <TableCell style={style.tableCell} align="center">Tipo de Usuario</TableCell>
                    <TableCell style={style.tableCell} align="center">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {context.todos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .reverse()
                  .map((todo, index) => (
                    <TableRow key={"todo " + index}>
                      {/* Codigo usuario */}
                      <TableCell align="left">
                      {editarVisible === todo.id ? (
                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                          <TextField 
                          type="text"
                          fullWidth={true}
                          autoFocus={true}
                          value={editarCodusuario}
                          onChange={(event) => {
                            setEditarCodusuario(event.target.value);
                          }}/>                          
                        </form>                      
                      ) : (
                        <Typography>{todo.codusuario}</Typography>
                      )}                    
                    </TableCell>
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                          <TextField 
                          type="text"
                          fullWidth={true}
                          autoFocus={true}
                          value={editarUsuario}
                          onChange={(event) => {
                            setEditarUsuario(event.target.value);
                          }}/>                          
                        </form>                      
                      ) : (
                        <Typography>{todo.usuario}</Typography>
                      )}                    
                    </TableCell>
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                          <TextField 
                          type="text"
                          fullWidth={true}
                          autoFocus={true}
                          value={editarNombre}
                          onChange={(event) => {
                            setEditarNombre(event.target.value);
                          }}/>                          
                        </form>                      
                      ) : (
                        <Typography>{todo.nombre+" "+todo.apellido}</Typography>
                      )}                    
                    </TableCell>
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                          <TextField 
                          type="text"
                          fullWidth={true}
                          autoFocus={true}
                          value={editarCorreo}
                          onChange={(event) => {
                            setEditarCorreo(event.target.value);
                          }}/>                          
                        </form>                      
                      ) : (
                        <Typography>{todo.correo}</Typography>
                      )}                    
                    </TableCell>
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                          <TextField 
                          type="text"
                          fullWidth={true}
                          autoFocus={true}
                          value={editarTelefono}
                          onChange={(event) => {
                            setEditarTelefono(event.target.value);
                          }}/>                          
                        </form>                      
                      ) : (
                        <Typography>{todo.telefono}</Typography>
                      )}                    
                    </TableCell>
                    <TableCell align="left">
                      {editarVisible === todo.id ? (
                          <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                            <Autocomplete                              
                              options={tipousuario}
                              onChange={(e, a) => {
                                setEditarTipousuario(a !== null ? a.tuser : "");
                              }}
                              getOptionLabel={(option) => option.tuser}
                              renderInput={(params) => (
                                <TextField {...params} label="Tipo Usuario" />
                              )}
                            />
                          </form>
                        ) : (
                          <Typography style={{ whiteSpace: "pre-wrap" }}>
                            {todo.tipousuario}
                          </Typography>
                        )}
                      </TableCell>
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
                                  setEditarCodusuario(todo.codusuario);
                                  setEditarUsuario(todo.usuario);
                                  setEditarNombre(todo.nombre);
                                  setEditarCorreo(todo.correo);
                                  setEditarTelefono(todo.telefono);
                                  setEditarTipousuario(todo.tipousuario);
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

  export default Usuarios;

