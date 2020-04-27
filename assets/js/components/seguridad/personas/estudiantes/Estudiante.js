import React, { Fragment } from "react";
import TodoContextProvider from "./TodoContext";
import TodoTable from "./TodoTable";
import { CssBaseline } from "@material-ui/core";
import EstSnackBar from "./EstSnackBar";

export default function Estudiante() {
  return (
    <Fragment>
      <TodoContextProvider>       
          <TodoTable/>
          <EstSnackBar/>        
      </TodoContextProvider>
    </Fragment>
  );
}
