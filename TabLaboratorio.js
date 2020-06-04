import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, Paper } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import TodoContextProvider from './TodoContext';
import EstSnackBar from './EstSnackBar';
import Laboratorios from './Laboratorios';
import NuevoLaboratorio from './NuevoLaboratorio';
import EditarLaboratorio from './EditarLaboratorio';

function TabLaboratorio(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabLaboratorio.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	},
	container: {
		paddingTop: '20px'
	},
	paper: {
		marginTop: 8,
		display: 'flex',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	}
}));

export default function SimpleTabs(onchangeTab) {
	const classes = useStyles();
	const theme = useTheme();
	const [ value, setValue ] = React.useState(0);
	const [ data, setData ] = React.useState('');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const onChangeIndex = (index, data) => {
		setValue(index);
		setData(data);
	};
	return (
		<Fragment>
			<Container className={classes.container} component="main" maxWidth="lg" justify="center">
				<Paper className={classes.paper}>
					<div className={classes.root}>
						<Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
							<Tab label="Laboratorios" {...a11yProps(0)} />
							<Tab label="Nuevo Laboratorio" {...a11yProps(1)} />
							<Tab label="Editar Laboratorio" {...a11yProps(2)} disabled />
						</Tabs>
						<SwipeableViews
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={value}
							onChangeIndex={onChangeIndex}
						>
							<TabLaboratorio value={value} index={0}>
								<TodoContextProvider>
									<Laboratorios onChangeIndex={onChangeIndex} />
									<EstSnackBar />
								</TodoContextProvider>
							</TabLaboratorio>
							<TabLaboratorio value={value} index={1}>
								<TodoContextProvider>
									<NuevoLaboratorio />
									<EstSnackBar />
								</TodoContextProvider>
							</TabLaboratorio>
							<TabLaboratorio value={value} index={2}>
								<TodoContextProvider>
									<EditarLaboratorio data={data} />
								</TodoContextProvider>
							</TabLaboratorio>
						</SwipeableViews>
					</div>
				</Paper>
			</Container>
		</Fragment>
	);
}
