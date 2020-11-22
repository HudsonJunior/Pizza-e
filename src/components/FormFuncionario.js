import React from "react";

import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

import { FiCheckCircle, FiChevronLeft } from "react-icons/fi";

import { Button } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Dialog } from "@material-ui/core";

import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "30ch",
  },
}));

const FormularioFuncionario = (props) => {
  const history = useHistory();
  const classes = useStyles();
  var tipo = props.type;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (tipo === "cadastrar") {
      toast.success("🍕 Cadastro feito!", {
        toastStyle,
      });
    }
    if (tipo === "editar") {
      toast.success("🍕 Dados atualizados!", {
        toastStyle,
      });
    }
    setTimeout(() => {
      history.push("/funcionarios");
    }, 1500);
  };

  const handleBack = () => {
    console.log(1);
    history.push("/funcionarios");
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSave}>
        <div className="contentForm">
          <TextField
            required
            label="Nome"
            style={{
              margin: 8,
            }}
          />
          <TextField
            required
            label="Senha"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />
        </div>
        {tipo === "cadastrar" && (
          <div className="contentForm">
            <TextField
              required
              label="CPF"
              style={{
                margin: 8,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              label="RG"
              style={{
                margin: 8,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            />
          </div>
        )}
        {tipo === "editar" && (
          <div className="contentForm">
            <TextField
              disabled
              label="CPF"
              style={{
                margin: 8,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              disabled
              label="RG"
              style={{
                margin: 8,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            />
          </div>
        )}
        {tipo === "cadastrar" && (
          <div className="contentForm">
            <TextField
              required
              label="Carteira de trabalho"
              style={{
                margin: 8,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            />
            <TextField
              required
              label="CEP"
              style={{
                margin: 8,
              }}
            />
          </div>
        )}
        {tipo === "editar" && (
          <div className="contentForm">
            <TextField
              disabled
              label="Carteira de trabalho"
              style={{
                margin: 8,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            />
            <TextField
              required
              label="CEP"
              style={{
                margin: 8,
              }}
            />
          </div>
        )}
        <div className="contentForm">
          <TextField
            required
            label="Rua"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            label="Numero"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button
          className="botao"
          variant="ligth"
          style={{ marginRight: 7, borderWidth: 1, borderColor: "black" }}
          onClick={handleClickOpen}
        >
          <FiChevronLeft /> Voltar
        </Button>
        {tipo === "cadastrar" && (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-voltar">
              {"Deseja continuar o cadastro do funcionário?"}
            </DialogTitle>
            <DialogActions>
              <Button
                variant="danger"
                className="botao"
                href="/funcionarios"
                onClick={handleClose}
                color="primary"
              >
                Não
              </Button>

              <Button
                className="botao"
                variant="success"
                onClick={handleClose}
                color="primary"
                autoFocus
              >
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {tipo === "editar" && (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-voltar">
              {"Deseja continuar a editar os dados do funcionário?"}
            </DialogTitle>
            <DialogActions>
              <Button
                variant="danger"
                className="botao"
                href="/funcionarios"
                onClick={handleClose}
                color="primary"
              >
                Não
              </Button>

              <Button
                className="botao"
                variant="success"
                onClick={handleClose}
                color="primary"
                autoFocus
              >
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Button
          className="botao"
          style={{ marginRight: 7, borderWidth: 1, borderColor: "black" }}
          type="submit"
          variant="success"
        >
          <FiCheckCircle /> Salvar
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormularioFuncionario;
