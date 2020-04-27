import React, { Fragment } from "react";
import TodoContextProvider from "./TodoContext";
import FormEstudiante from "./FormEstudiante";
import EstSnackBar from "./EstSnackBar";

export default function Form(){
    return(
        <Fragment>
            <TodoContextProvider>       
                <FormEstudiante/>
                <EstSnackBar/>      
            </TodoContextProvider>
        </Fragment>
    );
}