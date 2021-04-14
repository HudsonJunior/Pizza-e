import React, { useState } from "react";
import "./styles/LoginComponentStyle.css";
import pizza from "./../images/pizza.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import "./styles/cadastrarCliente.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { green } from "@material-ui/core/colors";

const axios = require('axios');

const toastStyle = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const FuncCadastrarClienteComponents = (props) => {
  const history = useHistory();
  const classes = useStyles();
  var tipo = props.type;
  const [values, setValues] = React.useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const voltar = () => {
    history.push("/clientes")
  };


  const handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.elements)
    axios.post('http://localhost:8080/clientes', {
      
        nome: values.nome,
        endereco: values.endereco,
        telefone: values.telefone,
        email: values.email,
        cpf: values.cpf,
    })
    .then(result => {
      toast.success("🍕 Cliente cadastrado com sucesso!", {
          toastStyle,
      })
      setTimeout(() => {
          if(tipo === "pedido"){
            window.history.back();
          }  
          else{history.push("/clientes")}
          
      }, 3000);
  })
      .catch(error => {
          if (error.response?.data) {
              toast.error(error.response.data.message, {
                  toastStyle,
              })
              toast.error(error.response.data.details, {
                  toastStyle,
              })
          }
          else {
              toast.error('Ocorrou um erro ao cadastrar o cliente, tente novamente!', { toastStyle, })
          }

      })
  }


  return (
    <form>
      <div className="divii">
        <div className="header">
          <img src={pizza} alt="Pizza"></img>
          <h1>Cadastrar Cliente</h1>
        </div>
        <div>
          <div style={{ width: 460 }}>
            <TextField
              id="nome"
              label="Nome"
              value={values.nome}
              onChange={handleChange("nome")}
              className={clsx(classes.margin, classes.textField)}
            />
            <TextField
              id="cpf"
              label="Cpf/Cnpj"
              value={values.cpf}
              onChange={handleChange("cpf")}
              className={clsx(classes.margin, classes.textField)}
            />
          </div>
          <div>
            <TextField
              id="email"
              label="Email"
              value={values.email}
              onChange={handleChange("email")}
              className={clsx(classes.margin, classes.textField)}
            />
            <TextField
              id="telefone"
              label="Telefone"
              value={values.telefone}
              onChange={handleChange("telefone")}
              className={clsx(classes.margin, classes.textField)}
              fullWidth
            />
          </div>
          <div style={{ width: 460 }}>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                id="endereco"
                label="Endereço"
                value={values.endereco}
                onChange={handleChange("endereco")}
                fullWidth
              />
            </FormControl>
          </div>

         

          <div style={{ flexDirection: "row", display: "flex" }}>
            <button
              className="loginButton"
              style={{ marginRight: "auto", marginTop: 30 }}
              onClick={voltar}
            >
              {""}
              Voltar
            </button>
            <button
              className="loginButton"
              style={{ marginLeft: "auto", marginTop: 30 }}
              onClick={handleSubmit}
            >
              {""}
              Cadastrar
            </button>

            
          </div>
        </div>
      </div>
    </form>
  );
};
/* cpf nome email telefone senha endereco */
export default FuncCadastrarClienteComponents;
