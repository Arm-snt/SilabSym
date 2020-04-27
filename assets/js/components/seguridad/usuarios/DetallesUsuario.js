import React, { useState, Fragment } from "react";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
  Collapse,
  Typography,
  TextField
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Alert, Autocomplete } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";
//import fotoUsuarioTemp from "../../../../logo.svg";
//import ImageUploader from "react-images-upload";
//import { v4 as uuidv4 } from "uuid";

import TablaUsuario from "./TablaUsuario";

const style = {
  container: {
    paddingTop: "20px"
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5"
  },
  link: {
    display: "flex"
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: "4px"
  },
  form: {
    width: "100%",
    marginTop: 20
  },
  submit: {
    marginBottom: 20
  },
  foto: {
    height: "100px"
  },
  avatar: {
    margin: 25,
    backgroundColor: "#e53935"
  },
  error: {
    marginTop: 20
  }
};
const DetallesUsuario = props => {
  //crear state de usuario
  const [perfil, cambiarPerfil] = useState({
    codigo: "",
    nombre: "",
    apellidos: "",
    nickname: "",
    email: "",
    password: "",
    tipo: "",
    telefono: "",
    registro: ""
  });

  //crear state de error
  const [error, actualizarError] = useState(false);

  //funcion para cuando el usuario escribe en los inputs
  const cambiarDato = e => {
    const { name, value } = e.target;
    cambiarPerfil(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Extraer los valores de los inputs
  const {
    codigo,
    nombre,
    apellidos,
    nickname,
    email,
    password,
    tipo,
    telefono,
    registro
  } = perfil;

  //funcion para cuando el usuario envia la informacion
  const submitPerfil = e => {
    e.preventDefault();
    if (
      codigo === "" ||
      nombre === "" ||
      apellidos === "" ||
      nickname === "" ||
      email === "" ||
      password === "" ||
      tipo === "" ||
      telefono === "" ||
      registro === ""
    ) {
      actualizarError(true);
      return;
    }

    console.log(perfil);
    actualizarError(false);

    //Agregar Usuario o Actualizar

    //Reiniciar el form
    cambiarPerfil({
      codigo: "",
      nombre: "",
      apellidos: "",
      nickname: "",
      email: "",
      password: "",
      tipo: "",
      telefono: "",
      registro: ""
    });
  };

  const element = [
    { state: "Administrador" },
    { state: "Laboratorista" },
    { state: "Beca-Trabajo" }
  ];
  return (
    <Fragment>
      <Container
        style={style.container}
        component="main"
        maxWidth="lg"
        justify="center"
      >
        <Paper style={style.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" style={style.link} href="/usuarios">
                  <HomeIcon style={style.homeIcon} />
                  Usuarios
                </Link>
                <Typography color="textPrimary">Detalles Usuario</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>

          <Collapse in={error} style={style.error}>
            <Alert
              variant="filled"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  onClick={() => {
                    actualizarError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              ¡Tiene que llenar todos los campos!
            </Alert>
          </Collapse>

          <form style={style.form} onSubmit={submitPerfil}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={6}>
                <TextField
                  name="codigo"
                  value={codigo}
                  onChange={cambiarDato}
                  fullWidth
                  label="Ingrese su Código"
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  name="nickname"
                  value={nickname}
                  onChange={cambiarDato}
                  fullWidth
                  label="Ingrese su Nickname"
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  name="nombre"
                  value={nombre}
                  onChange={cambiarDato}
                  fullWidth
                  label="Ingrese su Nombre"
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  name="apellidos"
                  value={apellidos}
                  onChange={cambiarDato}
                  fullWidth
                  label="Ingrese sus apellidos"
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  name="email"
                  value={email}
                  onChange={cambiarDato}
                  fullWidth
                  label="Ingrese su e-mail"
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  type="password"
                  name="password"
                  value={password}
                  onChange={cambiarDato}
                  fullWidth
                  label="Ingrese su password"
                />
              </Grid>

              <Grid item md={4} xs={6}>
                <TextField
                  name="telefono"
                  fullWidth
                  label="Teléfono"
                  value={telefono}
                  onChange={cambiarDato}
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <TextField
                  name="registro"
                  fullWidth
                  label="Registrado por"
                  value={registro}
                  onChange={cambiarDato}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  name="tipo"
                  options={element}
                  onChange={(event, value) => {
                    let valor;
                    if (value !== null) {
                      valor = value.state;
                    } else {
                      valor = "";
                    }
                    cambiarPerfil(prev => ({
                      ...prev,
                      tipo: valor
                    }));
                  }}
                  getOptionLabel={option => option.state}
                  renderInput={params => (
                    <TextField {...params} label="Tipo de Usuario" />
                  )}
                />
              </Grid>

              <TablaUsuario />
            </Grid>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
};
export default DetallesUsuario;
