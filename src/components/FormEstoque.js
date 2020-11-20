import React from "react";

import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

import { FiCheckCircle, FiChevronLeft } from "react-icons/fi";

import { Button } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import history from "../history";

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

const FormularioEstoque = () => {
  const classes = useStyles();

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
    toast.success("🍕 Cadastro feito!", {
      toastStyle,
    });
    setTimeout(() => {
      history.push("/estoque");
    }, 1500);
    // } else {
    //   return toast.error("🍕 Credenciais incorretas", {
    //     toastStyle,
    //   });
    // }
  };

  const handleBack = () => {
    console.log(1);
    history.push("/estoque");
  };

  const validar = () => {
    var nome = document.getElementById("nome");
    var marca = document.getElementById("marca");
    var quantidade = document.getElementById("quantidade");
    var valor = document.getElementById("valor");
    var peso = document.getElementById("peso");
    var validade = document.getElementById("validade");
    var fabricacao = document.getElementById("fabricacao");

    if (nome.value === "") {
      alert("Nome não informado!");
      return;
    }
    if (marca.value === "") {
      alert("Marca não informada!");
      return;
    }
    if (quantidade.value === "") {
      alert("Quantidade não informada!");
      return;
    }
    if (valor.value === "") {
      alert("Valor não informado!");
      return;
    }
    if (peso.value === "") {
      alert("Peso não informado!");
      return;
    }
    if (validade.value === "") {
      alert("Data de validade não informada!");
      return;
    }
    if (fabricacao.value === "") {
      alert("Data de fabricação não informada!");
      return;
    }
    handleSave();
  };

  return (
    <>
      <form
        id="formularioEstoque"
        className={classes.root}
        onSubmit={validar}
        noValidate
        autoComplete="off"
      >
        <div className="contentForm">
          <TextField
            required
            id="nome"
            label="Nome"
            placeholder="Nome do produto"
            style={{
              margin: 8,
            }}
          />
          <TextField
            id="marca"
            label="Marca"
            name="marca"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />
        </div>
        <div className="contentForm">
          <TextField
            id="quantidade"
            label="Quantidade"
            type="number"
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
            id="valor"
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
          <TextField
            id="peso"
            label="Peso"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />
          <TextField
            disabled
            id="codigo"
            label="Código"
            defaultValue="Automático"
            style={{
              margin: 8,
            }}
          />
        </div>
        <div className="contentForm">
          <TextField
            id="validade"
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
          <TextField
            id="fabricacao"
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
        <Button className="botao" variant="dark" onClick={handleBack}>
          <FiChevronLeft /> Voltar
        </Button>
        <Button className="botao" type="submit" variant="success">
          <FiCheckCircle /> Salvar
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormularioEstoque;
