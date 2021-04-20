import React,{useState} from "react";
import { Table,Button } from "react-bootstrap";
import {
  FiEdit3,
  FiXCircle,
  FiPlus,
  FiSearch,
  FiCheck,
  FiDelete,
  FiChevronLeft,
  FiDollarSign,
} from "react-icons/fi";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { toast } from "react-toastify";


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

const formataData = (data) => {
  const novaData = new Date(data);
  return (
    ("0" + (novaData.getDate() + 1)).slice(-2) +
    "/" +
    ("0" + (novaData.getMonth() + 1)).slice(-2) +
    "/" +
    novaData.getFullYear()
  );
};

const getProdutosPedido = (produtosArray) => {
  let stringProdutos = "";
  for (var i = 0; i < produtosArray.length; i++) {
    stringProdutos += produtosArray[i].quantidade;
    stringProdutos += " ";
    stringProdutos += produtosArray[i].nome;
    if (i < produtosArray.length - 1) stringProdutos += ",\n";
  }
  return stringProdutos;
};


const TabelaMinhaConta = (props) => {

  const [values,setValues] = React.useState({
    cpf:"",
    opniao:"",
  });

  const postSatisfacao = (item) => {
    
    axios.post('http://localhost:8080/relatorio_satisfacao', {
      
        cpfCliente:values.cpf,
        dataSatisfacao:item.data,
        opniao:values.opniao,
        produto:getProdutosPedido(item.produtos),

    })
    .then(result => {
      toast.success("🍕 Opniao postada com sucesso!", {
          toastStyle,
      })
      setTimeout(() => {
        setOpen(false);
      }, 1000);
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
  const direcionarioOpniao = (item) =>{
    history.push("/cadastrar-satisfacao",{item:item});
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [show,setShow] = useState(false);

  const showOpniao = () =>{
    setShow(true);
  }
  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const showDialogAjuda = () => {
    setShowDialog(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h4>Meus Pedidos:</h4>
      {props.meusPedidos.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>ID</th>
              <th>Status</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Observações</th>
              <th>Pagamento</th>
              <th>Pago</th>
              <th>Expedição</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          {props.meusPedidos.map((item) => (
            <tbody>
              <tr>
                <td>{formataData(item.data)}</td>
                <td>{item.hora}</td>
                <td style={{ width: 150, wordBreak: "break-word" }}>
                  {item._id}
                </td>
                <td>{item.statusPedido}</td>
                <td style={{ whiteSpace: "pre-wrap" }}>
                  {getProdutosPedido(item.produtos)}
                </td>
                <td>R${item.valor}</td>
                <td>{item.observacoes}</td>
                <td>{item.formaPagamento}</td>
                <td>{item.statusPagamento}</td>
                <td>{item.formaExpedicao}</td>
                <td>{item.endereco}</td>
                <td>
                  <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "red",
                      }}
                      onClick={showDialogAjuda}
                  >
                      <FiDollarSign size={20} color="#black" />
                  </Button>

                  <Dialog
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Nota Fiscal eletronica
                    </DialogTitle>
                    <DialogContent>
                      
                      <div>
                        <DialogContentText>
                          {formataData(item.data)}
                        </DialogContentText>
                        <DialogContentText>
                          Quantidade, Nome
                        </DialogContentText>
                        <DialogContentText>
                          {getProdutosPedido(item.produtos)}
                        </DialogContentText>
                        <DialogContentText>
                          Total R$ {item.valor}
                        </DialogContentText>
                        <DialogContentText>
                          Forma de pagamento: {item.formaPagamento}
                        </DialogContentText>
                      </div>
            
            
                    </DialogContent>
                    <DialogActions>
                      <Button
                        className="botao"
                        onClick={() => setShowDialog(false)}
                        variant="contained"
                        color="primary"
                      >
                        Ok, entendi!
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "green",
                      }}
                      onClick={handleClickOpen}
                  >
                      <FiEdit3 size={20} color="#black" />
                  </Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Postar sua opnião</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Por favor, nos informe quais suas opniões em relação ao seu pedido.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="opniao"
                        label="Opnião"
                        type="opniao"
                        onChange={handleChange("opniao")}
                        fullWidth
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="cpf"
                        label="CPF"
                        type="cpf"
                        onChange={handleChange("cpf")}
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={() => postSatisfacao(item)} color="primary">
                        Postar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <div>
          <pre>
            <p>Nenhum pedido foi registrado ainda...</p>
          </pre>
        </div>
      )}
    </>
  );
};

export default TabelaMinhaConta;
