import React, { useContext, useState } from "react";
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, IconButton, Divider, Button,} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { TodoContext } from "./TodoContext";
import { v4 as uuidv4 } from "uuid";


const style = {
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
};

function NuevoUsuario(){
  const context = useContext(TodoContext);

  function historyBack() {
    window.history.back();
  }

  const estado = [{ state: "Activo" }, { state: "Inactivo" }];
  const tipousuario = [{tuser:"Administrador"},{tuser:"Laboratorista"},{tuser:"Beca-Trabajo"}];

  return (
    <Container>
      <Paper style={style.paper}>
        <form style={style.form} >
          <Grid container spacing={2}>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addCodusuario}
                label="Ingrese su Código"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addUsuario}
                label="Ingrese Usuario"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addNombre}
                label="Ingrese su Nombre"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addApellido}
                label="Ingrese su Apellido"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addCorreo}
                label="Ingrese su Correo"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="password"
                value={addPassword}
                label="Ingrese su Contraseña"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addTelefono}

                label="Ingrese su Telefono"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <Autocomplete
              id="combo-box-demo"
              options={tipousuario}
              getOptionLabel={(option) => option.tuser}
              renderInput={(params) => (
                <TextField {...params} label="Tipo de Usuario" />
                )}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <Autocomplete
              id="combo-box-demo"
              options={estado}
              getOptionLabel={(option) => option.state}
              renderInput={(params) => (
                <TextField {...params} label="Estado" />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={style.grid}>
            <Grid item xs={2} md={2}>
              <Button
              variant="contained"
              fullWidth
              size="medium"
              color="primary"
              style={style.submit}
              onClick={historyBack}>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default NuevoUsuario;
