import React, { useEffect,useState } from "react";
import Menubar from "../components/MenubarComponent";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { FiEdit3, FiXCircle, FiPlus, FiSearch, FiCheck,FaMoneyCheckAlt } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Botao from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TabelaMinhaConta from "./TabelaMinhaConta";
import FacadePedido from "../Facade/FacadePedido";
import FacadeClientes from "../Facade/FacadeClientes";
import FacadeFuncionario from "../Facade/FacadeFuncionario";
import FacadeSatisfacao from "../Facade/FacadeRelatorioSatisfacao";
import "./styles/cadastrarCliente.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { HistoryTwoTone } from "@material-ui/icons";
import { parseJSON } from "date-fns";

const facadeFuncionario =new FacadeFuncionario(); 
const facadeClientes = new FacadeClientes();
const facadePedido = new FacadePedido();
const facadeSatisfacao = new FacadeSatisfacao();

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));



const MinhaConta = ({ currentUser }) => {
  const user = localStorage.getItem("user");
  const history = useHistory();
  const classes = useStyles();
  const [alterar, setAlterar] = React.useState(false);
  const [mensagem, setMensagem] = React.useState(false);
  const [pedidos, setPedidos] = React.useState([]);
  const [cliente,setCliente] = React.useState("");
  const [funcionario,setFuncionario] = React.useState("");
  

  useEffect(() => {
    if(user){
      const cpfCliente = JSON.parse(user).cpf;
      facadeFuncionario.getFuncionarioMinhaConta(cpfCliente,setFuncionario);
      facadePedido.getPedidosCPF(cpfCliente, setPedidos);
      facadeClientes.getCliente(cpfCliente,setCliente);
    }
  }, []);

  const handleChange = (prop) => (event) => {
    setCliente({ ...cliente, [prop]: event.target.value });
  };

  const handleChangeFunc = (prop) => (event) =>{
    
    setFuncionario({ ...funcionario, [prop]: event.target.value });
    //console.log("CONSOLE FUNC",funcionario[0]);
  }

  const mostrarMensagem = () => {
    if(convertedUser.type === "C"){
      facadeClientes.altCliente(cliente);
    }
    else{
      //facadeFuncionario.altFuncionario(funcionario);
      facadeFuncionario.patchFunc(
        funcionario.id,
        funcionario.nome,
        funcionario.senha,
        funcionario.cpf,
        funcionario.rg,
        funcionario.carteira,
        funcionario.cep,
        funcionario.rua,
        funcionario.numero)
    }
    setMensagem(true);
  };
  const naoMostrarMensagem = () => {
    setMensagem(false);
  };
  const handleAlterar = () => {
    setAlterar(true);
  };

  const naoAlterar = () => {
    setAlterar(false);
  };

  const sair = () => {
    history.push("/");
  };

  const handleVisitante = () => {
    history.push("/login", { tipo: "perfil" });
  };

  const [showDialog,setShowDialog] = useState(false);
  const showDialogAjuda = () => {
    setShowDialog(true);
  }
  
  

  const convertedUser = JSON.parse(user);
  function verificaUsuario() {
    if (convertedUser && convertedUser.type === "C") {
      return (
        <>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                disabled
                id="standart-required"
                
                value={cliente.cpf}
              />
              <TextField
                required
                id="nome"
                onChange={handleChange("nome")}
                value={cliente.nome}
              />
            </div>
            <div>
              <TextField
                required
                id="e"
                onChange={handleChange("endereco")}
                value={cliente.endereco}
              />
            </div>
            <TextField
              required
              id="email"
              onChange={handleChange("email")}
              value={cliente.email}
            />
            <TextField
              required
              id="telefone"
              onChange={handleChange("nome")}
              value={cliente.telefone}
            />
          </form>
        </>
      );
    } else if (
      convertedUser &&
      (convertedUser.type === "F" || convertedUser.type === "G")
    ) {
      return (
        <>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                disabled
                id="standart-required"
                label="CPF"
                defaultValue={funcionario.cpf}
              />
              <TextField
                disabled
                id="standart-required"
                label="RG"
                defaultValue={funcionario.rg}
              />
              <TextField
                disabled
                id="standart-required"
                label="Carteira"
                defaultValue={funcionario.carteira}
              />
            </div>
            <div>
              <TextField
                required
                id="nome"
                value={funcionario.nome}
                onChange={handleChangeFunc("nome")}

              />
              <TextField
                required
                id="numero"
                value={funcionario.numero}
                onChange={handleChangeFunc("numero")}
              />
              <TextField
                required
                id="cep"
                value={funcionario.cep}
                onChange={handleChangeFunc("cep")}
              />
            </div>
            <div>
              <TextField
                required
                id="rua"
                value={funcionario.rua}
                onChange={handleChangeFunc("rua")}
              />
            </div>
          </form>
        </>
      );
    } else if (!convertedUser) {
      {
        handleVisitante();
      }
    }
  }
  return (
    <>
      <Menubar currentUser={convertedUser}></Menubar>
      <div className="divii">
        {verificaUsuario()}

        <div style={{ flexDirection: "row", display: "flex" }}>
          <button
            className="loginButton"
            style={{ marginLeft: "auto", marginTop: 30 }}
            onClick={handleAlterar}
          >
            {""}
            Alterar
          </button>
          <Button variant="primary" style={{ alignItems: 'center', textAlign: "center" }} onClick={showDialogAjuda}>Preciso de ajuda</Button>
        </div>
        <Dialog
          open={alterar}
          onClose={naoAlterar}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Alterar as informações da sua conta?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={naoAlterar} color="primary">
              Não
            </Button>
            <Button onClick={mostrarMensagem} color="primary" autoFocus>
              Sim
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={mensagem}
          onClose={naoMostrarMensagem}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Dados alterados com sucesso!  "}
            <FiCheck size={35} color={"green"}></FiCheck>
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você será redirecionado para a página principal.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={sair} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
            open={showDialog}
            onClose={() => setShowDialog(false)}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                Ajuda online de contexto
          </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Você está na edição dos dados da sua conta
                </DialogContentText>
                
                <DialogContentText>
                Para alterar seus dados cadastrados basta preencher ou escrever novamente os campos disponiveis e clicar no botão "Alterar".
    
                </DialogContentText>
                <DialogContentText>
                Abaixo de suas informações pessoais estão contidos o historico dos pedidos ja realizados no sistema.

                </DialogContentText>
                <DialogContentText>
                Para verificar a nota da fiscal do pedido, basta clicar no icone de "$" ao lado dos dados do pedido.
                </DialogContentText>
                <DialogContentText>
                Se desejar deixar sua opnião em relação ao pedido basta clicar no icone representado por um lapis e preencher os campos requeridos.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    className="botao"
                    onClick={() => setShowDialog(false)}
                    color="primary"
                >
                    Ok
                </Button>

            </DialogActions>
        </Dialog>
      </div>
      <TabelaMinhaConta meusPedidos={pedidos} setMeusPedidos={setPedidos} />
    </>
  );
};

export default MinhaConta;
