import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useHistory} from  "react-router-dom"
import {FiCheck} from "react-icons/fi";
const dados = [
    {id:1,probEntrega: 'Entrega demorou mais que o previsto', insatisfacoes:'entrega', reclamacaoAtend:'Nenhuma',reclamacaoProd:'Nenhuma',data:'20/11/2020'},
    
  {id:2,probEntrega: 'Nenhuma', insatisfacoes:'Mal atendido', reclamacaoAtend:'Atendente não sabe nada',reclamacaoProd:'Pizza murcha',data:'20/11/2020'},
  {id:3,probEntrega: 'Entrega rapida', insatisfacoes:'Pizza ruim', reclamacaoAtend:'Nenhuma',reclamacaoProd:'Pizza ruim',data:'20/09/2020'},
  {id:4,probEntrega: 'Nenhuma', insatisfacoes:'Pior pizza do mundo', reclamacaoAtend:'Nenhuma',reclamacaoProd:'pizza fria',data:'12/09/2020'},
  {id:5,probEntrega: 'Demorou mais que o previsto', insatisfacoes:'Nenhuma', reclamacaoAtend:'entrega',reclamacaoProd:'Nenhuma',data:'10/05/2020'},
  ];



  const SatisfacaoProdutoComponent = () => {
    const history = useHistory();
    

    const [confirmaBaixar,setBaixar] = React.useState(false);
    const handleBaixar = () => {
      setBaixar(true);
    }
    const closeBaixar = () => {
      setBaixar(false);
    }
  
    const [confirmacao,setConfirmacao] = React.useState(false);
    const handleConfirma = () => {
      setBaixar(false);
      setConfirmacao(true);
    }
    const closeConfirma = () => {
      setConfirmacao(false);
    }
    const Baixar = () =>{closeConfirma()}
    return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Código do Produto</td>
                <td>Problema da entrega</td>
                <td>Insatisfacoes</td>
                <td>Reclamacao produto</td>
              </tr>
            </thead>
            {dados.map((item) => (
              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.probEntrega}</td>
                  <td>{item.insatisfacoes}</td>
                  <td>{item.reclamacaoProd}</td>
                </tr>
              </tbody>
            ))}
          </Table>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{
              borderWidth: 1,
              borderColor: "black",
              margin: 20,
              backgroundColor: "lightGray",
              
            }}
            onClick={
              handleBaixar}
          >
            Baixar
          </Button>
          <Dialog
              open={confirmaBaixar}
              onClose={closeBaixar}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Deseja Baixar o relatorio?"}</DialogTitle>
              <DialogContent>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeBaixar} color="primary">
                  Não
                </Button>
                <Button onClick={handleConfirma} color="primary" autoFocus>
                  Sim
                </Button>
              </DialogActions>
          </Dialog>
          <Dialog
              open={confirmacao}
              onClose={closeConfirma}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Relatorio gerado com sucesso!  "}<FiCheck size={35} color={"green"}></FiCheck></DialogTitle>
              
              <DialogContent>
                
                <DialogContentText id="alert-dialog-description">
                  O relatorio foi gerado com sucesso.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={Baixar} color="primary" autoFocus>
                  Ok
                </Button>
              </DialogActions>
          </Dialog>
        </div>
        
      );
    };
  
  export default SatisfacaoProdutoComponent;