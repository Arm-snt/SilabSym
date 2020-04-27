import React from "react";
import ReactDOM from "react-dom";
import "../css/app.css";
import AppNavBar from "./components/layout/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import Grid from "@material-ui/core/Grid";
import UpdateEstudiante from "./components/seguridad/personas/estudiantes/UpdateEstudiante";
import PerfilUsuario from "./components/seguridad/usuarios/PerfilUsuario";
import Usuarios from "./components/seguridad/usuarios/Usuarios";
import Usuario from "./components/seguridad/usuarios/Usuario";
import DetallesUsuario from "./components/seguridad/usuarios/DetallesUsuario";
import UsuarioEditar from "./components/seguridad/usuarios/UsuarioEditar";
import Laboratorios from "./components/vistas/almacen/laboratorios/Laboratorios";
import Laboratorio from "./components/vistas/almacen/laboratorios/Laboratorio";
import DetallesLaboratorio from "./components/vistas/almacen/laboratorios/DetallesLaboratorio";
import LaboratorioEditar from "./components/vistas/almacen/laboratorios/LaboratorioEditar";
//import RegistrarUsuario from "./components/seguridad/usuarios/RegistrarUsuario";
import Login from "./components/seguridad/Login";
import NuevoElemento from "./components/vistas/almacen/elementos/NuevoElemento";
import EditarElemento from "./components/vistas/almacen/elementos/EditarElemento";
import Elementos from "./components/vistas/almacen/elementos/Elementos";
import Mantenimientos from "./components/vistas/bitacora/mantenimientos/Mantenimientos";
import NuevoMantenimiento from "./components/vistas/bitacora/mantenimientos/NuevoMantenimiento";
//import EditarMantenimiento from "./components/vistas/bitacora/mantenimientos/EditarMantenimiento";
//import Trabajos from "./components/vistas/bitacora/trabajos/Trabajos";
import NuevoTrabajo from "./components/vistas/bitacora/trabajos/NuevoTrabajo";
import Trabajo from "./components/vistas/bitacora/trabajos/Trabajo";
//import EditarTrabajo from "./components/vistas/bitacora/trabajos/EditarTrabajo";
//import countries from "./countries";
//import AutoCompleteText from "./AutoCompleteText";
//import Search from "../src/Search";
//import "../src/Search/style.css";
//import PersonList from "./components/PersonList";
//import PersonInput from "./components/PersonInput";
import TabPanel from "./components/vistas/bitacora/prestamos/TabPanel";
import TabEstudiante from "./components/seguridad/personas/estudiantes/TabEstudiante"
import Contexts from "./components/contexts/Contexts";

function App(props) {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppNavBar />
        <Grid container>
          <Switch>
            <Route path="/elementos" exact component={Elementos}></Route>
            <Route path="/mensajes" exact component={Contexts}></Route>
            <Route path="/elemento/nuevo" exact component={NuevoElemento} ></Route>
            <Route path="/elemento/editar" exact component={EditarElemento} ></Route>
            <Route path="/Prestamos" exact component={TabPanel}></Route> 
            <Route path="/auth/login" exact component={Login}></Route>
            <Route path="/auth/perfil" exact component={PerfilUsuario}></Route>
            <Route path="/usuarios" exact component={Usuarios}></Route>
            <Route path="/usuario/nuevo" exact component={Usuario}></Route>
            <Route path="/usuario/detalles" exact component={DetallesUsuario} ></Route>
            <Route path="/usuario/editar" exact component={UsuarioEditar} ></Route>
            <Route path="/Estudiantes" exact component={TabEstudiante}></Route>
            <Route path="/estudiante/update" exact component={UpdateEstudiante} ></Route>
            <Route path="/laboratorios" exact component={Laboratorios}></Route>
            <Route path="/laboratorio/nuevo" exact component={Laboratorio} ></Route>
            <Route path="/laboratorio/detalles" exact component={DetallesLaboratorio} ></Route>
            <Route path="/laboratorio/editar" exact component={LaboratorioEditar} ></Route>
            <Route path="/mantenimientos" exact component={Mantenimientos} ></Route>
            <Route path="/mantenimiento/nuevo" exact component={NuevoMantenimiento}></Route>
            <Route path="/trabajos" exact component={Trabajo}></Route>
            <Route path="/trabajo/nuevo" exact component={NuevoTrabajo}></Route>
            <Route path="/TabEstudiante" exact component={TabEstudiante}></Route>
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
