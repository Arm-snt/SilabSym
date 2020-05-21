import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogTitle, Dialog, DialogContent, DialogActions, Button,} from "@material-ui/core";
import { TodoContext } from "./TodoContext";

function DeleteDialog(props) {
  const context = useContext(TodoContext);

  const hide = () => {
    props.setEliminarVisible(false);
  };  

  return (
    <Dialog onClose={hide} fullWidth={true} maxWidth="sm" open={props.open}>
      <DialogTitle>¿Dese eliminar este registro?</DialogTitle>
      <DialogContent>{props.todo.elemento}</DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancelar</Button>
        <Button
          onClick={() => {
            context.deleteTodo({
              id: props.todo.id,
              usuario: props.todo.usuario,
            });
            hide();
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setEliminarVisible: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    usuario: PropTypes.string.isRequired,
  }),
};

export default DeleteDialog;