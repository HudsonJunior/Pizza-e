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

const FormularioFuncionario = () => {
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
    history.push("/funcionarios");
  };

  const validar = () => {
    var nome = document.getElementById("nome");
    var senha = document.getElementById("senha");
    var cpf = document.getElementById("cpf");
    var rg = document.getElementById("rg");
    var carteira = document.getElementById("carteira");
    var cep = document.getElementById("cep");
    var rua = document.getElementById("rua");
    var numero = document.getElementById("numero");

    if (nome.value === "") {
      alert("Nome não informado!");
      return;
    }
    if (senha.value === "") {
      alert("Senha não informada!");
      return;
    }
    if (cpf.value === "") {
      alert("CPF não informado!");
      return;
    }
    if (rg.value === "") {
      alert("RG não informado!");
      return;
    }
    if (carteira.value === "") {
      alert("Carteira de trabalho não informada!");
      return;
    }
    if (cep.value === "") {
      alert("CEP não informado!");
      return;
    }
    if (rua.value === "" || numero.value === "") {
      alert("Endereço não informado corretamente!");
      return;
    }
    handleSave();
  };
  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={validar}
      >
        <div className="contentForm">
          <TextField
            required
            id="nome"
            label="Nome"
            style={{
              margin: 8,
            }}
          />
          <TextField
            id="senha"
            label="Senha"
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
            id="cpf"
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
            id="rg"
            label="RG"
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
            id="carteira"
            label="Carteira de trabalho"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />
          <TextField
            id="cep"
            label="CEP"
            style={{
              margin: 8,
            }}
          />
        </div>
        <div className="contentForm">
          <TextField
            id="rua"
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
            id="numero"
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

export default FormularioFuncionario;
