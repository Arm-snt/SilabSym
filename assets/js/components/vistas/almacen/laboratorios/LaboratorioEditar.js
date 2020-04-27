import React, { Fragment, useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Container,
  Paper,
  IconButton,
  Typography,
  Grid,
  Link,
  Button
} from "@material-ui/core";
import { CancelRounded } from "@material-ui/icons";
import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiEye, mdiCircleEditOutline } from "@mdi/js";
import EditarLaboratorio from "./EditarLaboratorio";

const style = {
  table: {
    minWidth: 650
  },
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
  space: {
    paddingTop: "20px"
  },
  divider: {
    marginBottom: 20
  },
  search: {
    width: 400,
    marginBottom: 20
  },
  tableHead: {
    color: "#ffffff",
    backgroundColor: "#E2001A"
  },
  tableCell: {
    color: "#ffffff"
  }
};

function LaboratorioEditar() {
  //Préstamos en local storage
  let laboratoriosIniciales = JSON.parse(localStorage.getItem("laboratoriose"));
  if (!laboratoriosIniciales) {
    laboratoriosIniciales = [];
  }

  // Arreglo de laboratorios
  const [laboratoriose, guardarLaboratorios] = useState(laboratoriosIniciales);

  //Realizar operaciones cuando el state cambia
  useEffect(() => {
    let laboratoriosIniciales = JSON.parse(
      localStorage.getItem("laboratoriose")
    );
    if (laboratoriosIniciales) {
      localStorage.setItem("laboratoriose", JSON.stringify(laboratoriose));
    } else {
      localStorage.setItem("laboratoriose", JSON.stringify([]));
    }
  }, [laboratoriose]);

  // Funcion que tome los laboratorios actuales y agregue los nuevos
  const agregarLaboratorio = laboratorio => {
    guardarLaboratorios([...laboratoriose, laboratorio]);
  };

  //Función que elimina un Laboratorio por id
  const eliminarLaboratorio = id => {
    const nuevosLaboratorios = laboratoriose.filter(
      laboratorio => laboratorio.id !== id
    );
    guardarLaboratorios(nuevosLaboratorios);
  };

  //Mensaje condicional
  const titulo =
    laboratoriose.length === 0
      ? "No hay laboratorios asignados"
      : "Administra tus laboratorios";

  return (
    <Fragment>
      <Container
        style={style.container}
        component="main"
        maxWidth="lg"
        justify="center"
      >
        <EditarLaboratorio agregarLaboratorio={agregarLaboratorio} />
        <Paper style={style.paper}>
          <Typography>{titulo} </Typography>
        </Paper>
        <TableContainer component={Paper} style={style.space}>
          <Table style={style.table} aria-label="customized table">
            <TableHead style={style.tableHead}>
              <TableRow>
                <TableCell style={style.tableCell} align="center">
                  Laboratorio
                </TableCell>
                <TableCell style={style.tableCell} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {laboratoriose.map(laboratorio => (
                <TableRow
                  key={laboratorio.id}
                  laboratorio={laboratorio}
                  eliminarLaboratorio={eliminarLaboratorio}
                >
                  <TableCell align="center">{laboratorio.elemento}</TableCell>

                  <TableCell align="center">
                    <IconButton>
                      <Link style={style.link} href="/laboratorio/detalles">
                        <Icon path={mdiEye} size={1} color="red" />
                      </Link>
                    </IconButton>
                    <IconButton>
                      <Icon path={mdiCircleEditOutline} size={1} color="red" />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => eliminarLaboratorio(laboratorio.id)}
                    >
                      <CancelRounded fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Container
          style={style.container}
          component="main"
          maxWidth="lg"
          justify="center"
        >
          <Grid container justify="center">
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
          </Grid>
        </Container>
      </Container>
    </Fragment>
  );
}

LaboratorioEditar.propTypes = {
  laboratorio: PropTypes.func.isRequired,
  eliminarLaboratorio: PropTypes.func.isRequired
};

export default LaboratorioEditar;
