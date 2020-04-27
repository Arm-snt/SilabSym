import React, { useState, Fragment } from "react";
import {
  Paper,
  Divider,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
  Collapse,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Alert, Autocomplete } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";
//import fotoUsuarioTemp from "../../../logo.svg";
//import ImageUploader from "react-images-upload";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

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
    width: "100%"
  },
  submit: {
    marginTop: 20,
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
    marginTop: 20,
    marginBottom: 20
  },
  grid: {
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: "5px"
  }
};

const NuevoUsuario = ({ agregarLaboratorio }) => {
  //crear state de usuario
  const [laboratorio, cambiarLaboratorio] = useState({
    codigo: "",
    nombre: "",
    apellidos: "",
    nickname: "",
    email: "",
    password: "",
    tipo: "",
    telefono: "",
    registro: "",
    laboratory: "",
    ubicacion: ""
  });

  //crear state de error
  const [error, actualizarError] = useState(false);

  //funcion para cuando el usuario escribe en los inputs
  const cambiarDato = e => {
    const { name, value } = e.target;
    cambiarLaboratorio(prev => ({
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
    registro,
    laboratory,
    ubicacion
  } = laboratorio;

  //funcion para cuando el usuario envia la informacion
  const submitLaboratorio = e => {
    e.preventDefault();

    //Validar
    if (
      codigo === "" ||
      nombre === "" ||
      apellidos === "" ||
      nickname === "" ||
      email === "" ||
      password === "" ||
      tipo === "" ||
      telefono === "" ||
      registro === "" ||
      laboratory === "" ||
      ubicacion === ""
    ) {
      actualizarError(true);
      return;
    }

    //Eliminar el msj previo
    actualizarError(false);

    //Asignar Id
    laboratorio.id = uuidv4();
    console.log(laboratorio);

    //Crear laboratorio
    agregarLaboratorio(laboratorio);

    //Reiniciar el form
    cambiarLaboratorio({
      codigo: "",
      nombre: "",
      apellidos: "",
      nickname: "",
      email: "",
      password: "",
      tipo: "",
      telefono: "",
      registro: "",
      laboratory: "",
      ubicacion: ""
    });
  };

  function historyBack() {
    window.history.back();
  }

  const element = [
    { state: "Administrador" },
    { state: "Laboratorista" },
    { state: "Beca-Trabajo" }
  ];

  const labs = [
    { state: "Robótica" },
    { state: "Fisica" },
    { state: "Química" }
  ];

  return (
    <Fragment>
      <Paper style={style.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" style={style.link} href="/usuarios">
                <HomeIcon style={style.homeIcon} />
                Usuarios
              </Link>
              <Typography color="textPrimary">Registrar Usuario</Typography>
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

        <form style={style.form} onSubmit={submitLaboratorio}>
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
                  cambiarLaboratorio(prev => ({
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
          </Grid>
          <Grid container spacing={2} style={style.grid}>
            <Grid item md={12} xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={6} md={4}>
              <Autocomplete
                id="laboratory"
                name="laboratory"
                options={labs}
                onChange={(event, value) => {
                  let valor;
                  if (value !== null) {
                    valor = value.state;
                  } else {
                    valor = "";
                  }
                  cambiarLaboratorio(prev => ({
                    ...prev,
                    laboratory: valor
                  }));
                }}
                getOptionLabel={option => option.state}
                renderInput={params => (
                  <TextField {...params} label="Seleccionar Laboratorio" />
                )}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                name="ubicacion"
                fullWidth
                label="Ubicación"
                value={ubicacion}
                onChange={cambiarDato}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="small"
                color="primary"
                style={style.submit}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="small"
                color="secondary"
                style={style.submit}
                onClick={historyBack}
              >
                Cancelar
              </Button>
            </Grid>

            <Grid item md={12} xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Fragment>
  );
};

NuevoUsuario.propTypes = {
  agregarLaboratorio: PropTypes.func.isRequired
};
export default NuevoUsuario;
