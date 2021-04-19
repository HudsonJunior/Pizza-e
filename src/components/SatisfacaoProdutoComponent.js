import React, { useEffect } from "react";
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
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import FacadeRelatorioSatisfacao from "../Facade/FacadeRelatorioSatisfacao";
import "./styles/relatorioSatisfacao.css"


const axios =require('axios');
const facadeRelatorioSatisfacao = new FacadeRelatorioSatisfacao();
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
      console.log(cpfCliente)
      setBaixar(false);
      setConfirmacao(true);
    }
    const closeConfirma = () => {
      setConfirmacao(false);
    }
    const Baixar = () =>{closeConfirma()}
    const [cpfCliente, setCpfCliente] = React.useState("");

    const [opnioes, setOpnioes] = React.useState([]);

    useEffect(() => {
      //Primeiro dar um get na tabela de satisfacao vai mostrar o de todos os cpfs
      const getOpnioes = async () => {
        //console.log("-----------------------------------------------------rola")
        const response = await axios.get(
          `http://localhost:8080/relatorio_satisfacao`
        );
        const opnioesResponse = await response;
        const opnioesArray = opnioesResponse.data;
        setOpnioes(opnioesArray);
        console.log("OPNIOS:",opnioes)
      };
  
    }, []);

    const [lista,setLista] = React.useState([]);

    const buscaCpf = () =>{
      if(cpfCliente ===   ""){
        facadeRelatorioSatisfacao.getList(setLista);
        console.log("nadskfbsajfksadhfkjsada")
      }else{

        //setCpfCliente(cpf);
        console.log("------------------",cpfCliente);
        facadeRelatorioSatisfacao.getFromCpf(cpfCliente,setLista);
        console.log("lista:",lista);
      }
    } 
    
    return (
        <div>
          <div class="inline">
            <FormControl
            placeholder={"Cpf"}
            aria-label="BuscarProduto"
            aria-describedby="basic-addon1"
            value={cpfCliente}
            //Passando o cpf como parametro  
            onChange={(event) => setCpfCliente(event.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                style={{
                  borderWidth: 0.5,
                  borderColor: "black",
                  margin: 10,
                  backgroundColor: "lightGray",
                  
                }}
                onClick={buscaCpf}
              >
                Pesquisar
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Cliente</td>
                <td>Avaliacao</td>
                <td>Produtos</td>
                <td>Data</td>
              </tr>
            </thead>
            {lista.map((item) => (
              <tbody>
                <tr>
                  <td>{item.cpfCliente}</td>
                  <td>{item.opniao}</td>
                  <td>{item.produto}</td>
                  <td>{item.dataSatisfacao}</td>
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