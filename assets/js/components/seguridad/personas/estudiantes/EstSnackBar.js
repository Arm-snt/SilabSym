import {Snackbar, SnackbarContent, Button} from '@material-ui/core'
import React, {useContext, Fragment} from 'react';
import {TodoContext} from './TodoContext';


function checkLevel(level){
    switch (level) {
        case 'success':
            return 'green';
        case 'error':
            return '#e2001A';
            default: 
            return '#e8E8E8';
    }
}

function EstSnackBar() {

    const context = useContext(TodoContext);

    return (
        <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}>
            {context.message.text&&(
                <SnackbarContent style={{backgroundColor:checkLevel(context.message.level)}} message={context.message.text.map((text, index)=>(
                    <Fragment key={index+ ' ' +text}>
                        <span>{text}</span>
                        <br/>
                    </Fragment>
            ))} action={[
                    <Button onClick={()=>{context.setMessage({})}} key='dissmiss' color='inherit'>dismiss</Button>
            ]} />
            )}
        </Snackbar>
    )
}

export default EstSnackBar;
