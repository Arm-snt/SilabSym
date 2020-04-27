import React, { Component } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
  InputAdornment
} from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiEye, mdiCircleEditOutline, mdiCardSearch } from "@mdi/js";
import HomeIcon from "@material-ui/icons/Home";

const style = {
  table: {
    minWidth: 650,
    paddingTop: "40px"
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
  }
};

function createData(estudiante, programa, documento, estado, opciones) {
  return { estudiante, programa, documento, estado, opciones };
}

const rows = [
  createData(
    "191161 - Armando Santana",
    "Ing. Sistemas",
    "1065824141",
    "aasantanap@ufpso.edu.co",
    "3022551956",
    "Activo"
  ),
  createData(
    "191241 - Alejandra Machado",
    "Ing. Sistemas",
    "1091268456",
    "amachadol@ufpso.edu.co",
    "3122156195",
    "Activo"
  ),
  createData(
    "192031 - Wilmar Montes",
    "Ing. Sistemas",
    "1659824541",
    "wmontesm@ufpso.edu.co",
    "3042856694",
    "Activo"
  ),
  createData(
    "181220 - Carlos Sanchez",
    "Ing. Civil",
    "1365812425",
    "csanchezb@ufpso.edu.co",
    "31236585541",
    "Activo"
  ),
  createData(
    "131224 - Luisa Montes",
    "Ing. Mecanica",
    "1012784125",
    "lmontesm@ufpso.edu.co",
    "3156123252",
    "Desactivado"
  ),
  createData(
    "191158 - Aldemar Peñaranda",
    "Ing. Sistemas",
    "1565996441",
    "aasantanap@ufpso.edu.co",
    "3023651556",
    "Activo"
  ),
  createData(
    "181145 - Kelly Vega",
    "Ing. Civil",
    "122354141",
    "kvegam@ufpso.edu.co",
    "323251956",
    "Activo"
  ),
  createData(
    "191315 - Alfonso Pava",
    "Ing. Sistemas",
    "1095832841",
    "apavam@ufpso.edu.co",
    "3161238541",
    "Activo"
  )
];

function searchingFor(term) {
  return function(x) {
    return (
      x.estudiante.toLowerCase().includes(term.toLowerCase()) ||
      x.programa.toLowerCase().includes(term.toLowerCase()) ||
      x.documento.toLowerCase().includes(term.toLowerCase()) ||
      x.estado.toLowerCase().includes(term.toLowerCase()) ||
      !term
    );
  };
}

export default class Estudiantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: rows,
      term: ""
    };
    this.searchHandler = this.searchHandler.bind(this);
  }
  searchHandler(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    const { term, rows } = this.state;

    return (
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
                <Link color="inherit" style={style.link} href="">
                  <HomeIcon style={style.homeIcon} />
                  Estudiantes
                </Link>
                <Link
                  color="inherit"
                  style={style.link}
                  href="/estudiante/update"
                >
                  <Typography color="textPrimary">
                    Actualizar Estudiante
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Grid>
            <Grid item md={12} xs={12}>
              <Divider style={style.divider} />
            </Grid>
          </Grid>

          <div className="App">
            <form>
              <TextField
                fullWidth
                placeholder="Buscar..."
                onChange={this.searchHandler}
                value={term}
                style={style.search}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon path={mdiCardSearch} size={1.5} color="red" />
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </div>

          <TableContainer component={Paper} style={style.space}>
            <Table style={style.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Estudiante</TableCell>
                  <TableCell align="center">Programa</TableCell>
                  <TableCell align="center">Documento</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.filter(searchingFor(term)).map(person => (
                  <TableRow key={person.estudiante}>
                    <TableCell component="th" scope="row" align="left">
                      {person.estudiante}
                    </TableCell>
                    <TableCell align="center">{person.programa}</TableCell>
                    <TableCell align="center">{person.documento}</TableCell>
                    <TableCell align="center">{person.estado}</TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <Icon path={mdiEye} size={1} color="red" />
                      </IconButton>
                      <IconButton>
                        <Icon
                          path={mdiCircleEditOutline}
                          size={1}
                          color="red"
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    );
  }
}
