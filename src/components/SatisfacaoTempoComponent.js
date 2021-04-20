import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom"
import { FiCheck } from "react-icons/fi";
import FacadeRelatorioSatisfacao from "../Facade/FacadeRelatorioSatisfacao";

const dados = [
  { id: 1, probEntrega: 'Entrega demorou mais que o previsto', insatisfacoes: 'entrega', reclamacaoAtend: 'Nenhuma', reclamacaoProd: 'Nenhuma', data: '20/11/2020' },
  { id: 2, probEntrega: 'Nenhuma', insatisfacoes: 'Mal atendido', reclamacaoAtend: 'Atendente não sabe nada', reclamacaoProd: 'Pizza murcha', data: '20/11/2020' },
  { id: 3, probEntrega: 'Entrega rapida', insatisfacoes: 'Pizza ruim', reclamacaoAtend: 'Nenhuma', reclamacaoProd: 'Pizza ruim', data: '20/09/2020' },
  { id: 4, probEntrega: 'Nenhuma', insatisfacoes: 'Pior pizza do mundo', reclamacaoAtend: 'Nenhuma', reclamacaoProd: 'pizza fria', data: '12/09/2020' },
  { id: 5, probEntrega: 'Demorou mais que o previsto', insatisfacoes: 'Nenhuma', reclamacaoAtend: 'entrega', reclamacaoProd: 'Nenhuma', data: '10/05/2020' },
];

const facadeRelatorioSatisfacao = new FacadeRelatorioSatisfacao();

const SatisfacaoTempoComponent = () => {


  const history = useHistory();


  const [confirmaBaixar, setBaixar] = React.useState(false);

  const [confirmacao, setConfirmacao] = React.useState(false);
  const handleConfirma = () => {
    setBaixar(false);
    setConfirmacao(true);
  }
  const closeConfirma = () => {
    setConfirmacao(false);
  }
  const Baixar = () => { closeConfirma() }
  let today = new Date();

  let currentDate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  const [dataRelatorio, setDataRelatorio] = React.useState(currentDate);

  const handleBaixar = () => {
    setBaixar(true);
  }
  const closeBaixar = () => {
    setBaixar(false);
  }

  const [lista, setLista] = React.useState([]);

  const procurarLista = () => {
    facadeRelatorioSatisfacao.getFromData(dataRelatorio, setLista);
  }

  const mudaData = (data) => {
    setDataRelatorio(data)
  }
  return (

    <div>
      <div>
        <TextField
          id="dateI"
          label="Data"
          type="date"
          defaultValue={currentDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => setDataRelatorio(event.target.value)}
        />
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
          onClick={procurarLista}
        >
          Procurar
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Data</td>
            <td>Opniao</td>
            <td>Produtos</td>
          </tr>
        </thead>
        {lista.map((item) => (
          <tbody>
            <tr>
              <td>{dataRelatorio}</td>
              <td>{item.opniao}</td>
              <td>{item.produto}</td>
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



export default SatisfacaoTempoComponent;