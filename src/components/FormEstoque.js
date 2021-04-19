import React, {useState, useEffect } from 'react';

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

import FacadeEstoque from  "../Facade/FacadeEstoque";

const facadeEstoque = new FacadeEstoque();

const axios = require('axios');

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



const FormularioEstoque = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const item = props.item;

  var tipo = props.type;
  const [open, setOpen] = React.useState(false);

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
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
  const handleSave = (event) => {
    event.preventDefault();

    if(tipo === "cadastrar"){
      facadeEstoque.postEstoque(
        nome,
        valor,
        peso,
        validade,
        fabricacao).then(result => { toast.success("🍕 Cadastro feito!", {
        toastStyle,
      })
        setTimeout(() => {
          history.push("/estoque");
        }, 3000);
      })
      .catch(error => {
        console.log(error.response)
          toast.error("Erro durante o cadastro no estoque", {
              toastStyle,
          })
      })
  }
    if (tipo === "editar") {
      const id = item._id
      facadeEstoque.patchEstoque(
        id,
        nome,
        valor,
        peso,
        validade,
        fabricacao,
      ).then(result => { toast.success("🍕 Dados atualizados!", {
        toastStyle,
      })
      setTimeout(() => {
        history.push("/estoque");
      }, 3000);
    })
    .catch(error => {
        console.log(error)
          toast.error("Erro durante a atualização no estoque", {
              toastStyle,
          })
      })
    }
  };

  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")
  const [peso, setPeso] = useState("")
  const [validade, setValidade] = useState("")
  const [fabricacao, setFabricacao] = useState("")

  useEffect(() => {
    if(item){
      setNome(item.nome)
      setValor(item.valor)
      setPeso(item.peso)
      if(item.validade != null){
        setValidade(item.validade.split("T")[0])
      }
      if(item.fabricacao != null){
        setFabricacao(item.fabricacao)
      }
    }
  }, [])



  return (
    <>
      <form className={classes.root} onSubmit={handleSave}>
        <div className="contentForm">
        <TextField value={nome}
        onChange={event => setNome(event.target.value)}
              required
              label="Nome"
              placeholder="Nome do produto"
              style={{
                margin: 8,
              }}
            />
          </div>
          <div className="contentForm">
          <TextField value={valor} onChange={event => setValor(event.target.value)}
            required
            label="Valor"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />
        </div>
        <div className="contentForm">
          <TextField value={peso} onChange={event => setPeso(event.target.value)}
            required
            label="Peso"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />
        </div>
        <div className="contentForm">
          <TextField value={validade} onChange={event => setValidade(event.target.value)}
            label="Data de Validade"
            type="date"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            defaultValue="aaaa-mm-dd"
            InputLabelProps={{
              shrink: true,
            }}
          />
          </div>
          <div className="contentForm">
          <TextField value={fabricacao} onChange={event => setFabricacao(event.target.value)}
            label="Data de Fabricação"
            type="date"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            defaultValue="aaaa-mm-dd"
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
              {"Deseja continuar o cadastro do produto no estoque?"}
            </DialogTitle>
            <DialogActions>
              <Button
                variant="danger"
                className="botao"
                href="/estoque"
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
              {"Deseja continuar a editar os dados do produto?"}
            </DialogTitle>
            <DialogActions>
              <Button
                variant="danger"
                className="botao"
                href="/estoque"
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

export default FormularioEstoque;
