import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import AppNavBar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import Grid from '@material-ui/core/Grid';
//import UpdateEstudiante from './components/seguridad/personas/estudiantes/UpdateEstudiante';
import PerfilUsuario from './components/seguridad/usuarios/PerfilUsuario';
//import Usuarios from './components/seguridad/usuarios/Usuarios';
//import Usuario from './components/seguridad/usuarios/Usuario';
//import UsuarioEditar from './components/seguridad/usuarios/UsuarioEditar';
//import RegistrarUsuario from "./components/seguridad/usuarios/RegistrarUsuario";
import Login from './components/seguridad/Login';
//import NuevoElemento from './components/vistas/almacen/elementos/NuevoElemento';
//import EditarElemento from './components/vistas/almacen/elementos/EditarElemento';
//import Elementos from './components/vistas/almacen/elementos/Elementos';
import Mantenimientos from './components/vistas/bitacora/mantenimientos/Mantenimientos';
import NuevoMantenimiento from './components/vistas/bitacora/mantenimientos/NuevoMantenimiento';
//import EditarMantenimiento from "./components/vistas/bitacora/mantenimientos/EditarMantenimiento";
//import Trabajos from "./components/vistas/bitacora/trabajos/Trabajos";
//import Trabajo from './components/vistas/bitacora/trabajos/Trabajo';
import Contexts from './components/contexts/Contexts';
import TabPanel from './components/vistas/bitacora/prestamos/TabPanel';
import TabEstudiante from './components/seguridad/personas/estudiantes/TabEstudiante';
import TabUsuario from './components/seguridad/usuarios/TabUsuario';
import TabElemento from './components/vistas/almacen/elementos/TabElemento';
import TabLaboratorio from './components/vistas/almacen/laboratorios/TabLaboratorio';
import TabTrabajo from './components/vistas/bitacora/trabajos/TabTrabajo';

function App(props) {
	return (
		<Router>
			<MuiThemeProvider theme={theme}>
				<AppNavBar />
				<Grid container>
					<Switch>
						<Route path="/mensajes" exact component={Contexts} />
						<Route path="/elementos" exact component={TabElemento} />
						<Route path="/Prestamos" exact component={TabPanel} />
						<Route path="/auth/login" exact component={Login} />
						<Route path="/auth/perfil" exact component={PerfilUsuario} />
						<Route path="/usuarios" exact component={TabUsuario} />
						<Route path="/Estudiantes" exact component={TabEstudiante} />
						<Route path="/laboratorios" exact component={TabLaboratorio} />
						<Route path="/mantenimientos" exact component={Mantenimientos} />
						<Route path="/mantenimiento/nuevo" exact component={NuevoMantenimiento} />
						<Route path="/trabajos" exact component={TabTrabajo} />
					</Switch>
				</Grid>
			</MuiThemeProvider>
		</Router>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
