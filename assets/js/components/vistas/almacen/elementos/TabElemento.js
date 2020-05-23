import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container, Paper } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import TodoContextProvider from "./TodoContext";
import EstSnackBar from "./EstSnackBar";
import Elementos from "./Elementos";
import NuevoElemento from "./NuevoElemento";
import EditarElemento from "./EditarElemento";

function TabElemento(props){

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

TabElemento.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    container: {
      paddingTop: "20px",
    },
    paper: {
      marginTop: 8,
      display: "flex",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f5f5f5",
    },
  }));

export default function SimpleTabs(onchangeTab){

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Fragment>
        <Container
            className={classes.container}
            component="main"
            maxWidth="lg"
            justify="center">
            <Paper className={classes.paper}>
                <div className={classes.root}>
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary">
                        <Tab label="Nuevo Elemento" {...a11yProps(0)} />
                        <Tab label="Elementos" {...a11yProps(1)} />
                        <Tab label="Detalles Elemento" {...a11yProps(2)} disabled />
                    </Tabs>
                    <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={onChangeIndex}>
                        <TabElemento value={value} index={0}>
                        <TodoContextProvider>
                            <NuevoElemento/>
                            <EstSnackBar/>
                          </TodoContextProvider>                                                      
                        </TabElemento>
                        <TabElemento value={value} index={1}>
                        <TodoContextProvider>
                            <Elementos/>
                            <EstSnackBar/>
                          </TodoContextProvider>
                        </TabElemento>
                        <TabElemento value={value} index={2}>
                            <EditarElemento/>
                        </TabElemento>
                    </SwipeableViews>
                </div>
            </Paper>
        </Container>
        </Fragment>
    );
}
