import React, { useState, Fragment } from "react";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Avatar,
  IconButton,
  Collapse,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Alert, Autocomplete } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";

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
    marginTop: 30,
    marginBottom: 20
  },
  avatar: {
    margin: 25,
    backgroundColor: "#e53935"
  },
  error: {
    marginTop: 20,
    marginBottom: 20
  }
};

const NuevoElemento = props => {
  //crear state de usuario
  const [perfil, cambiarPerfil] = useState({
    codigo: "",
    nombre: "",
    stock: "",
    horas_uso: "",
    estado: "",
    categoria: "",
    tiempo_prestamo: "",
    sancion: "",
    multa: ""
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
    stock,
    horas_uso,
    estado,
    categoria,
    tiempo_prestamo,
    sancion,
    multa
  } = perfil;

  //funcion para cuando el usuario envia la informacion
  const submitPerfil = e => {
    e.preventDefault();
    if (
      codigo === "" ||
      nombre === "" ||
      stock === "" ||
      horas_uso === "" ||
      estado === "" ||
      categoria === "" ||
      tiempo_prestamo === "" ||
      sancion === "" ||
      multa === ""
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
      stock: "",
      horas_uso: "",
      estado: "",
      categoria: "",
      tiempo_prestamo: "",
      sancion: "",
      multa: ""
    });
  };

  const estadoele = [{ state: "Activo" }, { state: "Inactivo" }];
  const detalles = [{ state: "A" }, { state: "B" }, { state: "C" }];
  const detalles1 = [
    { state: "2 Horas" },
    { state: "4 Horas" },
    { state: "1 Semana" }
  ];
  const detalles2 = [
    { state: "$1000" },
    { state: "$2000" },
    { state: "$5000" }
  ];
  const detalles3 = [
    { state: "1 Día" },
    { state: "1 Mes" },
    { state: "1 Semestre" }
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
                <Link color="inherit" style={style.link} href="/elementos">
                  <HomeIcon style={style.homeIcon} />
                  Elementos
                </Link>
                <Typography color="textPrimary">Actualizar Elemento</Typography>
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
              <Grid item xs={6} md={4}>
                <TextField
                  name="codigo"
                  label="Código del elemento"
                  fullWidth
                  value={codigo}
                  onChange={cambiarDato}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  name="nombre"
                  label="Nombre del elemento"
                  fullWidth
                  value={nombre}
                  onChange={cambiarDato}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  name="stock"
                  label="Stock"
                  fullWidth
                  value={stock}
                  onChange={cambiarDato}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  name="horas_uso"
                  label="Horas de uso"
                  fullWidth
                  value={horas_uso}
                  onChange={cambiarDato}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  name="estado"
                  options={estadoele}
                  onChange={(event, value) => {
                    let valor;
                    if (value !== null) {
                      valor = value.state;
                    } else {
                      valor = "";
                    }
                    cambiarPerfil(prev => ({
                      ...prev,
                      estado: valor
                    }));
                  }}
                  getOptionLabel={option => option.state}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name="estado"
                      label="Seleccione un estado"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  name="categoria"
                  options={detalles}
                  onChange={(event, value) => {
                    let valor;
                    if (value !== null) {
                      valor = value.state;
                    } else {
                      valor = "";
                    }
                    cambiarPerfil(prev => ({
                      ...prev,
                      categoria: valor
                    }));
                  }}
                  getOptionLabel={option => option.state}
                  renderInput={params => (
                    <TextField {...params} label="Seleccione categoria" />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  name="tiempo_prestamo"
                  options={detalles1}
                  onChange={(event, value) => {
                    let valor;
                    if (value !== null) {
                      valor = value.state;
                    } else {
                      valor = "";
                    }
                    cambiarPerfil(prev => ({
                      ...prev,
                      tiempo_prestamo: valor
                    }));
                  }}
                  getOptionLabel={option => option.state}
                  renderInput={params => (
                    <TextField {...params} label="Seleccione el tiempo" />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  name="sancion"
                  options={detalles2}
                  onChange={(event, value) => {
                    let valor;
                    if (value !== null) {
                      valor = value.state;
                    } else {
                      valor = "";
                    }
                    cambiarPerfil(prev => ({
                      ...prev,
                      sancion: valor
                    }));
                  }}
                  getOptionLabel={option => option.state}
                  renderInput={params => (
                    <TextField {...params} label="Seleccione la sanción" />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  name="multa"
                  options={detalles3}
                  onChange={(event, value) => {
                    let valor;
                    if (value !== null) {
                      valor = value.state;
                    } else {
                      valor = "";
                    }
                    cambiarPerfil(prev => ({
                      ...prev,
                      multa: valor
                    }));
                  }}
                  getOptionLabel={option => option.state}
                  renderInput={params => (
                    <TextField {...params} label="Seleccione la multa" />
                  )}
                />
              </Grid>

              <Grid container justify="center">
                <Grid item xs={3} md={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="medium"
                    color="primary"
                    style={style.submit}
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default NuevoElemento;
