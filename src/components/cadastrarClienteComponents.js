import React, {useEffect ,useState } from "react";
import { FiCheckCircle, FiChevronLeft } from "react-icons/fi";
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
//Mudar os buttons pra igual do huds e deixar um caminho mais simples sem tantas box'ss
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

  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [endereco, setEndereco] = useState("")

  useEffect(() => {
    
    setNome("")
    setCpf("")
    setPassword("")
    setPassword2("")
    setEmail("")
    setTelefone("")
    setEndereco("")

}, [])


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = React.useState(false);
  const [end, setEnd] = React.useState(false);
  const [verificar, setVerificar] = React.useState(false);

  const abrirVerificar = () => {
    setVerificar(true);
  };
  const fecharVerificar = () => {
    setVerificar(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setVoltar(false);
    setOpen(false);
  };
  const voltar = () => {
    console.log(props);
    if (props.type === "pedido") {
      history.push("/concluir-pedido");
    } else {
      history.push("/login");
    }
  };

  const [confirmaVoltar, setVoltar] = React.useState(false);

  const handleVoltar = () => {
    setVoltar(true);
  };
  const closeVoltar = () => {
    setVoltar(false);
  };

  const finalizarCadastro = () => {
    if (props.type === "pedido") {
      history.push("/concluir-pedido");
    } else {
      history.push("/login");
    }
  };
  const fim = () => {
    setOpen(false);
    setEnd(true);
  };

  const verificaCamposVazios = () => {
    if (
      //values.nome === "" ||
      values.cpf === "" ||
      values.password === "" ||
      values.password2 === "" ||
      values.email === "" ||
      values.telefone === "" ||
      values.endereco === "" ||
      values.password !== values.password2
    ) {
      abrirVerificar();
    } else {
      handleClickOpen();
    }
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

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.elements)
    console.log(nome)
    axios.post('http://localhost:8080/clientes', {
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        email: email,
        cpf: cpf,
        senha:password
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

    });
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className="divi">
        <div className="header">
          <img src={pizza} alt="Pizza"></img>
          <h1>Cadastrar Cliente</h1>
        </div>
        
        <div>
          <div>
            <TextField
              id="standard-basic"
              label="Nome"
              onChange={event => setNome(event.target.value)}
              value={nome}
              className={clsx(classes.margin, classes.textField)}
              required
            />

            
            
            <TextField
              id="cpf"
              label="Cpf/Cnpj"
              
              onChange={event => setCpf(event.target.value)}
              value={cpf}
              className={clsx(classes.margin, classes.textField)}
              required
            />
          </div>
          <div>
            <TextField
              id="email"
              label="Email"
             
              onChange={event => setEmail(event.target.value)}
              value={email}
              className={clsx(classes.margin, classes.textField)}
            />
            <TextField
              id="telefone"
              label="Telefone"
              
              onChange={event => setTelefone(event.target.value)}
              value={telefone}
              className={clsx(classes.margin, classes.textField)}
              required
            />
          </div>
          <div style={{ width: 460 }}>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                id="endereco"
                label="Endereço"
                
                onChange={event => setEndereco(event.target.value)}
                value={endereco}
                required
                fullWidth
              />
            </FormControl>
          </div>

          <div style={{ width: 460 }}>
            <FormControl  className={classes.margin}>
              <TextField
                id="senha"
                label="Senha"
                onChange={event => setPassword(event.target.value)}
                value={password}
                required
                
              />
            </FormControl>
          </div>

          <div style={{ width: 460 }}>
            <FormControl  className={classes.margin}>
              <TextField
                id="password"
                label="Repita a senha"
                onChange={event => setPassword2(event.target.value)}
                value={password2}
                required
                
              />
            </FormControl>
          </div>

          <div style={{ flexDirection: "row", display: "flex" }}>
            <Button
              className="voltarButton"
              style={{ marginRight: "auto", marginTop: 30 }}
              onClick={handleVoltar}
            >
              <FiChevronLeft /> Voltar
             
            </Button>
            <Button
              className="loginButton"
              style={{ marginLeft: "auto", marginTop: 30 }}
              type="submit"
              
              variant="success"            
            >
              <FiCheckCircle /> Cadastrar
            </Button>

          </div>
        </div>
      </div>
    </form>
  );
};
/* cpf nome email telefone senha endereco */
export default CadastrarClienteComponents;
