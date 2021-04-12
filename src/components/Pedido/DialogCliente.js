import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axios = require("axios");

export default function FormDialogCliente(props) {
  const [open, setOpen] = React.useState(false);
  //const [cpf, setCPF] = React.useState("");

  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getClientes = async () => {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios.get(
          `http://localhost:8080/clientes?cpf=${props.cpfCliente}`
        );
        const clientesResponse = await response.data;
        resolve(clientesResponse[0]);
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  };

  const BuscarCliente = () => {
    getClientes()
      .then((result) => {
        const cliente = result;
        if (!cliente.endereco || cliente.endereco === "false") {
          props.setEndereco("");
        } else {
          props.setEndereco(cliente.endereco);
        }
        toast.success("🍕 Achamos o cliente !", {
          toastStyle,
        });
        handleClose();
      })
      .catch(() => {
        toast.error("🍕 Não achamos o cliente!", {
          toastStyle,
        });
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ borderColor: "black" }}
      >
        <SearchIcon size={10} color="fff" />
        Buscar Cliente
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Buscando um cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>Digite o CPF do cliente:</DialogContentText>
          <div
            style={{
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <TextField
              style={{ display: "inline-block", paddingRight: 10 }}
              autoFocus
              margin="dense"
              id="cpf"
              label="CPF"
              type="text"
              value={props.cpfCliente}
              onChange={(event) => props.setCliente(event.target.value)}
            />
            <Button
              style={{ display: "inline-block", height: "100%", bottom: 0 }}
              variant="contained"
              color="primary"
              onClick={() => BuscarCliente()}
            >
              <SearchIcon size={10} color="fff" />
              Buscar
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
