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
import { HistoryRounded } from "@material-ui/icons";

const axios = require('axios');

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

const CadastrarClienteComponents = (props) => {
  const history = useHistory();
  const classes = useStyles();
  var tipo = props.type;
  const [values, setValues] = React.useState({
    nome: "",
    cpf: "",
    password: "",
    password2: "",
    email: "",
    telefone: "",
    showPassword: false,
    endereco: "",
  });

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  

  const Voltar = () => {
    
    history.push("/login");
    
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
        senha:values. password
    })
    .then(result => {
      toast.success("🍕 Cliente cadastrado com sucesso!", {
          toastStyle,
      })
      setTimeout(() => {
          history.push("/login")
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
          <div>
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

          <div>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <FiEye /> : <FiEyeOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Digite novamente
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password2}
                onChange={handleChange("password2")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <FiEye /> : <FiEyeOff />}
                    </IconButton>
                  </InputAdornment>
                }
                error={values.password !== values.password2} // COmpara se as senhas sao iguais
              />
            </FormControl>
          </div>

          <div style={{ flexDirection: "row", display: "flex" }}>
            <button
              className="loginButton"
              style={{ marginRight: "auto", marginTop: 30 }}
              onClick={Voltar}
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
export default CadastrarClienteComponents;