import React from "react";

import {useHistory} from  "react-router-dom"

import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { FiEdit3, FiXCircle, FiPlus,  FiSearch ,FiCheck} from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";

import Botao from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const url = window.location.href.replace("http://localhost:3000/func/", "");


const GenericTable = ({ data, title }) => {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };


  const [end, setEnd] = React.useState(false);
  
  const endClose = () => {
    setEnd(false);
  }
  const handleClose = () => {
    setEnd(false);
    setOpen(false);
  };
  const fim = () => {
    setOpen(false);
    setEnd(true);
   }

  const history = useHistory()

  const direcionarCadastro = () => {
    {url === "pedidos" && (history.push("/"))

    }
    {url === "clientes" && (history.push("/func/cadastrarCliente"))
    
    }
    {url === "produtos" && (history.push("/"))
    
    }
    {url === "estoque" && (history.push("/"))
  
    }

  }

  return (
    <>
      <InputGroup className="col-3 mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FiSearch size={18} color="#000" />
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          placeholder={`Buscar ${title}`}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <Table striped bordered hover>
        

        {url === "pedidos" && (
          <>
            <thead>
            <tr>
              <td>ID</td>
              <td>Descrição</td>
              <td>Pagamento</td>
              <td>Expedição</td>
              <td>Data</td>
              <td>CPF</td>
              <td>Observações</td>
              <td>Ações</td>
            </tr>
            </thead>  
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.descrição}</td>
                  <td>{item.pagamento}</td>
                  <td>{item.expedição}</td>
                  <td>{item.data}</td>
                  <td>{item.CPF}</td>
                  <td>{item.observacoes}</td>
                  <td>
                    <Button variant="light" style={{marginRight:7, borderWidth:1, borderColor:"black"}}>
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger">
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}

        {url === "clientes" && (
          <>
            <thead>
            <tr>
              <td>ID</td>
              <td>CPF</td>
              <td>Nome</td>
              <td>Endereco</td>
              <td>Email</td>
              <td>Telefone</td>
              <td>Ações</td>
            </tr>
            </thead> 
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.cpf}</td>
                  <td>{item.nome}</td>
                  <td>{item.endereco}</td>
                  <td>{item.email}</td>
                  <td>{item.telefone}</td>
                  <td>
                    <Button variant="light" style={{marginRight:7, borderWidth:1, borderColor:"black"}} onClick={handleClickOpen}>
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Editar as informações do cliente</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Nome"
                  type="name"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Endereço"
                  type="name"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email"
                  type="email"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Telefone"
                  type="name"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Botao onClick={handleClose} color="primary">
                  Cancel
                </Botao>
                <Botao onClick={fim} color="primary">
                  Alterar
                </Botao>
              </DialogActions>
            </Dialog>
            <Dialog
              open={end}
              onClose={endClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Os dados foram alterados com sucesso!  "}<FiCheck size={35} color={"green"}></FiCheck></DialogTitle>
              
              <DialogContent>
                
                <DialogContentText id="alert-dialog-description">
                  Dados alterados com sucesso.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={endClose} color="primary" autoFocus>
                  Ok
                </Button>
              </DialogActions>
          </Dialog>
          </>
        )}
      </Table>
      <Button variant="success" onClick={direcionarCadastro}>
        <FiPlus size={26} color="fff"/>
        Adicionar
      </Button>
      
    </>
  );
};

export default GenericTable;
