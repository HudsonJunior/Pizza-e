import React, { useState } from "react";
import "./styles/LoginComponentStyle.css";
import pizza from "./../images/pizza.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {FiEye,FiEyeOff,FiCheck,FiX} from "react-icons/fi";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import "./styles/cadastrarCliente.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {useHistory} from  "react-router-dom"
import { green } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));



const CadastrarClienteComponents = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    nome: '',
    cpf:'',
    password: '',
    password2: '',
    email: '',
    telefone: '',
    showPassword: false,
    endereco: '',
    
  });

 
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
  const [verificar,setVerificar] = React.useState(false);
  
  const abrirVerificar = () => {
    setVerificar(true);
  }
  const fecharVerificar = () => {
    setVerificar(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setVoltar(false);
    setOpen(false);
  };
  const voltar = () =>{history.push("/login")}

  const [confirmaVoltar,setVoltar] = React.useState(false);

  const handleVoltar = () => {
    setVoltar(true);
  }
  const closeVoltar = () => {
    setVoltar(false);
  }

  const finalizarCadastro = () =>{history.push("/login")}
  const fim = () => {
   setOpen(false);
   setEnd(true);
  }
 
  const verificaCamposVazios = () => {
    if((values.nome=== '' || values.cpf === '' || values.password === '' || values.password2 === '' || values.email === '' || values.telefone === '' || values.endereco === '') || (values.password !== values.password2)){
      abrirVerificar();
    }else{
      handleClickOpen();
    }
  }

  return (
    <div className="divii">
      <div className="header">
      <img src={pizza} alt="Pizza"></img>
      <h1>Cadastrar Cliente</h1>
      </div>
      <div>
        <div>
          <TextField id="nome" label="Nome" value={values.nome} onChange={handleChange('nome')} className={clsx(classes.margin, classes.textField)}/>
          <TextField id="cpf" label="Cpf/Cnpj" value={values.cpf} onChange={handleChange('cpf')} className={clsx(classes.margin, classes.textField)} />
          
        </div>
        <div>
          <TextField id="email" label="Email" value={values.email} onChange={handleChange('email')} className={clsx(classes.margin, classes.textField)}/>
          <TextField id="telefone" label="Telefone" value={values.telefone} onChange={handleChange('telefone')} className={clsx(classes.margin, classes.textField)}/>
         
        </div>
        <div style={{width:460}}>
          <FormControl fullWidth className={classes.margin}>
            <TextField id="endereco" label="Endereço" value={values.endereco} onChange={handleChange('endereco')}  fullWidth/>
          </FormControl>
        </div>

        <div>
        
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
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
            <InputLabel htmlFor="standard-adornment-password">Digite novamente</InputLabel>
            <Input
              
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password2}
              onChange={handleChange('password2')}
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
            <button className="loginButton" style={{ marginRight: "auto" ,marginTop:30}} onClick={
                handleVoltar}>
              {""}
              Voltar
            </button>
            <button className="loginButton" style={{ marginLeft: "auto" ,marginTop:30}} onClick={
                verificaCamposVazios}>
              {""}
              Cadastrar
            </button>
            
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Deseja finalizar o cadastro?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Finalizar o cadastro e salvar suas informações no sistema permite que você cliente tenha acesso as funcionalidades da Pizza-e.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Não
                </Button>
                <Button onClick={fim} color="primary" autoFocus>
                  Sim
                </Button>
              </DialogActions>
          </Dialog>
          <Dialog
              open={end}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Seu Cadastro foi realizado com sucesso!  "}<FiCheck size={35} color={"green"}></FiCheck></DialogTitle>
              
              <DialogContent>
                
                <DialogContentText id="alert-dialog-description">
                  Você será redirecionado para a página de login.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={finalizarCadastro} color="primary" autoFocus>
                  Ok
                </Button>
              </DialogActions>
          </Dialog>
          <Dialog
              open={verificar}
              onClose={fecharVerificar}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Seu Cadastro não foi realizado!  "}<FiX size={35} color={"red"}></FiX></DialogTitle>
              
              <DialogContent>
                
                <DialogContentText id="alert-dialog-description">
                  Por favor preencha todos os campos do cadastro corretamente!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={fecharVerificar} color="primary" autoFocus>
                  Ok
                </Button>
              </DialogActions>
          </Dialog>
          <Dialog
              open={confirmaVoltar}
              onClose={closeVoltar}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Deseja voltar para a tela de login?"}</DialogTitle>
              <DialogContent>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeVoltar} color="primary">
                  Não
                </Button>
                <Button onClick={voltar} color="primary" autoFocus>
                  Sim
                </Button>
              </DialogActions>
          </Dialog>
          
            
        </div>
      </div>
    </div>
  );
};
/* cpf nome email telefone senha endereco */
export default CadastrarClienteComponents;