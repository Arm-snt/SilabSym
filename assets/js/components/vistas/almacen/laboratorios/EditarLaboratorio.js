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

const EditarLaboratorio = ({ agregarLaboratorio }) => {
  //crear state de usuario
  const [laboratorio, cambiarLaboratorio] = useState({
    codigo: "",
    nombre: "",
    ubicacion: "",
    observacion: "",
    registro: "",
    elemento: ""
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
    ubicacion,
    observacion,
    registro,
    elemento
  } = laboratorio;

  //funcion para cuando el usuario envia la informacion
  const submitLaboratorio = e => {
    e.preventDefault();

    //Validar
    if (
      codigo === "" ||
      nombre === "" ||
      ubicacion === "" ||
      observacion === "" ||
      registro === "" ||
      elemento === ""
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
      ubicacion: "",
      observacion: "",
      registro: "",
      elemento: ""
    });
  };

  function historyBack() {
    window.history.back();
  }

  const element = [
    { state: "455895 - Resistencia 2k" },
    { state: "859565 - Computador Dell" },
    { state: "213654 - Impresora Epson" }
  ];

  return (
    <Fragment>
      <Paper style={style.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" style={style.link} href="/laboratorios">
                <HomeIcon style={style.homeIcon} />
                Laboratorios
              </Link>
              <Typography color="textPrimary">Editar Laboratorio</Typography>
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
                label="Código"
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="nombre"
                value={nombre}
                onChange={cambiarDato}
                fullWidth
                label="Nombre"
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="ubicacion"
                value={ubicacion}
                onChange={cambiarDato}
                fullWidth
                label="Ubicación"
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="observacion"
                value={observacion}
                onChange={cambiarDato}
                fullWidth
                multiline
                label="Observaciones"
              />
            </Grid>

            <Grid item md={6} xs={6}>
              <TextField
                name="registro"
                value={registro}
                onChange={cambiarDato}
                fullWidth
                label="Registrado Por"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={style.grid}>
            <Grid item md={12} xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={6} md={6}>
              <Autocomplete
                id="elemento"
                name="elemento"
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
                    elemento: valor
                  }));
                }}
                getOptionLabel={option => option.state}
                renderInput={params => (
                  <TextField {...params} label="Cargar elementos" />
                )}
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

EditarLaboratorio.propTypes = {
  agregarLaboratorio: PropTypes.func.isRequired
};
export default EditarLaboratorio;
